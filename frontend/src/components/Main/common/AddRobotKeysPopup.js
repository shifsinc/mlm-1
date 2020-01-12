import React from 'react';
import './AddRobotKeysPopup.css'

import Popup from '../../common/Popup.js'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import { passwordRegexp } from '../../../const.js'

export default function(props){/*title, extraInput, onSubmit, onClose, data*/
  var data = props.data ? props.data : [];

  return (<Popup className="add-robot-keys-popup" onClose={ props.onClose }>
        <Form formTitle={ props.title } submitTitle="Сохранить" submitCallback={ props.onSubmit }>
          <Input label="Введите номер торгового счета 1" attr={{ name: 'account1', autoFocus: true, defaultValue: data[0] }}></Input>
          { props.extraInput ? (
            <Input label="Введите номер торгового счета 2" attr={{ name: 'account2', defaultValue: data[1] }}></Input>
          ) : undefined }
          <Input label="Введите пароль" regexp={ passwordRegexp } attr={{ name: 'current_password', type: 'password' }}></Input>
        </Form>
      </Popup>);
}
