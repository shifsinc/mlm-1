import React from 'react';
import './Users.css'
import noPhoto from '../../../img/noPhoto.png'
import TitleBlock from '../common/TitleBlock.js'

export default function(props){/*title, data*/
  var data = props.data ? props.data : [];
  return (
    <TitleBlock title={ props.title } className="account__users">
    <div className="account__users__cont">
      {
        data.map( (d, i) => {
          return (<div key={ i } className="account__users__user">
            <img alt={ d.user_id } src={ d.user_photo_url ? d.user_photo_url : noPhoto }/>
            <div>{ d.user_name }</div>
          </div>);
        } )
      }
      <div className="account__users__more"><div></div></div>
    </div>
    </TitleBlock>
  );
}
