import React from 'react';
import './SignInView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'
import Link from '../Link.js'

import signinApi from '../../api/signin.js';

function SignInView(props) {/*updateLocation*/
  return (
    <Form
      submitTitle="ВОЙТИ"
      submitLink="#"
      submitCallback={data => {
        return signinApi(data);
      }}
      updateLocation = { props.updateLocation }>
      <Switch action="/signin" updateLocation={ props.updateLocation }></Switch>
      <Input name="login" label="E-mail или логин"></Input>
      <Input name="password" label="Пароль"></Input>
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
