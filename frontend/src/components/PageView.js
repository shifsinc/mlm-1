import React from 'react';
import './PageView.css'
import Link from './Link.js'

export default class extends React.Component {
  constructor(props){/*callback, component, componentProps, onPageCount*/
    super(props);
    this.state = {
      currentPage: 0,
      pagesCount: 0,
      data: []
    }

    props.callback({ offset: 0, count: props.onPageCount })
      .then(r => this.setState({
        pagesCount: Math.ceil( r.count / this.props.onPageCount ),
        data: r.data
      }) );
  }

  updatePage = page => {
    if( page === this.state.currentPage ) return;
    var onPageCount = this.props.onPageCount;

    this.props.callback({ offset: onPageCount * page, count: onPageCount })
      .then(r => this.setState({
        pagesCount: Math.ceil( r.count / onPageCount ),
        data: r.data,
        currentPage: page
      }) );
  }

  render(){
    var Component = this.props.component;

    var pages = [];
    if( this.state.pagesCount > 1 ){
      for(var i = 0 ; i < this.state.pagesCount ; i++)
        pages.push(<Link key={ i }
          className={ 'page-view__pages__select' + ( i === this.state.currentPage ? ' active' : '' ) }
          onClick={ ( page => () => this.updatePage(page) )(i) }>
          { i + 1 }
        </Link>)
    }

    return (<div className="page-view">
      <div className="page-view__cont"><Component data={ this.state.data } { ...this.props.componentProps }></Component></div>
      <div className="page-view__pages">
        { pages }
      </div>
    </div>);
  }

}
