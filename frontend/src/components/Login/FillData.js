import React from 'react';
import DataForm from '../common/DataForm.js'

export default function(props){/*updateLocation, apiCall, uploadFile*/
  return (<DataForm { ...props }
    title="Заполните личные данные"
    className="login-form interface-block"
    submitCallback={data => {
      var resolve,
        ret = new Promise((res, rej) => {
          resolve = res;
        });

      if( data.photo ){
        this.props.uploadFile( 'uploadPhoto', data.photo ).then(r => {
          if( !r.result ) return resolve(r);
          data.photo = r.result.filename;
          resolve( props.apiCall('fillUserInfo', data) );
        });
      } else resolve( props.apiCall('fillUserInfo', data) );

      return ret;

    }}></DataForm>);
}
