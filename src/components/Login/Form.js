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
            props.submitCallback().then(r => {
              window.history.pushState(null, '', props.submitLink);
              props.updateLocation();
            }).catch(err => {
              error.innerHTML = err;
              form.classList.add('show-error');
            });
          }}>{ props.submitTitle }</a>
      </div>
    </form>
  );
}

export default SignInView;
