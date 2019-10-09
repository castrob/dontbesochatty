import React from 'react';
import TextField from '@material-ui/core/TextField';

import './style.css';
import './chat-style.css';

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
                <div className='inputusuario'>
                    <TextField className='input100'
                        value={username}
                        placeholder={"Informe seu usuário"}
                        autoFocus={true}
                        onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                setUserAction(username);
                                console.log('wtf');
                                closeModalHandler(props);
                            }
                        }}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <div className='container-login100-form-btn' id='User' align='center'>
                    <button type='submit'
                        className='login100-form-btn'
                        value='Entrar'
                        id='btnSalvar'
                        onClick={() => {
                            setUserAction(username);
                            closeModalHandler(props);
                        }}>Entrar</button>
                </div>

            </div>
        </div>
    );
}
