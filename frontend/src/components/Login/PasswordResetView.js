import React from 'react';
import './PasswordResetView.css'
import Form from './Form.js'
import Input from '../Input.js'

import apiCall from '../../apiCall.js'

function PasswordResetView(props) {/*updateLocation*/
  return (
    <Form
    formTitle="Сброс пароля"
    submitTitle="СБРОСИТЬ"
    submitCallback={data => {
      return apiCall('passwordReset', { ...data, token: props.params.token });
    }}
    updateLocation = { props.updateLocation }>
    <Input attr={{ name: 'password', type: 'password' }} label="Пароль"></Input>
    <Input attr={{ name: 'password_repeat', type: 'password' }} label="Повторите пароль"></Input>
    </Form>
  );
}

export default PasswordResetView;
