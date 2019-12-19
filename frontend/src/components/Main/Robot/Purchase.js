import React from 'react';
import './Purchase.css'
import TitleBlock from '../common/TitleBlock.js'
import Link from '../../Link.js'

import getDataSrc from '../common/getDataSrc.js'
import robotClient from '../../../img/robot_client@2x.png'
import robotLight from '../../../img/robot_light@2x.png'
import robotAdvanced from '../../../img/robot_advanced@2x.png'
import robotMaster from '../../../img/robot_master@2x.png'

export default function(props) {/*updateLocation, dataSrc*/
  var cont;
  getDataSrc(props.dataSrc, r => {

  });
  return (
    <TitleBlock title="Покупка робота" className="robot__purchase">
      <div className="robot_purchase__robot">
        <img src={ robotClient } alt="client"/>
        <Link className="button button-client" path="##" updateLocation={ props.updateLocation }>Купить</Link>
      </div>
      <div className="robot_purchase__robot">
        <img src={ robotLight } alt="light"/>
        <Link className="button button-light" path="##" updateLocation={ props.updateLocation }>Купить</Link>
      </div>
      <div className="robot_purchase__robot">
        <img src={ robotAdvanced } alt="advanced"/>
        <Link className="button button-advanced" path="##" updateLocation={ props.updateLocation }>Купить</Link>
      </div>
      <div className="robot_purchase__robot">
        <img src={ robotMaster } alt="master"/>
        <Link className="button button-master" path="##" updateLocation={ props.updateLocation }>Купить</Link>
      </div>
    </TitleBlock>
  );
}
