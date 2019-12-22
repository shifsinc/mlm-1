import React from 'react';
import './PasswordReset.css'
import Form from '../Form.js'
import Input from '../Input.js'

export default function(props) {/*updateLocation*/
  return (
    <Form
    className="login-form interface-block"
    formTitle="Сброс пароля"
    submitTitle="СБРОСИТЬ"
    submitCallback={data => {
      return props.apiCall('passwordReset', { ...data, resetToken: props.params.resetToken });
    }}
    updateLocation = { props.updateLocation }>
    <Input attr={{ name: 'password', type: 'password' }} label="Пароль"></Input>
    <Input attr={{ name: 'password_repeat', type: 'password' }} label="Повторите пароль"></Input>
    </Form>
  );
}
