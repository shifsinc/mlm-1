import React from 'react';
import './Links.css'
import TitleBlock from '../common/TitleBlock.js'
import Input from '../../common/Input.js'
import Switch from '../../common/Switch.js'
import { DOMAIN } from '../../../config.js'

export default function(props){/*data, toggleLink*/
    var link = 'https://' + DOMAIN + '/signup', data = props.data ? props.data : {};
    const linkTypes = [ 'l', 'r' ];

    const _copyText = input => {
      input.select();
      document.execCommand('copy');
      input.blur();
    }

    const _copyClick = e => _copyText( e.target.parentNode.querySelector('input') )

    return (
      <TitleBlock title="Мои ссылки" className="account__links">
        <div className="account__links__cont">

        <Input attr={{ readOnly: true, value: link + '?refer=' + data.user_phone + '&type=l' }}
          label="Ссылка на левую ногу" className="label-top">
          <div className="account__links__copy-button input__button" onClick={ _copyClick }></div>
        </Input>

        <Input attr={{ readOnly: true, value: link + '?refer=' + data.user_phone + '&type=r'  }}
          label="Ссылка на правую ногу" className="label-top">
          <div className="account__links__copy-button input__button" onClick={ _copyClick }></div>
        </Input>

        <Input attr={{ readOnly: true, value: link + '?refer=' + data.user_phone }}
          label="Общая ссылка" className="label-top">
          <div className="account__links__copy-button input__button" onClick={ _copyClick }></div>
        </Input>

        <Switch titles={[ 'Левая нога', 'Правая нога' ]}
          active={ linkTypes.indexOf( data.general_link_type ) }
          onClick={ ind => props.toggleLink( linkTypes[ind] ) }></Switch>

        </div>
      </TitleBlock>
    );
  }
