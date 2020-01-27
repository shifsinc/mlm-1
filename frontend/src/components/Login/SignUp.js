import React from 'react';
import './SignUp.css'
import './common.css'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import Link from '../common/Link.js'
import ViewSelect from '../common/ViewSelect.js'
import Popup from '../common/Popup.js'
import Switch from './Switch.js'
import noPhoto from '../../img/noPhoto.png';
import { loginRegexp, emailRegexp, phoneRegexp, passwordRegexp } from '../../const.js';
import { RECAPTCHAV2_PUBLIC_KEY } from '../../config.js';

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
      referEditDisabled: false,
      popup: null,
      redirectPath: null
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
              return this.props.apiCall('signup', { ...data, refer_phone: this.state.refer_phone, refer_type: this.state.refer_type })
                .then(r => {
                  if( r.status === 'error' ) return r;
                  this.setState({ popup: 0, redirectPath: r.action.path });
                  return {};
                });
            }}
            updateLocation = { this.props.updateLocation }>
          <Switch location="/signup" updateLocation={ this.props.updateLocation }></Switch>
          <Input required attr={{ name: 'login', autoFocus: true }} regexp={ loginRegexp } label="Логин"
            hint="5-30 символов. Допускается ввод только букв английского алфавита (оба регистра), символа '_', цифр 0-9. Логин не может начинаться с цифры."></Input>

          <Input required attr={{ name: 'email'  }}
            regexp={ emailRegexp } label="E-mail"></Input>
          <Input required attr={{ name: 'email_repeat' }}
            regexp={ emailRegexp } label="Повторите E-mail"></Input>
          <Input required attr={{ name: 'password', type: 'password' }}
            regexp={ passwordRegexp } label="Пароль"
            hint="8 – 30 символов. Обязателен ввод минимум одного специального символа, одной буквы в верхнем регистре, одной цифры.">
          </Input>
          <Input required attr={{ name: 'password_repeat', type: 'password' }}
            regexp={ passwordRegexp } label="Повторите пароль">
          </Input>

          <ViewSelect active={ this.state.popup }>
            <Popup className="sign-up__popup" onClose={ () => this.props.updateLocation(this.state.redirectPath) }>
              <h4>Вам на электронную почту поступит письмо для подтверждения регистрации</h4>
              <Link className="button" path={ this.state.redirectPath } updateLocation={ this.props.updateLocation }>Закрыть</Link>
            </Popup>

          </ViewSelect>

          <div className="g-recaptcha" data-sitekey={ RECAPTCHAV2_PUBLIC_KEY }></div>

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
