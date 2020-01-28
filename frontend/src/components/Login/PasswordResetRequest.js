import React from 'react';
import './PasswordResetRequest.css'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import { emailRegexp } from '../../const.js';
import { RECAPTCHAV2_PUBLIC_KEY } from '../../config.js';
import { addCaptchaScript } from '../../utils.js';

export default class extends React.Component {/*updateLocation*/
  componentDidMount = () => addCaptchaScript(2);

  render(){
    return (<Form className="login-form interface-block"
        formTitle="Запрос сброса пароля"
        submitTitle="ОТПРАВИТЬ"
        submitCallback={data => this.props.apiCall('passwordResetRequest', data)}
        updateLocation = { this.props.updateLocation }>
        <Input attr={{ name: 'email', autoFocus: true }} regexp={ emailRegexp } label="Ваш E-mail"></Input>
        <div className="g-recaptcha" data-sitekey={ RECAPTCHAV2_PUBLIC_KEY }></div>
      </Form>);
  }
}
