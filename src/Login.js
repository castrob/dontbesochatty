import React from 'react';
import TextField from '@material-ui/core/TextField';

import style from './style.css';

import { CTX } from './Store';

function closeModalHandler(props) {
  props.closePopup();
}

export default function Popup(props) {

  const [username, setUsername] = React.useState('');
  const { setUserAction } = React.useContext(CTX);

  return (
    <div className='popup'>
      <div className='popup_inner'>
        <div className='wrap-input100 validate-input' data-validate='Informe seu usuário' >
          <TextField value={username} placeholder={"Username"} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className='container-login100-form-btn' id='User' align='center'>
          <button type='submit' className='login100-form-btn' value='Entrar' id='btnSalvar' onClick={() => { setUserAction(username); closeModalHandler(props); }}>Entrar</button>
        </div>

      </div>
    </div>
  );
}
