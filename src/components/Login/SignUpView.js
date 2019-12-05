import React from 'react';
import './SignUpView.css'
import Form from './Form.js'
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
      <input required name="login"/><label>Логин</label>

      <input required name="email"/><label>E-mail</label>
      <input required name="email_repeat"/><label>Повторите E-mail</label>
      <input required name="password"/><label>Пароль</label>
      <input required  name="password_repeat"/><label>Повторите пароль</label>
    </Form>
  );
}

export default SignUpView;
