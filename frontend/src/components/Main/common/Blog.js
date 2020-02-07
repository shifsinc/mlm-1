import React from 'react';
import './Blog.css'
import PageView from '../../common/PageView.js'
import ImagesView from './ImagesView.js'
import VideosView from './VideosView.js'
import { formatDate } from '../../../utils.js'
import Link from '../../common/Link.js'
import '../Admin/common.css'

const BLOG_VISIBLE_LENGTH = 500;

export default function(props){/*apiCall, _admin, _editClick, _deleteClick, _rand*/
  var method = props._admin ? 'admin/getNews' : 'getNews';
  return (<PageView component={ _view } componentProps={{ ...props }} onPageCount={ 5 }
    callback={ p => props.apiCall(method, { section: 'blog', ...p }) } callbackArgs={ props._rand }>
    </PageView>);
}

function _view(props){
  var data = props.data ? props.data : [];
  return (<div className="blog">
      { data.map((d, i) => <BlogItem key={ i } item={ d } { ...props }/>) }
    </div>);
}

class BlogItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      opened: props.item.news_text.length > BLOG_VISIBLE_LENGTH ? false : true
    }
  }

  render(){
    var d = this.props.item;

    return (<div className="blog__item interface-block">
      {
        this.props._admin ? <div className="admin__controls">
            <Link className="admin__edit-button" onClick={ () => this.props._editClick(d) }></Link>
            <Link className="admin__delete-button" onClick={ () => this.props._deleteClick(d) }></Link>
          </div> : undefined
      }
      <div className="blog__item__title">{ d.news_title }</div>
      <div className="blog__item__date">
        { formatDate(new Date( d.news_dt ), false) }
      </div>
      <ImagesView data={ d.images }></ImagesView>
      <VideosView data={ d.videos }></VideosView>
      <div className={ 'blog__item__text show-more-text' + ( this.state.opened ? '_opened' : '' ) }>
        <span>{ this.state.opened ? d.news_text : d.news_text.slice(0, BLOG_VISIBLE_LENGTH) + '...' }</span>
        <div className="show-more" onClick={ () => this.setState({ opened: true }) }></div>
      </div>
    </div>);
  }
}
