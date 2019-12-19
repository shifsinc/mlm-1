import React from 'react';
import './Users.css'
import noPhoto from '../../../img/noPhoto.png';
import TitleBlock from '../common/TitleBlock.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    r.forEach(u => {
      var user = document.createElement('div');
      user.className = 'account__users__user';
      user.innerHTML = `<img alt="` + u.user_id + `" src="` + (u.user_photo_url ? u.user_photo_url : noPhoto) + `"/>
        <div>` + u.user_name + `</div>`;
      cont.insertBefore(user, cont.lastChild);
    });
  });

  return (
    <TitleBlock title={ props.title } className="account__users">
    <div className="account__users__cont" ref={ r => cont = r }>
      <div className="account__users__more"><div></div></div>
    </div>
    </TitleBlock>
  );
}
