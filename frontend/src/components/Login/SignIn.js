import React from 'react';
import './SignIn.css'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import Switch from './Switch.js'
import Link from '../common/Link.js'
import { RECAPTCHA_PUBLIC_KEY } from '../../config.js';

export default class extends React.Component {

  componentDidMount = () => {
    var captcha = window.document.createElement('script');
    captcha.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_PUBLIC_KEY;
    window.document.head.appendChild(captcha);
    var scr = window.document.createElement('script');
    scr.innerHTML = `
    grecaptcha.ready(function() {
        grecaptcha.execute('${RECAPTCHA_PUBLIC_KEY}', {action: 'login'}).then(function(token) {
          console.log(token)
        });
    });`;
  }

  render() {/*updateLocation, updateAuth*/
    return (<Form className="login-form interface-block"
        submitTitle="ВОЙТИ"
        submitCallback={data => {
          return this.props.apiCall('signin', data).then( r => {
            if(r.result) this.props.updateAuth(r.result.token, r.result.admin ? 1 : 0);
            return r;
          });
        }} updateLocation = { this.props.updateLocation }>
        <Switch location="/signin" updateLocation={ this.props.updateLocation }></Switch>
        <Input attr={{ name: 'login', autoFocus: true }} label="E-mail или логин"></Input>
        <Input attr={{ name: 'password', type: 'password' }} label="Пароль"></Input>
        <div className="sign-in__reset-pass">
          Забыли пароль?
          <Link
            path="/passwordResetRequest"
            updateLocation={ this.props.updateLocation }>
            Нажмите, чтобы сбросить</Link>
        </div>
        </Form>);
  }
}
