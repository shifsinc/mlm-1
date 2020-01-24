import React from 'react';
import './Form.css';

export default class extends React.Component{/*formTitle, submitTitle, submitCallback, className, updateLocation*/
  constructor(props){
    super(props);
    this.state = {
      submitted: false
    }
  }
  render(){
    return (<form className={ 'form ' + (this.props.className ? this.props.className : '') } ref={ r => this.form = r }
        onSubmit={ this._onSubmit }>

        <div className="message" ref={ r => this.message = r }></div>
        { this.props.formTitle ? <h3 className="form__title">{ this.props.formTitle }</h3> : undefined }
        <div className="form__cont">
          { this.props.children }
          <a className={ 'link button form__button ' + ( this.state.submitted ? 'button_inactive' : '' ) } href="##"
            onClick={ this._onSubmit }>{ this.props.submitTitle }</a>
          <input type="submit" onClick={ this._onSubmit } style={{ display: 'none' }}/>
        </div>

      </form>);
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

  _checkRequired = inputs => {
    return Array.prototype.reduce.call(inputs, (s, inp) => {
      if( !inp.value && inp.classList.contains('required') ){
        inp.classList.add('incorrect');
        return s++;
      } else return s;
    }, 0);
  }

  _onSubmit = e => {
    e.preventDefault();
    if( this.state.submitted ) return;

    var inputs = this.form.querySelectorAll('input, textarea');
    if( !this._checkRepeat(inputs) || this._checkRequired(inputs) || this.form.querySelector('input.incorrect') ) return;

    var data = {};
    Array.prototype.forEach.call( inputs, inp => {
      if( inp.type === 'submit' || !inp.name ) return;
      if( inp.type === 'file' && inp.files.length ){
        data[ inp.name ] = Array.prototype.map.call( inp.files, f => f.slice());
      } else data[ inp.name ] = inp.value;
    });

    var prom = this.props.submitCallback( data );
    if( !prom ) return;

    this.setState({ submitted: true });
    setTimeout(() => this.setState({ submitted: false }), 5000);

    prom.then( ({ action }) => {/*text, fields, path*/
      this.setState({ submitted: false });
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
