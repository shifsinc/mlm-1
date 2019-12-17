import React from 'react';
import './DataForm.css'
import Form from './Form.js'
import Input from './Input.js'
import addPhoto from '../img/addPhoto.png';
import { nameRegexp, phoneRegexp, linkRegexp, telegramRegexp, passwordRegexp } from '../const.js';

export default function(props){/*updateLocation, title, passwordField, className, submitCallback*/
  var photo, login, email, name, surname, phone, social, telegram;
  setTimeout(() => {
    props.apiCall('getUserInfo').then(r => {
      if( !r.result ) return;
      var res = r.result;
      login.value = res.user_login;
      email.value = res.user_email;
      name.value = res.user_name;
      surname.value = res.user_surname;
      phone.value = res.user_phone;
      social.value = res.user_social;
      telegram.value = res.user_telegram;
    });
  }, 0);
  return (
    <Form
      className={ 'data-form' + ( props.className ? ' ' + props.className : '' ) }
      formTitle={ props.title }
      submitTitle="СОХРАНИТЬ"
      submitCallback={ props.submitCallback }
      updateLocation = { props.updateLocation }>
      <div className="data-form__flex-cont">
        <label className="data-form__photo">
          <input name="photo" type="file" onInput={e => {
            photo.src = URL.createObjectURL( e.target.files[0].slice() );
          }}/>
          <img alt="avatar" src={ addPhoto } ref={ r => photo = r }/>
        </label>
        <div className="data-form__fields">
          <Input attr={{ name: 'login', readOnly: true, ref: r => login = r }} label="Ваш логин" className="label-top"></Input>
          <Input attr={{ name: 'email', readOnly: true, ref: r => email = r }} label="Ваш E-mail" className="label-top"></Input>
          <div className="data-form__cont">
            <Input attr={{ name: 'name', ref: r => name = r }} regexp={ nameRegexp } label="Имя"></Input>
            <Input attr={{ name: 'surname', ref: r => surname = r }} regexp={ nameRegexp } label="Фамилия"></Input>
          </div>
          <Input attr={{ name: 'phone', ref: r => phone = r }} regexp={ phoneRegexp } label="Телефон"></Input>
          <div className="data-form__cont">
            <Input attr={{ name: 'social_link', ref: r => social = r }} regexp={ linkRegexp } label="Страница в социальной сети"></Input>
            <Input attr={{ name: 'telegram', ref: r => telegram = r }}regexp={ telegramRegexp }  label="Telegram"></Input>
          </div>
          {
            props.passwordFields ? (
              <div className="data-form__cont">
                <Input attr={{ name: 'password', type: 'password' }}
                  regexp={ passwordRegexp } label="Новый пароль"></Input>
                <Input attr={{ name: 'password_repeat', type: 'password' }}
                  regexp={ passwordRegexp } label="Повторите новый пароль"></Input>
              </div>
            ) : undefined
          }
        </div>
      </div>
    </Form>
  );
}
