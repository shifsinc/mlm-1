import React from 'react';
import './SignUpView.css'
import Form from './Form.js'
import Switch from './Switch.js'

function SignUpView(props){/*updateLocation*/
  return (
    <Form
    submitTitle="РЕГИСТРАЦИЯ"
    submitLink="#"
    submitCallback={data => {
      return Promise.reject('ERR!11');
    }}
    updateLocation = { props.updateLocation }>
      <Switch action="/signup" updateLocation={ props.updateLocation }></Switch>
      <input required/><label>Логин</label>

      <input required/><label>E-mail</label>
      <input required/><label>Повторите E-mail</label>
      <input required/><label>Пароль</label>
      <input required/><label>Повторите пароль</label>
    </Form>
  );
}

export default SignUpView;
