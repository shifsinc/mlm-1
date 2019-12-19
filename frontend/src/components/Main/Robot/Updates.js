import React from 'react';
import './Updates.css'
import TitleBlock from '../common/TitleBlock.js'
import getDataSrc from '../common/getDataSrc.js'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {
    cont.innerHTML = `
    <div class="robot__updates__item"><div>17.11.2019 15:14</div><div>Обновлено до версии 1.23</div></div>`;
  });
  return (
    <TitleBlock title="Обновления" className="robot__updates">
      <div className="robot__updates__cont" ref={ r => cont = r }>
      </div>
    </TitleBlock>
  );
}
