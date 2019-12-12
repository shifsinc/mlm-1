import React from 'react';
import './Info.css'
import noPhoto from '../../../img/noPhoto.png';

export default function(props) {/*updateLocation*/
  var photo, name, bonusLevel, id, email, phone, social, sponsor;
  setTimeout( () =>
    props.apiCall('getUserInfo').then(r => {
      if( !r.result ) return;
      var res = r.result;
      if( res.user_photo ) photo.src = res.user_photo;
      name.innerHTML = res.user_name + ' ' + res.user_surname;
      bonusLevel.innerHTML = 'Бонусный уровень: ' + res.user_bonus_level;
      id.innerHTML = res.user_id;
      email.innerHTML = res.user_email;
      phone.innerHTML = res.user_phone;
      social.innerHTML = res.user_social;
      social.href= res.user_social;
      sponsor.innerHTML = res.user_refer_name + ' ' + res.user_refer_surname;
  }), 0);
  return (
    <div className="account__info interface-block">
      <div className="account__info__photo">
        <img className="account__photo" src={ noPhoto } alt="User avatar" ref={ r => photo = r }/>
      </div>
      <div className="account__info__cont">
        <div className="account__info__cont1">
          <h2 ref={ r => name = r }></h2>
          <span></span>
          <span className="account__info__bunus-level" ref={ r => bonusLevel = r }></span>
        </div>
        <div className="account__info__cont2">
          <table><tbody>
            <tr><td>ID:</td><td ref={ r => id = r }></td></tr>
            <tr><td>E-mail:</td><td ref={ r => email = r }></td></tr>
            <tr><td>Телефон:</td><td ref={ r => phone = r }></td></tr>
            <tr><td>Соцсеть:</td><td><a ref={ r => social = r }></a></td></tr>
            <tr><td>Спонсор:</td><td ref={ r => sponsor = r }></td></tr>
          </tbody></table>

        </div>
        <div className="account__info__cont3">

        </div>
      </div>
    </div>
  );
}
