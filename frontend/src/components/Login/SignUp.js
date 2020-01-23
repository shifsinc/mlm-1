import React from 'react';
import './SignUp.css'
import './common.css'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import Switch from './Switch.js'
import noPhoto from '../../img/noPhoto.png';
import { loginRegexp, emailRegexp, phoneRegexp, passwordRegexp } from '../../const.js';
import { RECAPTCHA_PUBLIC_KEY } from '../../config.js';

export default class extends React.Component {
  constructor(props){/*updateLocation*/
    super(props);

    var refer_phone = props.params.refer ? props.params.refer : '',
      refer_type = props.params.type ? props.params.type : 'g';
    this.state = {
      refer_photo_url: noPhoto,
      refer_email: '',
      refer_phone,
      refer_type,
      referEditDisabled: false
    };
    this._fetchRefer( refer_phone );
  }

  componentDidMount = () => {
    var captcha = window.document.createElement('script');
    captcha.src = 'https://www.google.com/recaptcha/api.js';
    captcha.setAttribute('async', true);
    captcha.setAttribute('defer', true);
    window.document.head.appendChild(captcha);
  }

  render(){
    return (
      <div className="login-form sign-up__cont">

        { this._renderReferForm() }

        <Form className="login-form interface-block"
            submitTitle="РЕГИСТРАЦИЯ"
            submitCallback={data => {
              return this.props.apiCall('signup',
                { ...data, refer_phone: this.state._refer_phone, refer_type: this.state.refer_type });
            }}
            updateLocation = { this.props.updateLocation }>
          <Switch location="/signup" updateLocation={ this.props.updateLocation }></Switch>
          <Input attr={{ name: 'login', autoFocus: true }} regexp={ loginRegexp } label="Логин"></Input>

          <Input attr={{ name: 'email'  }}
            regexp={ emailRegexp } label="E-mail"></Input>
          <Input attr={{ name: 'email_repeat' }}
            regexp={ emailRegexp } label="Повторите E-mail"></Input>
          <Input attr={{ name: 'password', type: 'password' }}
            regexp={ passwordRegexp } label="Пароль"></Input>
          <Input attr={{ name: 'password_repeat', type: 'password' }}
            regexp={ passwordRegexp } label="Повторите пароль"></Input>

          <div className="g-recaptcha" data-sitekey={ RECAPTCHA_PUBLIC_KEY }></div>

        </Form>
      </div>
    );
  }

  _renderReferForm = () => {
    return (<div className="form interface-block sign-up__refer"><div className="form__cont">
      <div className="form__title">Ваш рефер</div>
      <img alt="avatar" src={ this.state.refer_photo_url }/>
      <Input className="label-top" attr={{
          name: 'email',
          value: this.state.refer_email,
          onChange: this._emailEdit,
          disabled: this.state.referEditDisabled
        }} regexp={ emailRegexp } label="E-mail"></Input>

      <Input className="label-top" attr={{
          name: 'phone',
          value: this.state.refer_phone,
          onChange: this._codeEdit,
          disabled: this.state.referEditDisabled
        }} regexp={ phoneRegexp } label="Код рефера"></Input>
    </div></div>);
  }

  _emailEdit = e => {
    var val = e.target.value;
    this.setState({ refer_email: val });
    this._fetchRefer( val );
  }
  _codeEdit = e => {
    var val = e.target.value;
    this.setState({ refer_phone: val });
    this._fetchRefer( val );
  }

  _fetchRefer = value => {
    this.props.apiCall('getReferInfo', { refer: value }).then(res=> {
      if( res.status === 'error' ) return;
      this.setState({
        refer_photo_url: res.result.user_photo_url ? res.result.user_photo_url : noPhoto,
        refer_email: res.result.user_email,
        refer_phone: res.result.user_phone,
        referEditDisabled: !!this.props.params.refer
      });
    });
  }

}
