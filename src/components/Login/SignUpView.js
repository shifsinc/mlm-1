import React from 'react';
import './SignUpView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'

import signupApi from '../../api/signup.js';

function SignUpView(props){/*updateLocation*/
  return (
    <Form
    submitTitle="РЕГИСТРАЦИЯ"
    submitLink="#"
    submitCallback={data => {
      return signupApi(data);
    }}
    updateLocation = { props.updateLocation }>
      <Switch action="/signup" updateLocation={ props.updateLocation }></Switch>
      <Input name="login" label="Логин"></Input>

      <Input name="email" label="E-mail"></Input>
      <Input name="email_repeat" label="Повторите E-mail"></Input>
      <Input name="password" label="Пароль"></Input>
      <Input name="password_repeat" label="Повторите пароль"></Input>
    </Form>
  );
}

export default SignUpView;
