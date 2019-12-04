import React from 'react';
import './PasswordResetRequestView.css'
import Form from './Form.js'

function PasswordResetRequestView(props) {/*updateLocation*/
  return (
    <Form
      formTitle="Запрос сброса пароля"
      submitTitle="ОТПРАВИТЬ"
      submitLink="/passwordReset"
      submitCallback={data => {
        return Promise.reject('ERR!11');
      }}
      updateLocation = { props.updateLocation }>
      <input required/><label>Ваш E-mail</label>
    </Form>
  );
}

export default PasswordResetRequestView;
