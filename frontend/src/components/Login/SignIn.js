import React from 'react';
import './SignIn.css'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import Switch from './Switch.js'
import Link from '../common/Link.js'
import { loginRegexp } from '../../const.js';

export default function(props) {/*updateLocation, updateAuth*/
  return (
    <Form
      className="login-form interface-block"
      submitTitle="ВОЙТИ"
      submitCallback={data => {
        return props.apiCall('signin', data).then( r => {
          if(r.result) props.updateAuth(r.result.token, r.result.admin ? 1 : 0);
          return r;
        });
      }}
      updateLocation = { props.updateLocation }>
      <Switch location="/signin" updateLocation={ props.updateLocation }></Switch>
      <Input attr={{ name: 'login', autoFocus: true }} regexp={ loginRegexp } label="E-mail или логин"></Input>
      <Input attr={{ name: 'password', type: 'password' }} label="Пароль"></Input>
      <div className="sign-in__reset-pass">
        Забыли пароль?
        <Link
          path="/passwordResetRequest"
          updateLocation={ props.updateLocation }>
          Нажмите, чтобы сбросить</Link>
      </div>
      </Form>
  );
}
