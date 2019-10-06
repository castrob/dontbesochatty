import React from 'react';
import io from 'socket.io-client';

// internal context
export const CTX = React.createContext();

/*
    msg {
        from: 'username'
        msg: 'hello'
        topic: 'general'
    }

    state {
        general: [
            {msg}, {msg}, {msg}, {newmsg}
        ]
        topic2: [
            {msg}, {msg}, {msg}
        ]
        .
        .
        .
    }
*/
function normalizeCurrState(currState, currTopic) {
  let topic = currState[currTopic];
  if(topic.messages.length >= 2){
    let lastUser = topic.messages[0].from;
    let newTopic = {
      mood: topic.mood,
      messages: [{
        from: lastUser,
        msg: ''
      }]
    };
    let numMsgs = 0;
    topic.messages.forEach((message) => {
      if(lastUser === message.from){
        newTopic.messages[numMsgs].msg += message.msg + '\n';
      }else{
        numMsgs++;
        lastUser = message.from;
        newTopic.messages.push({
          from: lastUser,
          msg: message.msg
        });
      }
    });
    currState[currTopic] = newTopic;
  }
  return currState;
}
// Initial state, with at least two topics
const initState = {
  general: {mood: 'anger', messages: []},
  work: {mood: 'anger', messages: []}
};

// reducer must append new messages when receive_message is called as action
function reducer(state, action) {
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      const { from, msg, topic } = action.payload;
      return normalizeCurrState({
        ...state,
        [topic]: {
          mood: state[topic].mood,
          messages: [
            ...state[topic].messages,
            {
              from,
              msg
            }
          ]
        }
      }, topic);
    case 'RECEIVE_ANALYSIS':
      const mood = action.payload.mood;
      return normalizeCurrState({
        ...state,
        [action.payload.topic]: {
          mood: mood,
          messages: [...state[action.payload.topic].messages]
        }
      }, action.payload.topic);
    default:
      return state
  }
}

// io socket client
let socket;

// this action is performed on dashboard and sends the message to server
function sendChatAction(value) {
  socket.emit('chat message', value)
}

var user = localStorage.getItem('username');

function setUserAction(value) {
  user = value;
  localStorage.setItem('username', user);
}

export default function Store(props) {

  const [allChats, dispatch] = React.useReducer(reducer, initState);

  // initiate the socket
  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', function (msg) {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
    });

    socket.on('tone analysis', (analysis) => {
      console.log('Analysis', JSON.stringify(analysis, null, 4));
      dispatch({type: 'RECEIVE_ANALYSIS', payload: analysis});
    })
  }

  // just a workaround, do it better later.
  // const user = 'Anon' + Math.random(100).toFixed(2);


  // good luck as well
  return (
    <CTX.Provider value={{ allChats, sendChatAction, user, setUserAction }}>
      {props.children}
    </CTX.Provider>
  )
}