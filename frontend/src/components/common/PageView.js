import React from 'react';
import './PageView.css'
import Link from './Link.js'

const sidePages = 2;

export default class extends React.Component {
  constructor(props){/*callback, callbackArgs, component, componentProps, onPageCount*/
    super(props);
    this.state = {
      currentPage: 0,
      pagesCount: 0,
      data: []
    }

    this._fetchData();
  }

  _fetchData = () => {
    this.props.callback({ offset: 0, count: this.props.onPageCount, ...this.props.callbackArgs })
      .then(r => this.setState({
        pagesCount: Math.ceil( r.count / this.props.onPageCount ),
        data: r.data
      }) );
  }

  updatePage = page => {
    if( page === this.state.currentPage ) return;
    var onPageCount = this.props.onPageCount;

    this.props.callback({ offset: onPageCount * page, count: onPageCount, ...this.props.callbackArgs })
      .then(r => this.setState({
        pagesCount: Math.ceil( r.count / onPageCount ),
        data: r.data,
        currentPage: page
      }) );
  }

  componentDidUpdate = prevProps => {
    if( prevProps.callbackArgs !== this.props.callbackArgs ){
      this._fetchData();
    }
  }

  render(){
    var Component = this.props.component;

    if( this.state.pagesCount > 1 ){
      var pages = [], start = this.state.currentPage - sidePages, fin = this.state.currentPage + sidePages;
      if( start < 0 ){
        start = 0;
        fin = sidePages * 2;
      }
      if( fin >= this.state.pagesCount ){
        fin = this.state.pagesCount - 1;
        start = fin - sidePages * 2;
        if( start < 0 ) start = 0;
      }

      if( start >= sidePages ){
        pages.push(<Link key={ -1 }
          className="page-view__pages__select"
          onClick={ () => this.updatePage(0) }>
          { 1 }
        </Link>);
        pages.push(<div className="page-view__pages__select">...</div>);
      }

      for(var i = start ; i <= fin ; i++)
        pages.push(<Link key={ i }
          className={ 'page-view__pages__select' + ( i === this.state.currentPage ? ' active' : '' ) }
          onClick={ ( page => () => this.updatePage(page) )(i) }>
          { i + 1 }
        </Link>)

        if( fin <= this.state.pagesCount - 1 - sidePages ){
          pages.push(<div className="page-view__pages__select">...</div>);
          pages.push(<Link key={ -2 }
            className="page-view__pages__select"
            onClick={ () => this.updatePage(this.state.pagesCount - 1) }>
            { this.state.pagesCount }
          </Link>);
        }
    }

    return (<div className="page-view">
      <div className="page-view__cont">
        <Component data={ this.state.data } { ...this.props.componentProps }></Component>
      </div>
      <div className="page-view__pages">
        { pages }
      </div>
    </div>);
  }

}
