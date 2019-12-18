import React from 'react';
import './Links.css'
import Block from './Block.js'
import Input from '../../Input.js'
import { domain } from '../../../config.js'

export default class extends React.Component {
  constructor(props) {/*updateLocation, dataSrc*/
    super(props);
    this.state = {
      phone: '',
      general_type: 'l'
    }
    props.dataSrc.then(res => {
      this.setState({ phone: res.user_phone, general_type: res.general_link_type });
    })
  }
  render(){
    var link = 'https://' + domain + '/signup',
      setTarget = type => {
        if(type === this.state.general_type) return;
        this.props.apiCall('setGeneralLinkType', { type }).then( r => {
          if(r.status === 'ok') this.setState({ general_type: type });
        })
      },
      copyText = input => {
        input.select();
        document.execCommand('copy');
        input.blur();
      }
    return (
      <Block title="Мои ссылки" className="account__links">
        <div className="account__links__cont">
        <Input attr={{ readOnly: true, value: link + '?refer=' + this.state.phone + '&type=l' }}
          label="Ссылка на левую ногу" className="label-top"
          buttonClick={e => copyText( e.target.parentNode.querySelector('input') )}></Input>
        <Input attr={{ readOnly: true, value: link + '?refer=' + this.state.phone + '&type=r'  }}
          label="Ссылка на правую ногу" className="label-top"
          buttonClick={e => copyText( e.target.parentNode.querySelector('input') )}></Input>
        <Input attr={{ readOnly: true, value: link + '?refer=' + this.state.phone }}
          label="Общая ссылка" className="label-top"
          buttonClick={e => copyText( e.target.parentNode.querySelector('input') )}></Input>
        <div className="account__links__switch">
          <div onClick={ () => setTarget('l') } className={ this.state.general_type === 'l' ? 'active': '' }>Левая нога</div>
          <div onClick={ () => setTarget('r') } className={ this.state.general_type === 'r' ? 'active': '' }>Правая нога</div>
        </div>
        </div>
      </Block>
    );
  }
}
