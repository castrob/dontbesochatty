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

// Initial state, with at least two topics
const initState = {
  general: [],
  work: []
}

// reducer must append new messages when receive_message is called as action
function reducer(state, action) {

  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      }
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

function setUserAction(value) {
  console.log(value);
}

export default function Store(props) {

  const [allChats, dispatch] = React.useReducer(reducer, initState);

  // initiate the socket
  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', function (msg) {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg })
    });
  }

  // just a workaround, do it better later.
  const user = 'Anon' + Math.random(100).toFixed(2);


  // good luck as well
  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  )
}