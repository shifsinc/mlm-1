import React from 'react';
import './FirstStep.css'
import Input from '../../../common/Input.js'
import Link from '../../../common/Link.js'
import Form from '../../../common/Form.js'
import { ethereumRegexp } from '../../../../const.js'

export default function(props) {/*apiCall, _next*/
  return (
    <Form className="start-work__first-step" submitTitle="Сохранить" submitCallback={ data => {
      return props.apiCall('fillBilling', data).then(r => {
        if( r.status === 'ok' ) props._next();
        return r;
      })
    } }>

    <Input required label="Ваш Ethereum-адрес" regexp={ ethereumRegexp } attr={{ name: 'ethereum', autoFocus: true }}></Input>

    <Link className="button button_inactive start-work__button"
      onClick={ () => props._next() }>Пропустить</Link>

    </Form>
  );
}
