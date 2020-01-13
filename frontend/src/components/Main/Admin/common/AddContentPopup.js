import React from 'react';
import './AddContentPopup.css'

import Form from '../../../common/Form.js'
import Popup from '../../../common/Popup.js'

export default function(props){/*onClose, formTitle, submitCallback, className*/
  return (<Popup onClose={ props.onClose }>
      <Form className={ 'admin__add-content-popup ' + ( props.className ? props.className : '' ) }
        formTitle={ props.formTitle } submitTitle="Опубликовать"
        submitCallback={ props.submitCallback }>
        { props.children }
      </Form>
    </Popup>);
}
