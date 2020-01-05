import React from 'react';
import './Blog.css'
import PageView from '../../common/PageView.js'
import { formatDate } from '../../../utils.js'

export default function(props){/*apiCall*/
  var data = props.data ? props.data : [];
  return (<PageView component={ _view } onPageCount={ 5 }
    callback={ p => props.apiCall('getNews', { section: 'blog', ...p }).then(r => r.result ? r.result : {}) }>
    </PageView>);
}

function _view(props){
  var data = props.data ? props.data : [];
  return (
    <div className="blog">
      {
        data.map((d, i) => {
          return (<div key={ i } className="blog__item interface-block">
            <div className="blog__item__title">{ d.news_title }</div>
            <div className="blog__item__date">
              { formatDate(new Date( d.news_dt ), false) }
            </div>
            <div className="blog__item__text">{ d.news_text }</div>
          </div>);
        })
      }
    </div>
  );
}
