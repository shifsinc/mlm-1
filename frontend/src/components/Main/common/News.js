import React from 'react';
import './News.css'
import PageView from '../../common/PageView.js'
import { formatDate } from '../../../utils.js'

export default function(props){/*apiCall*/
  var data = props.data ? props.data : [];
  return (<PageView component={ _view } onPageCount={ 5 }
    callback={ p => props.apiCall('getNews', { section: 'news', ...p }).then(r => r.result ? r.result : {}) }>
    </PageView>);
}

function _view(props){
  var data = props.data ? props.data : [];
  return (<div className="news">
      {
        data.map((d, i) => {
          return (<div key={ i } className="news__item">
            <div className="news__item__text">{ d.news_text }</div>
            <div className="news__item__date">
              { formatDate(new Date( d.news_dt ), false) }
            </div>
          </div>);
        })
      }
    </div>);
}
