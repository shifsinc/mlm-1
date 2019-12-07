import React from 'react';
import './SignInView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'
import Link from '../Link.js'

import apiCall from '../../apiCall.js'

function SignInView(props) {/*updateLocation*/
  var loginRegexp = '^(\\w{5,30})|([\\w\\.]+@([a-zA-Z\\-0-9]\\.?)+)$';
  return (
    <Form
      submitTitle="ВОЙТИ"
      submitCallback={data => {
        return apiCall('signin', data);
      }}
      updateLocation = { props.updateLocation }>
      <Switch action="/signin" updateLocation={ props.updateLocation }></Switch>
      <Input attr={{ name: 'login', 'data-regexp': loginRegexp }} label="E-mail или логин" ></Input>
      <Input attr={{ name: 'password', type: 'password' }} label="Пароль"></Input>
      <div className="signin-view__reset-pass">
        Забыли пароль?
        <Link
          title="Нажмите, чтобы сбросить"
          path="/passwordResetRequest"
          updateLocation={ props.updateLocation }>
        </Link>
      </div>
      </Form>
  );
}

export default SignInView;
