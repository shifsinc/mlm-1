import React from 'react';
import './Form.css';

export default function(props){/*formTitle, submitTitle, submitCallback, className*/
  var form, message,

    checkRepeat = inputs => {
      var ret = true;
      Array.prototype.forEach.call( inputs, inp => {
        var repeat = /^(.+)_repeat$/.exec( inp.name );
        if( !repeat ) return;
        var field = form.querySelector( 'input[name="' + repeat[1] + '"]' );
        if( !field ) return;
        if( inp.value !== field.value ){
          inp.classList.add('incorrect');
          ret = false;
        }
      });
      return ret;
    },

    onSubmit = e => {
      e.preventDefault();
      if( form.querySelector('input.incorrect') ) return;

      var inputs = form.querySelectorAll('input');
      if( !checkRepeat(inputs) ) return;

      var data = {};
      Array.prototype.forEach.call( inputs, inp => {
        if(inp.type === 'file') data[ inp.name ] = inp.files.length ? inp.files[0].slice() : null;
        else data[ inp.name ] = inp.value;
      });

      var prom = props.submitCallback( data );
      if( !prom ) return;
      prom.then(({ action }) => {/*text, fields, path*/
        if( !action ) return;
        if( action.text ){
          message.innerHTML = action.text;
          form.classList.add('show-message');
        }
        if( action.fields ) action.fields.forEach(f => form.querySelector('input[name="' + f + '"]').classList.add('incorrect'));
        if( action.path ) props.updateLocation( action.path );
      });
    }

  return (
    <form className={ 'form' + (props.className ? ' ' + props.className : '') } ref={r => form = r}>
      <div className="message" ref={r => message = r}></div>
      { props.formTitle ? <h3 className="form__title">{ props.formTitle }</h3> : undefined }
      <div className="form__cont">
        { props.children }
        <a className="link button form__button" href="##"
          onClick={ onSubmit }>{ props.submitTitle }</a>
        <button onClick={ onSubmit } style={{ display: 'none' }}></button>
      </div>
    </form>
  );
}
