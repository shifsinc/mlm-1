import React from 'react';
import './DataForm.css'
import Form from './Form.js'
import Input from './Input.js'
import addPhoto from '../../img/addPhoto.png';
import { nameRegexp, phoneRegexp, linkRegexp, telegramRegexp, passwordRegexp } from '../../const.js';

export default class extends React.Component {
  constructor(props){/*updateLocation, title, passwordField, className, submitCallback*/
    super(props);

    this.state = {
      user_photo_url: addPhoto,
      user_login: '',
      user_email: '',
      user_name: '',
      user_surname: '',
      user_phone: '',
      user_social: '',
      user_telegram: ''
    };

    props.apiCall('getUserInfo').then(r => {
      if( !r.result ) return;
      var res = r.result;
      if( res.user_photo_url.endsWith('noPhoto.png') ) res.user_photo_url = addPhoto;
      this.setState(res);
    });
  }

  render(){
    var photo;
    return (
      <Form
        className={ 'data-form' + ( this.props.className ? ' ' + this.props.className : '' ) }
        formTitle={ this.props.title }
        submitTitle="СОХРАНИТЬ"
        submitCallback={ this.props.submitCallback }
        updateLocation = { this.props.updateLocation }>
        <div className="data-form__flex-cont">
          <label className="data-form__photo">
            <input name="photo" type="file" onInput={e => {
                if( !e.target.files[0].type.startsWith('image') ) return;
                photo.src = URL.createObjectURL( e.target.files[0].slice() );
              }}/>
            <img alt="avatar" src={ this.state.user_photo_url } ref={ r => photo = r }/>
          </label>
          <div className="data-form__fields">

            <Input attr={{ name: '_login', readOnly: true, value: this.state.user_login }}
              label="Ваш логин" className="label-top"></Input>

            <Input attr={{ name: '_email', readOnly: true, value: this.state.user_email }}
              label="Ваш E-mail" className="label-top"></Input>

            <div className="data-form__cont">
              <Input attr={{ name: 'name', value: this.state.user_name,
                onChange: e => this.setState({ user_name: e.target.value }) }}
                regexp={ nameRegexp } label="Имя"></Input>

              <Input attr={{ name: 'surname', value: this.state.user_surname,
                onChange: e => this.setState({ user_surname: e.target.value }) }}
                regexp={ nameRegexp } label="Фамилия"></Input>
            </div>

            <Input attr={{ name: 'phone', value: this.state.user_phone,
              onChange: e => this.setState({ user_phone: e.target.value }) }}
              regexp={ phoneRegexp } label="Телефон"></Input>

            <div className="data-form__cont">
              <Input attr={{ name: 'social_link', value: this.state.user_social,
                onChange: e => this.setState({ user_social: e.target.value }) }}
                regexp={ linkRegexp } label="Страница в социальной сети"></Input>

              <Input attr={{ name: 'telegram', value: this.state.user_telegram,
                onChange: e => this.setState({ user_telegram: e.target.value }) }}
                regexp={ telegramRegexp }  label="Telegram"></Input>
            </div>
            {
              this.props.passwordFields ? (
                <div className="data-form__cont">
                  <Input attr={{ name: 'new_password', type: 'password' }}
                    regexp={ passwordRegexp } label="Новый пароль"></Input>

                  <Input attr={{ name: 'new_password_repeat', type: 'password' }}
                    regexp={ passwordRegexp } label="Повторите новый пароль"></Input>
                </div>
              ) : undefined
            }
          </div>
        </div>
      </Form>
    );
  }
}