import React from 'react';

function SignInView(props){/*formTitle, submitTitle, submitLink, submitCallback*/
  var form, error;
  return (
    <form className="form-view interface-block login-view" ref={r => form = r}>
      <div className="error" ref={r => error = r}>{ props.formError ? props.formError: '' }</div>
      { props.formTitle ? <h3 className="form-view__title">{ props.formTitle }</h3> : undefined }
      <div className="form-view__cont">
        { props.children }
        <a className="link button login-view__button" href={ props.submitLink }
          onClick={e => {
            e.preventDefault();
            var data = {};
            Array.prototype.forEach.call( form.querySelectorAll('input'), inp => data[ inp.name ] = inp.value);
            props.submitCallback( data ).then(r => {
              window.history.pushState(null, '', props.submitLink);
              props.updateLocation();
            }).catch(err => {
              error.innerHTML = err.message;
              if(err.fields) err.fields.forEach(f => form.querySelector('input[name="' + f + '"]').classList.add('incorrect'));
              form.classList.add('show-error');
            });
          }}>{ props.submitTitle }</a>
      </div>
    </form>
  );
}

export default SignInView;
