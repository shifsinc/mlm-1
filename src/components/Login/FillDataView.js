import React from 'react';
import './FillDataView.css'
import Form from './Form.js'
import Input from '../Input.js'
import noPhoto from '../../img/noPhoto.png';

import fillDataApi from '../../api/fillData.js';

function FillDataView(props){/*updateLocation*/
  var photo;
  return (
    <Form
      className="fill-data-view"
      formTitle="Заполните личные данные"
      submitTitle="СОХРАНИТЬ"
      submitLink="#"
      submitCallback={data => {
        return fillDataApi(data);
      }}
      updateLocation = { props.updateLocation }>
      <div className="fill-data-view__flex-cont">
        <label className="fill-data-view__photo">
          <input name="photo" type="file" onInput={e => {
            photo.src = URL.createObjectURL( e.target.files[0].slice() );
          }}/>
          <img src={noPhoto} ref={ r => photo = r }/>
        </label>
        <div className="fill-data-view__fields">
          <Input name="login" label="Ваш логин"></Input>
          <Input name="email" label="Ваш E-mail"></Input>
          <div className="fill-data-view__cont">
            <Input name="name" label="Имя"></Input>
            <Input name="lastname" label="Фамилия"></Input>
          </div>
          <Input name="phone" label="Телефон"></Input>
          <div className="fill-data-view__cont">
            <Input name="social_link" label="Страница в социальной сети"></Input>
            <Input name="telegram" label="Telegram"></Input>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default FillDataView;
