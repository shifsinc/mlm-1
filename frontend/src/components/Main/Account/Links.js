import React from 'react';
import './Links.css'
import TitleBlock from '../common/TitleBlock.js'
import Input from '../../Input.js'
import { DOMAIN } from '../../../config.js'

export default class extends React.Component {
  constructor(props) {/*data*/
    super(props);
    this.state = props.data;
  }

  render(){
    var link = 'https://' + DOMAIN + '/signup';
    return (
      <TitleBlock title="Мои ссылки" className="account__links">
        <div className="account__links__cont">

        <Input attr={{ readOnly: true, value: link + '?refer=' + this.state.user_phone + '&type=l' }}
          label="Ссылка на левую ногу" className="label-top"
          buttonClick={e => this._copyText( e.target.parentNode.querySelector('input') )}></Input>

        <Input attr={{ readOnly: true, value: link + '?refer=' + this.state.user_phone + '&type=r'  }}
          label="Ссылка на правую ногу" className="label-top"
          buttonClick={e => this._copyText( e.target.parentNode.querySelector('input') )}></Input>

        <Input attr={{ readOnly: true, value: link + '?refer=' + this.state.user_phone }}
          label="Общая ссылка" className="label-top"
          buttonClick={e => this._copyText( e.target.parentNode.querySelector('input') )}></Input>

        <div className="account__links__switch">
          <div onClick={ () => this._setTarget('l') }
            className={ this.state.general_link_type === 'l' ? 'active': '' }>Левая нога</div>
          <div onClick={ () => this._setTarget('r') }
            className={ this.state.general_link_type === 'r' ? 'active': '' }>Правая нога</div>
        </div>
        </div>
      </TitleBlock>
    );
  }

  _setTarget = type => {
    if( type === this.state.general_type ) return;
    this.props.apiCall('setGeneralLinkType', { type }).then( r => {
      if(r.status === 'ok') this.setState({ general_link_type: type });
    })
  }

  _copyText = input => {
    input.select();
    document.execCommand('copy');
    input.blur();
  }

}
