import React from 'react';
import './RobotUpdates.css'
import { formatDate } from '../../../utils.js'
import Link from '../../common/Link.js'
import '../Admin/common.css'

export default function(props){/*data, _admin, _editClick, _deleteClick*/
  var data = props.data ? props.data : [];
  return (
    <div className="robot-updates__cont items-border">
      {
        data.map((d, i) => {
          return (<div key={ i } className="robot-updates__item">
            {
              props._admin ? <div className="admin__controls">
                  <Link className="admin__edit-button" onClick={ () => props._editClick(d) }></Link>
                  <Link className="admin__delete-button" onClick={ () => props._deleteClick(d) }></Link>
                </div> : undefined
            }
            <div className="robot-updates__item__date">{ formatDate( d.news_dt ) }</div>
            <div className="robot-updates__item__text">{ d.news_text }</div>
          </div>);
        })
      }
    </div>
  );
}
