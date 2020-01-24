import React from 'react';
import './Info.css'

import Link from '../../common/Link.js'
import noPhoto from '../../../img/noPhoto.png';
import { STATUS_TITLES, BINARY_CYCLE_AMOUNT, RATES_TITLES, RATES_IMAGES } from '../../../const.js'

export default function(props){/*data, userClick, updateLocation*/
  var data = props.data ? props.data : {};

  const onPhotoLoad = e => {
    var width = e.target.clientWidth, contWidth = e.target.parentElement.clientWidth;
    if( width > contWidth ){
      e.target.style.height = '100%';
      e.target.style.marginLeft = ( -( width - contWidth ) / 2 ) + 'px';
    }
  }
  return (
    <div className="account__info interface-block">
      <div className="account__info__photo">

        <img className="account__photo" onLoad={ onPhotoLoad }
          src={ data.user_photo_url ? data.user_photo_url : noPhoto } alt="User avatar"/>
        <div className="account__info__edit">
          <Link path="/settings" updateLocation={ props.updateLocation }>Редактировать</Link>
        </div>

      </div>
      <div className="account__info__cont">
        <div className="account__info__cont1">
          <div className="account__info__account-info">
            { data.user_rate ?
              <div className="account__info__rate">Аккаунт: <span>{ RATES_TITLES[ data.user_rate ] }</span></div>
            : undefined
            }
          </div>
          <h2>{ data.user_name } { data.user_surname }</h2>
          <div className="account__info__status">{ STATUS_TITLES[ data.user_status ] }</div>
        </div>
        <div className="account__info__cont2">
          <table><tbody>
            <tr><td>ID:</td><td>
              <Link active onClick={ () => props.userClick({ user_id: data.user_id }) }>
                { data.user_id }
              </Link>
            </td></tr>
            <tr><td>E-mail:</td><td>{ data.user_email }</td></tr>
            <tr><td>Телефон:</td><td>{ data.user_phone }</td></tr>
            <tr>
              <td>Соцсеть:</td>
              <td><a className="link_active" active target="_blank noopener noreferrer" href={ data.user_social }>
                { data.user_social }
              </a></td>
            </tr>
            { data.user_refer_id ? (
              <tr>
                <td>Спонсор:</td>
                <td><Link active onClick={ () => props.userClick({ user_id: data.user_refer_id }) }>
                  { data.user_refer_name } { data.user_refer_surname }
                </Link></td>
              </tr>
            ) : undefined }
          </tbody></table>
          { data.user_rate ?
            <img className="account__info__cont2__rate" alt="user rate" src={ RATES_IMAGES[ data.user_rate ] }/>
            : undefined
          }
        </div>
        <div className="account__info__cont3">
          <div className="account__info__cont3__item">
            <div onClick={ () => props.updateLocation('/finances') }>{ data.stats_first_line_referals }</div><div>Мои рефералы</div>
          </div>
          <div className="account__info__cont3__item">
            <div onClick={ () => props.updateLocation('/finances') }>{ data.stats_day_profit }</div><div>Дневной доход</div>
          </div>
          <div className="account__info__cont3__item">
            <div onClick={ () => props.updateLocation('/finances') }>{ data.account_balance }</div><div>Баланс YT</div>
          </div>
          <div className="account__info__cont3__item">
            <div onClick={ () => props.updateLocation('/finances') }>{ data.stats_yt_left }</div><div>YT слева</div>
          </div>
          <div className="account__info__cont3__item">
            <div onClick={ () => props.updateLocation('/finances') }>{ data.stats_yt_right }</div><div>YT справа</div>
          </div>
          <div className="account__info__cont3__item">
            <div onClick={ () => props.updateLocation('/finances') }>
              {
                ( Math.floor( data.stats_yt_left / BINARY_CYCLE_AMOUNT ) ) + '/' +
                ( Math.floor( data.stats_yt_right / BINARY_CYCLE_AMOUNT )  )
              }
            </div>
            <div>Бинарные циклы</div>
          </div>
        </div>
      </div>
    </div>
  );
}
