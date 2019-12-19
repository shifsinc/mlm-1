import React from 'react';
import './SignUp.css'
import './common.css'
import Form from '../Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'
import noPhoto from '../../img/noPhoto.png';
import { loginRegexp, emailRegexp, passwordRegexp } from '../../const.js';

export default function(props){/*updateLocation*/
  var refer = props.params.refer ? props.params.refer : '', type = props.params.type ? props.params.type : 'g',
    referPhoto, referEmail, referPhone;

  var onReferChange = value => {
    props.apiCall('getReferInfo', value).then(res=> {
      if( res.status !== 'error' ){
        referPhoto.src = res.result.user_photo_url;
        referEmail.value = res.result.user_email;
        referPhone.value = refer = res.result.user_phone;
      }
    });
  }
  setTimeout(() => { referPhone.value = refer; onReferChange({ user_phone: refer }) }, 0);

  return (
    <div className="login-form sign-up__cont">
      <div className="form interface-block sign-up__refer"><div className="form__cont">
        <div className="form__title">Ваш рефер</div>
        <img alt="avatar" src={ noPhoto } ref={r => referPhoto = r}/>
        <Input attr={{ name: 'email', ref: r => referEmail = r, onChange: e => onReferChange({ user_email: e.target.value }) }}
          label="E-mail"></Input>
        <Input attr={{ name: 'phone', ref: r => referPhone = r , onChange: e => onReferChange({ user_phone: e.target.value }) }}
          label="Код рефера"></Input>
      </div></div>
      <Form
          className="login-form interface-block"
          submitTitle="РЕГИСТРАЦИЯ"
          submitCallback={data => {
            return props.apiCall('signup', { ...data, refer, type });
          }}
          updateLocation = { props.updateLocation }>
        <Switch location="/signup" updateLocation={ props.updateLocation }></Switch>
        <Input attr={{ name: 'login' }} regexp={ loginRegexp } label="Логин"></Input>

        <Input attr={{ name: 'email'  }}
          regexp={ emailRegexp } label="E-mail"></Input>
        <Input attr={{ name: 'email_repeat' }}
          regexp={ emailRegexp } label="Повторите E-mail"></Input>
        <Input attr={{ name: 'password', type: 'password' }}
          regexp={ passwordRegexp } label="Пароль"></Input>
        <Input attr={{ name: 'password_repeat', type: 'password' }}
          regexp={ passwordRegexp } label="Повторите пароль"></Input>
      </Form>
    </div>
  );
}
