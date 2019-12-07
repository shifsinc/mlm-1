import React from 'react';
import './Form.css';

function Form(props){/*formTitle, submitTitle, submitCallback, className*/
  var form, message,
    showMessage = msg => {
      message.innerHTML = msg;
      form.classList.add('show-message');
    }
  return (
    <form className={ 'form-view interface-block login-view' + (props.className ? ' ' + props.className : '') } ref={r => form = r}>
      <div className="message" ref={r => message = r}></div>
      { props.formTitle ? <h3 className="form-view__title">{ props.formTitle }</h3> : undefined }
      <div className="form-view__cont">
        { props.children }
        <a className="link button login-view__button"
          onClick={e => {

            e.preventDefault();
            var data = {}, fl = false;
            Array.prototype.forEach.call( form.querySelectorAll('input'), inp => {
              if(inp.type === 'file') data[ inp.name ] = inp.files.length ? inp.files[0].slice() : null;
              else {
                if( inp.dataset.regexp && !new RegExp( inp.dataset.regexp ).test( inp.value ) ){
                  fl = true;
                  inp.classList.add('incorrect');
                } else {
                  data[ inp.name ] = inp.value;
                  inp.classList.remove('incorrect');
                }
              }
            });
            if(fl) return;
            props.submitCallback( data ).then(r => {/*result, text, fields, path*/
              if( r.text ) showMessage( r.text );
              if( r.fields ) r.fields.forEach(f => form.querySelector('input[name="' + f + '"]').classList.add('incorrect'));
              if( r.path ){
                window.history.pushState(null, '', r.path);
                props.updateLocation();
              }
            });

          }}>{ props.submitTitle }</a>
      </div>
    </form>
  );
}

export default Form;
