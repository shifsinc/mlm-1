import React from 'react';
import './AddRobotKeysPopup.css'

import Popup from '../../common/Popup.js'
import Form from '../../common/Form.js'
import Input from '../../common/Input.js'
import { robotKeyRegexp } from '../../../const.js'

export default function(props){/*title, extraInput, onSubmit, onClose, data*/
  var data = props.data ? props.data : [];

  return (<Popup className="add-robot-keys-popup" onClose={ props.onClose }>
        <Form formTitle={ props.title } submitTitle="Сохранить" submitCallback={ d => {
          var acc = [];
          acc.push( d.account1 );
          if( d.account2 ) acc.push( d.account2 );
          return props.onSubmit({ accounts: acc, current_password: d.current_password });
        } }>
          <Input label="Введите номер торгового счета 1" regexp={ robotKeyRegexp }
            attr={{ name: 'account1', autoFocus: true, defaultValue: data[0] }}></Input>

          { props.extraInput ? (
            <Input label="Введите номер торгового счета 2" regexp={ robotKeyRegexp }
            attr={{ name: 'account2', defaultValue: data[1] }}></Input>
          ) : undefined }
          
          <Input label="Введите пароль" attr={{ name: 'current_password', type: 'password' }}></Input>
        </Form>
      </Popup>);
}
