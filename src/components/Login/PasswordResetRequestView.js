import React from 'react';
import './PasswordResetRequestView.css'
import Form from './Form.js'

import passwordResetRequestApi from '../../api/passwordResetRequest.js';

function PasswordResetRequestView(props) {/*updateLocation*/
  return (
    <Form
      formTitle="Запрос сброса пароля"
      submitTitle="ОТПРАВИТЬ"
      submitLink="/passwordReset"
      submitCallback={data => {
        return passwordResetRequestApi(data);
      }}
      updateLocation = { props.updateLocation }>
      <input required/><label>Ваш E-mail</label>
    </Form>
  );
}

export default PasswordResetRequestView;
