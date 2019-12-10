import React from 'react';
import './SignInView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'
import Link from '../Link.js'
import { loginRegexp } from '../../const.js';

export default function(props) {/*updateLocation, updateToken*/
  return (
    <Form
      submitTitle="ВОЙТИ"
      submitCallback={data => {
        return props.apiCall('signin', data).then( r => r.status === 'ok' ? (props.updateToken(r.result.token) && r) : r );
      }}
      updateLocation = { props.updateLocation }>
      <Switch action="/signin" updateLocation={ props.updateLocation }></Switch>
      <Input attr={{ name: 'login' }} regexp={ loginRegexp } label="E-mail или логин" ></Input>
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
