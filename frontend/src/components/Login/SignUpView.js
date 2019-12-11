import React from 'react';
import './SignUpView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'
import noPhoto from '../../img/noPhoto.png';
import { loginRegexp, emailRegexp, passwordRegexp } from '../../const.js';

export default function(props){/*updateLocation*/
  var refer = props.params.refer ? props.params.refer : '', type = props.params.type ? props.params.type : 'g',
    referPhoto, referEmail, referPhone,
    email, emailRepeat,
    password, passwordRepeat;

  var onReferChange = value => {
    props.apiCall('getReferInfo', value).then(res=> {
      if( res.status !== 'error' ){
        referPhoto.src = res.result.user_photo;
        referEmail.value = res.result.user_email;
        referPhone.value = refer = res.result.user_phone;
      }
    });
  }
  setTimeout(() => { referPhone.value = refer; onReferChange({ user_phone: refer }) }, 0);

  return (
    <div className="login-view sign-up-view__cont">
      <div className="form-view interface-block sign-up-view__refer"><div className="form-view__cont">
        <div className="form-view__title">Ваш рефер</div>
        <img alt="avatar" src={ noPhoto } ref={r => referPhoto = r}/>
        <Input attr={{ name: 'email', ref: r => referEmail = r, onChange: e => onReferChange({ user_email: e.target.value }) }}
          label="E-mail"></Input>
        <Input attr={{ name: 'phone', ref: r => referPhone = r , onChange: e => onReferChange({ user_phone: e.target.value }) }}
          label="Код рефера"></Input>
      </div></div>
      <Form
          submitTitle="РЕГИСТРАЦИЯ"
          submitCallback={data => {
            var errFields = [];
            if( email.value !== emailRepeat.value ) errFields.push('email_repeat');
            if( password.value !== passwordRepeat.value ) errFields.push('password_repeat');
            return errFields.length ?
              Promise.resolve({ action: { fields: errFields } }) :
              props.apiCall('signup', { ...data, refer, type });
          }}
          updateLocation = { props.updateLocation }>
        <Switch location="/signup" updateLocation={ props.updateLocation }></Switch>
        <Input attr={{ name: 'login' }} regexp={ loginRegexp } label="Логин"></Input>

        <Input attr={{ name: 'email', ref: r => email = r  }}
          regexp={ emailRegexp } label="E-mail"></Input>
        <Input attr={{ name: 'email_repeat', ref: r => emailRepeat = r }}
          regexp={ emailRegexp } label="Повторите E-mail"></Input>
        <Input attr={{ name: 'password', type: 'password', ref: r => password = r }}
          regexp={ passwordRegexp } label="Пароль"></Input>
        <Input attr={{ name: 'password_repeat', type: 'password', ref: r => passwordRepeat = r }}
          regexp={ passwordRegexp } label="Повторите пароль"></Input>
      </Form>
    </div>
  );
}
