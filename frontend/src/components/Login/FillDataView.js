import React from 'react';
import './FillDataView.css'
import Form from './Form.js'
import Input from '../Input.js'
import noPhoto from '../../img/noPhoto.png';
import { nameRegexp, phoneRegexp, linkRegexp, telegramRegexp } from '../../const.js';

export default function(props){/*updateLocation*/
  var photo, login, email;
  setTimeout(() => {
    props.apiCall('getUserInfo').then(r => {
      if( !r.result ) return;
      login.value = r.result.user_login;
      email.value = r.result.user_email;
    });
  }, 0);
  return (
    <Form
      className="fill-data-view"
      formTitle="Заполните личные данные"
      submitTitle="СОХРАНИТЬ"
      submitCallback={data => {
        return props.apiCall('fillData', { ...data, token: props.token });
      }}
      updateLocation = { props.updateLocation }>
      <div className="fill-data-view__flex-cont">
        <label className="fill-data-view__photo">
          <input name="photo" type="file" onInput={e => {
            photo.src = URL.createObjectURL( e.target.files[0].slice() );
          }}/>
          <img alt="avatar" src={noPhoto} ref={ r => photo = r }/>
        </label>
        <div className="fill-data-view__fields">
          <Input attr={{ name: 'login', readOnly: true, ref: r => login = r }} label="Ваш логин" className="label-top"></Input>
          <Input attr={{ name: 'email', readOnly: true, ref: r => email = r }} label="Ваш E-mail" className="label-top"></Input>
          <div className="fill-data-view__cont">
            <Input attr={{ name: 'name' }} regexp={ nameRegexp } label="Имя"></Input>
            <Input attr={{ name: 'lastname' }} regexp={ nameRegexp } label="Фамилия"></Input>
          </div>
          <Input attr={{ name: 'phone' }} regexp={ phoneRegexp } label="Телефон"></Input>
          <div className="fill-data-view__cont">
            <Input attr={{ name: 'social_link' }} regexp={ linkRegexp } label="Страница в социальной сети"></Input>
            <Input attr={{ name: 'telegram' }}regexp={ telegramRegexp }  label="Telegram"></Input>
          </div>
        </div>
      </div>
    </Form>
  );
}
