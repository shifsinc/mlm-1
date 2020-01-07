import React from 'react';
import './UserCard.css'
import './userStatus.css'
import Popup from '../../common/Popup.js'
import { RATES_IMAGES, STATUS_TITLES, BINARY_CYCLE_AMOUNT } from '../../../const.js'
import { formatDate } from '../../../utils.js'
import noPhoto from '../../../img/noPhoto.png'

export default function(props) {/*data, onClose*/
  var data = props.data ? props.data : {};
  return (
    <Popup className={ 'user-card status-' + data.user_status } onClose={ props.onClose }>
      <div className="user-card__cont">
        <div className={ 'user-card__status-img status-' + ( data.user_status + '-avatar' ) }></div>
        <div className="user-card__left">
          <div className="user-card__photo">
            <img alt="avatar" src={ data.user_photo_url ? data.user_photo_url : noPhoto }/>
          </div>
          <img className="user-card__rate" alt="user rate" src={ RATES_IMAGES[ data.user_rate ] }/>
        </div>
        <div className="user-card__right">
          <h2 className="user-card__name">{ data.user_name } { data.user_surname }</h2>
          <div className="user-card__status">{ STATUS_TITLES[ data.user_status ] }</div>
          <table className="user-card__info"><tbody>
            <tr><td>Код рефера</td><td>{ data.user_phone }</td></tr>
            <tr><td>Зарегестрирован</td><td>{ formatDate( data.user_dt ) }</td></tr>
            { data.account_last_payment_ts ? (
              <tr><td>Последний платеж</td><td>{ formatDate( data.account_last_payment_ts ) }</td></tr>
            ) : undefined
            }
            { data.user_refer_id ? (<>
              <tr><td>Спонсор</td><td>{ data.user_refer_name } { data.user_refer_surname }</td></tr>
              <tr><td>Код спонсора</td><td>{ data.user_refer_phone }</td></tr>
            </>) : undefined
            }
            <tr>
              <td>Бинарных циклов</td>
              <td>{ ( Math.floor( data.stats_yt_left / BINARY_CYCLE_AMOUNT ) ) } (левая) / { ( Math.floor( data.stats_yt_right / BINARY_CYCLE_AMOUNT )  ) } (правая)</td>
            </tr>
            <tr><td>Лидерский бонус</td><td>{ data.bonus_lead }</td></tr>
            <tr><td>Заработано YT</td><td>{ data.stats_yt_total }</td></tr>
            <tr><td>Пользователей</td><td>{ data.stats_left_referals } (левая) / { data.stats_right_referals } (правая)</td></tr>
            <tr><td>Баланс / Списания</td><td>{ data.account_balance } / { data.account_withdraws }</td></tr>

          </tbody></table>
        </div>
      </div>
    </Popup>
  );
}
