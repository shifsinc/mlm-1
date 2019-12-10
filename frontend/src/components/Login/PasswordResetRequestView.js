import React from 'react';
import './PasswordResetRequestView.css'
import Form from './Form.js'
import Input from '../Input.js'
import { emailRegexp } from '../../const.js';

export default function(props) {/*updateLocation*/
  return (
    <Form
      formTitle="Запрос сброса пароля"
      submitTitle="ОТПРАВИТЬ"
      submitCallback={data => {
        return props.apiCall('passwordResetRequest', data);
      }}
      updateLocation = { props.updateLocation }>
      <Input attr={{ name: 'email' }} regexp={ emailRegexp } label="Ваш E-mail"></Input>
    </Form>
  );
}
