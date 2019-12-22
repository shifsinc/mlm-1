import React from 'react';
import './Purchase.css'
import TitleBlock from '../common/TitleBlock.js'
import Link from '../../Link.js'

import robotClient from '../../../img/robot_client@2x.png'
import robotLight from '../../../img/robot_light@2x.png'
import robotAdvanced from '../../../img/robot_advanced@2x.png'
import robotMaster from '../../../img/robot_master@2x.png'

export default function(props){/*data*/
  var data = props.data ? props.data : {};
  return (
    <TitleBlock title="Покупка робота" className="robot__purchase">
      <div className="robot_purchase__robot">
        <img src={ robotClient } alt="client"/>
        <Link className="button button-client">
          { data.user_rate === 'client' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
      <div className="robot_purchase__robot">
        <img src={ robotLight } alt="light"/>
        <Link className="button button-light">
          { data.user_rate === 'light' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
      <div className="robot_purchase__robot">
        <img src={ robotAdvanced } alt="advanced"/>
        <Link className="button button-advanced">
          { data.user_rate === 'advanced' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
      <div className="robot_purchase__robot">
        <img src={ robotMaster } alt="master"/>
        <Link className="button button-master">
          { data.user_rate === 'master' ? 'Куплено' : 'Купить' }
        </Link>
      </div>
    </TitleBlock>
  );
}
