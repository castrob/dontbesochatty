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
import Login from './Login';

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
    alignItems: 'center',
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
    padding: '20px'

  },
  chatBox: {
    width: '85%',
  },
  button: {
    width: '15%',
  }
}));

export default function Dashboard() {

  // stuff for interface implementation
  const classes = useStyles();

  // CTX Store
  const { allChats, sendChatAction, user } = React.useContext(CTX);

  // List of topics that arrives from Context
  const topics = Object.keys(allChats);

  // local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0]); // Starts with the first topic as default (general)
  const [textValue, changeTextValue] = React.useState(''); // State to handle the send text action

  // good luck understanding this crap
  return (
    <div>
      <img src="./logo.png" alt="logo" id="logo" width='200' height='200' />
      <Paper className={classes.root}>
        <Typography variant="h7" component="h7">
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
              allChats[activeTopic].map((chat, i) => (
                <div className={classes.flex} key={i}>
                  <Chip label={chat.from} className={classes.chip} />
                  <Typography variant="body1" gutterBottom> {chat.msg} </Typography>
                </div>
              ))
            }
          </div>

        </div>
        <div className={classes.flex}>
          <TextField
            className={classes.chatBox}
            value={textValue}
            onChange={e => changeTextValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
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