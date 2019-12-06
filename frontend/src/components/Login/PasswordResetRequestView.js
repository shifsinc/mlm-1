import React from 'react';
import './PasswordResetRequestView.css'
import Form from './Form.js'
import Input from '../Input.js'

import passwordResetRequestApi from '../../api/passwordResetRequest.js';

function PasswordResetRequestView(props) {/*updateLocation*/
  return (
    <Form
      formTitle="Запрос сброса пароля"
      submitTitle="ОТПРАВИТЬ"
      submitLink="#"
      submitCallback={data => {
        return passwordResetRequestApi(data);
      }}
      updateLocation = { props.updateLocation }>
      <Input attr={{ name: 'email' }} label="Ваш E-mail"></Input>
    </Form>
  );
}

export default PasswordResetRequestView;
