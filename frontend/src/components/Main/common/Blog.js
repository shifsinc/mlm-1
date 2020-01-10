import React from 'react';
import './Blog.css'
import PageView from '../../common/PageView.js'
import ImagesView from './ImagesView.js'
import VideosView from './VideosView.js'
import { formatDate } from '../../../utils.js'
import Link from '../../common/Link.js'
import '../Admin/common.css'

export default function(props){/*apiCall*/
  var data = props.data ? props.data : [];
  return (<PageView component={ _view } componentProps={{ ...props }} onPageCount={ 5 }
    callback={ p => props.apiCall('getNews', { section: 'blog', ...p }) }>
    </PageView>);
}

function _view(props){
  var data = props.data ? props.data : [];
  return (<div className="blog">
      {
        data.map((d, i) => {
          return (<div key={ i } className="blog__item interface-block">
            {
              props._admin ? <div className="admin__controls">
                  <Link className="admin__edit-button" onClick={ () => props._editClick(d) }></Link>
                  <Link className="admin__delete-button" onClick={ () => props._deleteClick(d) }></Link>
                </div> : undefined
            }
            <div className="blog__item__title">{ d.news_title }</div>
            <div className="blog__item__date">
              { formatDate(new Date( d.news_dt ), false) }
            </div>
            <div className="blog__item__text">{ d.news_text }</div>
            <ImagesView data={ d.images }></ImagesView>
            <VideosView data={ d.videos }></VideosView>
          </div>);
        })
      }
    </div>);
}
