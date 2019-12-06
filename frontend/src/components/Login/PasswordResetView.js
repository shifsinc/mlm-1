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
    submitLink="/signin"
    submitCallback={data => {
      return passwordResetApi({ ...data, token: props.params.token });
    }}
    updateLocation = { props.updateLocation }>
    <Input attr={{ name: 'password' }} label="Пароль"></Input>
    <Input attr={{ name: 'password_repeat' }} label="Повторите пароль"></Input>
    </Form>
  );
}

export default PasswordResetView;
