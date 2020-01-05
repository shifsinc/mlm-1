import React from 'react';

import AddContentPopup from './AddContentPopup.js'
import Input from '../../../common/Input.js'

export default function(props){/*title, submitCallback, onClose*/
  return (<AddContentPopup formTitle={ props.title } onClose={ props.onClose }
      submitCallback={ props.submitCallback }>

      <Input attr={{ name: 'title' }} label="Название для публикации"></Input>
      <textarea name="descr" placeholder="Описание файла"></textarea>
      <Input attr={{ type: 'file', name: 'file' }}>
        <div className="button inactive admin__button">Прикрепить</div>
      </Input>
      
    </AddContentPopup>);
}
