import React from 'react';
import DataForm from '../DataForm.js'

export default function(props){/*updateLocation*/
  return (<DataForm { ...props }
    title="Заполните личные данные"
    className="login-form interface-block"
    submitCallback={data => {
      return props.apiCall('fillData', data);
    }}></DataForm>);
}
