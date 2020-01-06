import React from 'react';
import './Form.css';

export default class extends React.Component{/*formTitle, submitTitle, submitCallback, className, updateLocation*/
  render(){
    return (
      <form className={ 'form ' + (this.props.className ? this.props.className : '') } ref={ r => this.form = r }
        onSubmit={ this._onSubmit }>

        <div className="message" ref={ r => this.message = r }></div>
        { this.props.formTitle ? <h3 className="form__title">{ this.props.formTitle }</h3> : undefined }
        <div className="form__cont">
          { this.props.children }
          <a className="link button form__button" href="##"
            onClick={ this._onSubmit }>{ this.props.submitTitle }</a>
          <input type="submit" onClick={ this._onSubmit } style={{ display: 'none' }}/>
        </div>

      </form>
    );
  }

  _checkRepeat = inputs => {
    var ret = true;
    Array.prototype.forEach.call( inputs, inp => {
      var repeat = /^(.+)_repeat$/.exec( inp.name );
      if( !repeat ) return;
      var field = this.form.querySelector( 'input[name="' + repeat[1] + '"]' );
      if( !field ) return;
      if( inp.value !== field.value ){
        inp.classList.add('incorrect');
        ret = false;
      }
    });
    return ret;
  }

  _onSubmit = e => {
    e.preventDefault();
    if( this.form.querySelector('input.incorrect') ) return;

    var inputs = this.form.querySelectorAll('input, textarea');
    if( !this._checkRepeat(inputs) ) return;

    var data = {};
    Array.prototype.forEach.call( inputs, inp => {
      if( inp.type === 'submit' ) return;
      if( inp.type === 'file' && inp.files.length ){
        data[ inp.name ] = inp.files[0].slice();
      } else data[ inp.name ] = inp.value;
    });

    var prom = this.props.submitCallback( data );
    if( !prom ) return;
    prom.then( ({ action }) => {/*text, fields, path*/
      if( !action || !this.form ) return;
      if( action.text ){
        this.message.innerHTML = action.text;
        this.form.classList.add('show-message');
      }
      if( action.fields ){
        action.fields.forEach(f => {
          var field = this.form.querySelector('input[name="' + f + '"]');
          if(field) field.classList.add('incorrect');
        });
      }
      if( action.path ) this.props.updateLocation( action.path );
    } );
  }

}
