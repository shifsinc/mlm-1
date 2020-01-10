import React from 'react';
import './News.css'
import PageView from '../../common/PageView.js'
import ImagesView from './ImagesView.js'
import VideosView from './VideosView.js'
import { formatDate } from '../../../utils.js'
import Link from '../../common/Link.js'
import '../Admin/common.css'

export default function(props){/*apiCall, _admin, _editClick, _deleteClick*/
  var data = props.data ? props.data : [];
  return (<PageView component={ _view } componentProps={{ ...props }} onPageCount={ 5 }
    callback={ p => props.apiCall('getNews', { section: 'news', ...p }) }>
    </PageView>);
}

function _view(props){
  var data = props.data ? props.data : [];
  return (<div className="news">
      {
        data.map((d, i) => {
          return (<div key={ i } className="news__item">
            {
              props._admin ? <div className="admin__controls">
                  <Link className="admin__edit-button" onClick={ () => props._editClick(d) }></Link>
                  <Link className="admin__delete-button" onClick={ () => props._deleteClick(d) }></Link>
                </div> : undefined
            }
            <div className="news__item__text">{ d.news_text }</div>
            <div className="news__item__date">
              { formatDate(new Date( d.news_dt ), false) }
            </div>
            <ImagesView data={ d.images }></ImagesView>
            <VideosView data={ d.videos }></VideosView>
          </div>);
        })
      }
    </div>);
}
