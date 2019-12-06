import React from 'react';
import './Form.css';

function Form(props){/*formTitle, submitTitle, submitLink, submitCallback, className*/
  var form, message;
  return (
    <form className={ 'form-view interface-block login-view' + (props.className ? ' ' + props.className : '') } ref={r => form = r}>
      <div className="message" ref={r => message = r}></div>
      { props.formTitle ? <h3 className="form-view__title">{ props.formTitle }</h3> : undefined }
      <div className="form-view__cont">
        { props.children }
        <a className="link button login-view__button" href={ props.submitLink }
          onClick={e => {

            e.preventDefault();
            var data = {};
            Array.prototype.forEach.call( form.querySelectorAll('input'), inp => {
              if(inp.type === 'file') data[ inp.name ] = inp.files.length ? inp.files[0].slice() : null;
              else data[ inp.name ] = inp.value
            });
            props.submitCallback( data ).then(r => {
              window.history.pushState(null, '', props.submitLink);
              props.updateLocation();
            }).catch(err => {
              message.innerHTML = err.message;
              if(err.fields) err.fields.forEach(f => form.querySelector('input[name="' + f + '"]').classList.add('incorrect'));
              form.classList.add('show-message');
            });

          }}>{ props.submitTitle }</a>
      </div>
    </form>
  );
}

export default Form;
