import React from 'react';
import style from './style.css';


class Popup extends React.Component {

    render() {
    return (
        <div className='popup'>
            <div className='popup_inner'>
                <div className='wrap-input100 validate-input' data-validate='Informe seu usuário' >
                    <input className='input100' type='text' name='username' id='txtUser' placeholder='Informe seu usuário'></input></div> 

                <div className='container-login100-form-btn' id='User' align = 'center'>
                    <button type='submit' className='login100-form-btn' value='Entrar' id='btnSalvar' onClick={this.props.closePopup}>Entrar</button></div>

            </div>
        </div>
        
    );
  }
}
export default Popup;
