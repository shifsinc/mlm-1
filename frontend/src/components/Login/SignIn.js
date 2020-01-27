import React from 'react';
import './SignIn.css'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import Switch from './Switch.js'
import Link from '../common/Link.js'
import { RECAPTCHAV3_PUBLIC_KEY } from '../../config.js';

export default class extends React.Component {

  componentDidMount = () => {
    this._captchaLoaded = false;
    var captcha = window.document.createElement('script');
    captcha.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHAV3_PUBLIC_KEY;
    captcha.onload = () => this._captchaLoaded = true;
    window.document.head.appendChild(captcha);
  }

  render() {/*updateLocation, updateAuth*/
    return (<Form className="login-form interface-block"
        submitTitle="ВОЙТИ"
        submitCallback={data => {
          return this._captchaLoaded && window.grecaptcha.execute(RECAPTCHAV3_PUBLIC_KEY, {action: 'login'})
          .then(token => this.props.apiCall('signin', { ...data, 'g-recaptcha-response': token }))
          .then( r => {
            if(r.result) this.props.updateAuth(r.result.token, r.result.admin ? 1 : 0);
            return r;
          });
        }} updateLocation = { this.props.updateLocation }>
        <Switch location="/signin" updateLocation={ this.props.updateLocation }></Switch>
        <Input required attr={{ name: 'login', autoFocus: true }} label="E-mail или логин"></Input>
        <Input required attr={{ name: 'password', type: 'password' }} label="Пароль"></Input>
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
