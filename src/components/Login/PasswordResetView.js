import React from 'react';
import './PasswordResetView.css'
import Form from './Form.js'

function PasswordResetView(props) {/*updateLocation*/
  return (
    <Form
    formTitle="Сброс пароля"
    submitTitle="СБРОСИТЬ"
    submitLink="#"
    submitCallback={data => {
      return Promise.reject('ERR!11');
    }}
    updateLocation = { props.updateLocation }>
    <input required/><label>Пароль</label>
    <input required/><label>Повторите пароль</label>
    </Form>
  );
}

export default PasswordResetView;
