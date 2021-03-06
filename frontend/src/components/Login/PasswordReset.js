import React from 'react';
import './PasswordReset.css'
import Form from '../common/Form.js'
import Input from '../common/Input.js'
import { passwordRegexp } from '../../const.js'

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
      <Input regexp={ passwordRegexp } attr={{ name: 'password', autoFocus: true, type: 'password' }} label="Пароль"></Input>
      <Input regexp={ passwordRegexp } attr={{ name: 'password_repeat', type: 'password' }} label="Повторите пароль"></Input>
    </Form>
  );
}
