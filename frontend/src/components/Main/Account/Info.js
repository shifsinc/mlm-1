import React from 'react';
import './Info.css'
import noPhoto from '../../../img/noPhoto.png';

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <div className="account__info interface-block">
      <div className="account__info__photo">
        <img className="account__photo" src={ data.user_photo_url ? data.user_photo_url : noPhoto } alt="User avatar"/>
      </div>
      <div className="account__info__cont">
        <div className="account__info__cont1">
          <span className="account__info__bunus-level">{ data.user_bonus_level }</span>
          <span className="account__info__rate">{ data.user_rate }</span>
          <h2>{ data.user_name + ' ' + data.user_surname }</h2>
          <div>{ data.user_status }</div>
        </div>
        <div className="account__info__cont2">
          <table><tbody>
            <tr><td>ID:</td><td>{ data.user_id }</td></tr>
            <tr><td>E-mail:</td><td>{ data.user_email }</td></tr>
            <tr><td>Телефон:</td><td>{ data.user_phone }</td></tr>
            <tr>
              <td>Соцсеть:</td>
              <td><a target="_blank noopener noreferrer" href={ data.user_social }>{ data.user_social }</a></td>
            </tr>
            { data.user_refer_id ? (
              <tr><td>Спонсор:</td><td>{ data.user_refer_name + ' ' + data.user_refer_surname }</td></tr>
            ) : undefined }
          </tbody></table>

        </div>
        <div className="account__info__cont3">
          <div className="account__info__cont3__item">
            <div>{ data.referals_count }</div><div>Мои рефералы</div>
          </div>
          <div className="account__info__cont3__item">
            <div>{ data.day_profit }</div><div>Дневной доход</div>
          </div>
          <div className="account__info__cont3__item">
            <div>{ data.account_balance }</div><div>Баланс YT</div>
          </div>
          <div className="account__info__cont3__item">
            <div>{ data.yt_left }</div><div>YT слева</div>
          </div>
          <div className="account__info__cont3__item">
            <div>{ data.yt_right }</div><div>YT справа</div>
          </div>
          <div className="account__info__cont3__item">
            <div>{ data.binary_cycles }</div><div>Бинарные циклы</div>
          </div>
        </div>
      </div>
    </div>
  );
}
