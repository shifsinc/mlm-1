import React from 'react';
import './SignUpView.css'
import Form from './Form.js'
import Input from '../Input.js'
import Switch from './Switch.js'
import noPhoto from '../../img/noPhoto.png';

import signupApi from '../../api/signup.js'
import getReferInfoApi from '../../api/getReferInfo.js'

function SignUpView(props){/*updateLocation*/
  var refer = props.params.refer ? props.params.refer : '', mode = props.m ? props.m : 'g',
    referEmail, referPhoto, referCode;

  var onReferChange = value => {
    if( !( /^[0-9]{11,15}$/.test(value) ) ){
      referPhoto.src = noPhoto;
      referEmail.value = '';
    } else {
      getReferInfoApi(value).then(r => {
        referPhoto.src = r.photoUrl;
        referEmail.value = r.email;
      }).catch(e => {
        referPhoto.src = noPhoto;
        referEmail.value = '';
      });
    }
  }
  setTimeout(() => {referCode.value = refer;onReferChange(refer)}, 0);

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
          submitLink="/fillData"
          submitCallback={data => {
            return signupApi({ ...data, refer, mode });
          }}
          updateLocation = { props.updateLocation }>
        <Switch action="/signup" updateLocation={ props.updateLocation }></Switch>
        <Input attr={{ name: 'login' }} label="Логин"></Input>

        <Input attr={{ name: 'email' }} label="E-mail"></Input>
        <Input attr={{ name: 'email_repeat' }} label="Повторите E-mail"></Input>
        <Input attr={{ name: 'password' }} label="Пароль"></Input>
        <Input attr={{ name: 'password_repeat' }} label="Повторите пароль"></Input>
      </Form>
    </div>
  );
}

export default SignUpView;
