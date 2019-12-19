import React from 'react';
import './News.css'
import TitleBlock from '../common/TitleBlock.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    r.forEach(r => {
      var item = document.createElement('div');
      item.className = 'account__news__item';
      var date = new Date( r.news_dt );
      item.innerHTML = `<div class="account__news__item__text">` + r.news_text + `</div>
      <div class="account__news__item__date">` + (date.getDate() + '.' + date.getMonth() + '.' + (date.getYear()+1900)) + `</div>`;
      cont.appendChild(item);
    });
  });

  return (
    <TitleBlock title="Новости" className="account__news" >
      <div className="account__news__cont" ref={ r => cont = r }></div>
    </TitleBlock>
  );
}
