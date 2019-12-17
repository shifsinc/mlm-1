import React from 'react';
import './Users.css'
import noPhoto from '../../../img/noPhoto.png';
import Block from './Block.js'

export default function(props) {/*updateLocation*/
  var cont;
  props.dataSrc.then(res => {
    res.forEach(u => {
      var user = document.createElement('div');
      user.className = 'account__users__user';
      user.innerHTML = `<img alt="` + u.user_id + `" src="` + (u.user_photo ? u.user_photo : noPhoto) + `"/>
        <div>` + u.user_name + `</div>`;
      cont.insertBefore(user, cont.lastChild);
    });
  });
  return (
    <Block title={ props.title } className="account__users">
    <div className="account__users__cont" ref={ r => cont = r }>
      <div className="account__users__more"><div></div></div>
    </div>
    </Block>
  );
}
