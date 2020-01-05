import React from 'react';
import './AddContentPopup.css'

import Link from '../../../common/Link.js'
import Form from '../../../common/Form.js'
import Popup from '../../../common/Popup.js'

export default function(props){/*onClose, formTitle, submitCallback*/
  return (<Popup onClose={ props.onClose }>
      <Form className="admin__add-content-popup" submitClassName="admin__button"
        formTitle={ props.formTitle } submitTitle="Опубликовать"
        submitCallback={ props.submitCallback }>
        { props.children }
      </Form>
    </Popup>);
}
