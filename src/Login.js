import React from 'react';
import TextField from '@material-ui/core/TextField';

import style from './style.css';

import { CTX } from './Store';

function closeModalHandler() {

  this.props.closePopup();
}

export default function Popup() {

  const [username, setUsername] = React.useState('');
  const { setUserAction } = React.useContext(CTX);

  return (
    <div className='popup'>
      <div className='popup_inner'>
        <div className='wrap-input100 validate-input' data-validate='Informe seu usuário' >
          <TextField value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className='container-login100-form-btn' id='User' align='center'>
          <button type='submit' className='login100-form-btn' value='Entrar' id='btnSalvar' onClick={() => closeModalHandler()}>Entrar</button>
        </div>

      </div>
    </div>
  );
}
