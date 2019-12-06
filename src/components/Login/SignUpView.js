import React from 'react';
import './SignUpView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'

import signupApi from '../../api/signup.js';

function SignUpView(props){/*updateLocation*/
  var refer = props.params.refer ? props.params.refer : '';
  return (
    <div className="login-view sign-up-view__cont">
      <div className="form-view interface-block sign-up-view__referer"><div className="form-view__cont">
        <div className="form-view__title">Ваш рефер</div>
        <img alt="avatar" src=""/>
        <Input attr={{ name: 'email', readOnly: true }} label="E-mail"></Input>
        <Input attr={{ name: 'referer', value: refer, readOnly: true }} label="Код рефера"></Input>
      </div></div>
      <Form
          submitTitle="РЕГИСТРАЦИЯ"
          submitLink="/fillData"
          submitCallback={data => {
            return signupApi({ ...data, refer: refer });
          }}
          updateLocation = { props.updateLocation }>
        <Switch action="/signup" updateLocation={ props.updateLocation }></Switch>
        <Input attr={{ name: 'login' }} label="Логин"></Input>

        <Input attr={{ name: 'email' }} label="E-mail"></Input>
        <Input attr={{ name: 'email_repeat' }} label="Повторите E-mail"></Input>
        <Input attr={{ name: 'password' }} label="Пароль"></Input>
        <Input attr={{ name: 'password_repeat' }} label="Повторите пароль"></Input>
      </Form>
    </div>
  );
}

export default SignUpView;
