import React from 'react';
import './PageView.css'
import Link from './Link.js'

const SIDE_PAGES = 2;

export default class extends React.Component {
  constructor(props){/*callback, callbackArgs, component, componentProps, onPageCount*/
    super(props);
    this.state = {
      currentPage: 0,
      pagesCount: 0,
      data: []
    }

    this._fetchData(0);
  }

  _fetchData = page => {
    var offset = this.props.onPageCount * page;
    this.props.callback({ offset, count: this.props.onPageCount, ...this.props.callbackArgs })
      .then(res => {
        if( !res.result ) return;
        var r = res.result;
        this.setState({
        pagesCount: Math.ceil( r.count / this.props.onPageCount ),
        data: r.data,
        currentPage: page
      });
    });
  }

  updatePage = page => {
    if( page !== this.state.currentPage ) this._fetchData( page );
  }

  componentDidUpdate = prevProps => {
    if( prevProps.callbackArgs !== this.props.callbackArgs ) this._fetchData(0);
  }

  render(){
    var Component = this.props.component;

    if( this.state.pagesCount > 1 ){
      var pages = [], start = this.state.currentPage - SIDE_PAGES, fin = this.state.currentPage + SIDE_PAGES;
      if( start < 0 ){
        start = 0;
        fin = SIDE_PAGES * 2;
      }
      if( fin >= this.state.pagesCount ){
        fin = this.state.pagesCount - 1;
        start = fin - SIDE_PAGES * 2;
        if( start < 0 ) start = 0;
      }

      if( start >= SIDE_PAGES ){
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

        if( fin <= this.state.pagesCount - 1 - SIDE_PAGES ){
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
        <Component { ...this.props.componentProps }
          data={ this.state.data } offset={ this.state.currentPage * this.props.onPageCount }></Component>
      </div>
      <div className="page-view__pages">
        { pages }
      </div>
    </div>);
  }

}
