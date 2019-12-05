import React from 'react';
import './PasswordResetView.css'
import Form from './Form.js'

import passwordResetApi from '../../api/passwordReset.js';

function PasswordResetView(props) {/*updateLocation*/
  return (
    <Form
    formTitle="Сброс пароля"
    submitTitle="СБРОСИТЬ"
    submitLink="#"
    submitCallback={data => {
      return passwordResetApi(data);
    }}
    updateLocation = { props.updateLocation }>
    <input required name="password"/><label>Пароль</label>
    <input required name="password_repeat"/><label>Повторите пароль</label>
    </Form>
  );
}

export default PasswordResetView;
