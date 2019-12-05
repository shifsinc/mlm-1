import React from 'react';
import './PasswordResetView.css'
import Form from './Form.js'
import Input from '../Input.js'

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
    <Input name="password" label="Пароль"></Input>
    <Input name="password_repeat" label="Повторите пароль"></Input>
    </Form>
  );
}

export default PasswordResetView;
