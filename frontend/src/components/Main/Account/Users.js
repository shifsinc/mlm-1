import React from 'react';
import './Users.css'
import noPhoto from '../../../img/noPhoto.png'
import TitleBlock from '../common/TitleBlock.js'

export default function(props){/*updateLocation, title, data, userClick*/
  var data = props.data ? props.data : [];
  return (
    <TitleBlock title={ props.title } className="account__users">
    <div className="account__users__cont">
      {
        data.map( (d, i) => {
          return (<div key={ i } className="account__users__user" onClick={ () => props.userClick(d) }>
            <img alt={ d.user_id } src={ d.user_photo_url ? d.user_photo_url : noPhoto }/>
            <div>{ d.user_name }</div>
          </div>);
        } )
      }
      <div className="account__users__more" onClick={ () => props.updateLocation('/team') }><div></div></div>
    </div>
    </TitleBlock>
  );
}
