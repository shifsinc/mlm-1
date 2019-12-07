import React from 'react';
import './PasswordResetRequestView.css'
import Form from './Form.js'
import Input from '../Input.js'

import apiCall from '../../apiCall.js'

function PasswordResetRequestView(props) {/*updateLocation*/
  var emailRegexp = '^[\\w\\.]+@([a-zA-Z\\-0-9]\\.?)+$';
  return (
    <Form
      formTitle="Запрос сброса пароля"
      submitTitle="ОТПРАВИТЬ"
      submitCallback={data => {
        return apiCall('passwordResetRequest', data);
      }}
      updateLocation = { props.updateLocation }>
      <Input attr={{ name: 'email', 'data-regexp': emailRegexp }} label="Ваш E-mail"></Input>
    </Form>
  );
}

export default PasswordResetRequestView;
