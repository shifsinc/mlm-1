import React from 'react';
import './Form.css';

export default function(props){/*formTitle, submitTitle, submitCallback, className*/
  var form, message;
  return (
    <form className={ 'form-view interface-block login-view' + (props.className ? ' ' + props.className : '') } ref={r => form = r}>
      <div className="message" ref={r => message = r}></div>
      { props.formTitle ? <h3 className="form-view__title">{ props.formTitle }</h3> : undefined }
      <div className="form-view__cont">
        { props.children }
        <a className="link button login-view__button" href="##"
          onClick={e => {

            e.preventDefault();
            var data = {};
            if( form.querySelector('input.incorrect') ) return;
            Array.prototype.forEach.call( form.querySelectorAll('input'), inp => {
              if(inp.type === 'file') data[ inp.name ] = inp.files.length ? inp.files[0].slice() : null;
              else data[ inp.name ] = inp.value;
            });
            props.submitCallback( data ).then(({ action }) => {/*text, fields, path*/
              if( !action ) return;
              if( action.text ){
                message.innerHTML = action.text;
                form.classList.add('show-message');
              }
              if( action.fields ) action.fields.forEach(f => form.querySelector('input[name="' + f + '"]').classList.add('incorrect'));
              if( action.path ){
                props.updateLocation( action.path );
              }
            });

          }}>{ props.submitTitle }</a>
      </div>
    </form>
  );
}
