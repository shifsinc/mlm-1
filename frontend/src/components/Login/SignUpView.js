import React from 'react';
import './SignUpView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'
import noPhoto from '../../img/noPhoto.png';

import apiCall from '../../apiCall.js'

function SignUpView(props){/*updateLocation*/
  var refer = props.params.refer ? props.params.refer : '', mode = props.m ? props.m : 'g',
    referEmail, referPhoto, referCode;

  var _setReferDefault = () => {
    referPhoto.src = noPhoto;
    referEmail.value = '';
  }
  var onReferChange = value => {
    if( !( /^[0-9]{11,15}$/.test(value) ) )_setReferDefault();
    else {
      apiCall('getReferInfo', { code: value }).then(r => {
        if( !r.result.length ) _setReferDefault();
        else {
          referPhoto.src = r.photoUrl;
          referEmail.value = r.email;
        }
      });
    }
  }
  setTimeout(() => {referCode.value = refer;onReferChange(refer)}, 0);

  var loginRegexp = '^\\w{5,30}$',
    emailRegexp = '^[\\w\\.]+@([a-zA-Z\\-0-9]\\.?)+$',
    passwordRegexp = '';
  return (
    <div className="login-view sign-up-view__cont">
      <div className="form-view interface-block sign-up-view__refer"><div className="form-view__cont">
        <div className="form-view__title">Ваш рефер</div>
        <img alt="avatar" src={ noPhoto } ref={r => referPhoto = r}/>
        <Input attr={{ name: 'email', readOnly: true, ref: r => referEmail = r }}
          className="label-top" label="E-mail"></Input>
        <Input attr={{ name: 'refer', ref: r => referCode = r , onChange: e => onReferChange(e.target.value) }}
          className="label-top" label="Код рефера"></Input>
      </div></div>
      <Form
          submitTitle="РЕГИСТРАЦИЯ"
          submitCallback={data => {
            return apiCall('signup', { ...data, refer, mode });
          }}
          updateLocation = { props.updateLocation }>
        <Switch action="/signup" updateLocation={ props.updateLocation }></Switch>
        <Input attr={{ name: 'login', 'data-regexp': loginRegexp }} label="Логин"></Input>

        <Input attr={{ name: 'email', 'data-regexp': emailRegexp  }} label="E-mail"></Input>
        <Input attr={{ name: 'email_repeat', 'data-regexp': emailRegexp }} label="Повторите E-mail"></Input>
        <Input attr={{ name: 'password', 'data-regexp': passwordRegexp, type: 'password' }} label="Пароль"></Input>
        <Input attr={{ name: 'password_repeat', 'data-regexp': passwordRegexp, type: 'password' }} label="Повторите пароль"></Input>
      </Form>
    </div>
  );
}

export default SignUpView;
