import React from 'react';
import './PasswordReset.css'
import Form from '../Form.js'
import Input from '../Input.js'

export default function(props) {/*updateLocation*/
  var password, passwordRepeat;
  return (
    <Form
    className="login-form"
    formTitle="Сброс пароля"
    submitTitle="СБРОСИТЬ"
    submitCallback={data => {
      var errFields = [];
      if( password.value !== passwordRepeat.value ) errFields.push('password_repeat');
      return errFields.length ?
        Promise.resolve({ action: { fields: errFields } }) :
        props.apiCall('passwordReset', { ...data, resetToken: props.params.resetToken });
    }}
    updateLocation = { props.updateLocation }>
    <Input attr={{ name: 'password', type: 'password', ref: r => password = r }} label="Пароль"></Input>
    <Input attr={{ name: 'password_repeat', type: 'password', ref: r => passwordRepeat = r }} label="Повторите пароль"></Input>
    </Form>
  );
}
