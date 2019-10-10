import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { CTX } from './Store';
import './chat-style.css';
export let messagesEnd;


const useStyles = makeStyles(theme => ({
  root: {
    //margin: '200px',
    padding: theme.spacing(3, 10),
    color: '#000000',
    background: '-webkit-linear-gradient(top, #7579ff, #B9D3EF)',
    marginLeft: '20%',
    marginRight: '20%',
    fontFamily: 'Poppins-Regular',
    borderRadius: '10px',
    overflow: 'hidden',
    marginbutton: '10%'
  },
  flex: {
    display: 'flex',
    alignItems: 'center'
  },
  topicsWindow: {
    width: '20%',
    height: '300px',
    borderRight: '1px solid #777',
    fontFamily: 'Poppins-Regular'
  },
  chatWindow: {
    width: '70%',
    height: '300px',
    padding: '20px',
    overflow: 'auto'
  },
  chatBox: {
    width: '85%',
  },
  button: {
    marginLeft: '5px',
    width: '15%'
  },
  normal: {
    width: '20%',
    color: 'black'
  },
  joy: {
    width: '20%',
    backgroundColor: 'yellow'
  },
  angry: {
    width: '20%',
    backgroundColor: 'red'
  },
  sad: {
    width: '20%',
    backgroundColor: 'blue'
  },
  fear: {
    width: '20%',
    backgroundColor: 'green'
  },
  confident: {
    width: '20%',
    backgroundColor: 'purple'
  },
  tentative: {
    width: '20%',
    backgroundColor: 'cyan'
  },
  analytical: {
    width: '20%',
    backgroundColor: 'blue'
  },
  text: {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column'
  },
  inputBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  }
}));


export default function Dashboard(){

  // stuff for interface implementation
  const classes = useStyles();

  const getTopicMood = () => {
    console.log('currChat', JSON.stringify(allChats[activeTopic], null, 4));
    let mood = allChats[activeTopic].mood;
    switch(mood){
      case 'sadness':
        return classes.sad;
      case 'joy':
        return classes.joy;
      case 'fear':
        return classes.fear;
      case 'anger':
        return classes.angry;
      case 'analytical':
        return classes.analytical;
      case 'confident':
        return classes.confident;
      case 'tentative':
        return classes.tentative;
      default:
        return classes.normal;
    }
  };
  let messagesEnd;
  const scrollToBottom = () =>{
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  // CTX Store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  // List of topics that arrives from Context
  const topics = Object.keys(allChats);

  // local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]); // Starts with the first topic as default (general)
  const [textValue, changeTextValue] = React.useState(''); // State to handle the send text action

  return (
    <div>
      <img src="./logo.png" alt="logo" id="logo" width='200' height='200' />
      <Paper className={classes.root}>
        <Typography variant="h6" component="h6">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {
                topics.map(topic => (
                  <ListItem onClick={e => changeActiveTopic(e.target.innerText)} key={topic} button>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))
              }
            </List>
          </div>
          <div className={classes.chatWindow}>
            {
              allChats[activeTopic].messages.map((chat, i) => (
                <div  className={classes.text} key={i}>
                  <Chip label={chat.from} className={getTopicMood()} />
                    {
                      chat.msg.split('\n').map ((item, i) => <Typography key={i}>{item}</Typography>)
                    }
                </div>
              ))
            }
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { messagesEnd = el; }}>
            </div>
          </div>

        </div>
        <div  className={classes.inputBox}>
          <TextField
            className={classes.chatBox}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                scrollToBottom();
                sendChatAction({ from: user, msg: textValue, topic: activeTopic });
                changeTextValue('');
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              sendChatAction({ from: user, msg: textValue, topic: activeTopic });
              changeTextValue('');
            }} > Enviar </Button>
        </div>
      </Paper>

    </div>
  )
}
