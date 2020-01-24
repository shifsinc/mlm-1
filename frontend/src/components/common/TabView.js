import React from 'react';
import './TabView.css'
import Link from './Link.js'
import ViewSelect from './ViewSelect.js'

export default class extends React.Component {
  constructor(props){/*tabs, className*/
    super(props);
    this.state = {
      activeTab: props.tabs.reduce((n, { name }, ind) => props.params.tab === name ? ind : n, 0)
    }
  }

  render(){
    return (
      <div className={ 'tab-view ' + ( this.props.className ? this.props.className : '') }>
        <div className="tab-view__header closed" ref={ r => this.header = r } onClick={ () => this.header.classList.add('closed') }>
          <div className="tab-view__header__cont">
            { this.props.tabs.map(({ title, name }, ind) =>
                <Link key={ ind } className={ 'tab-view__header__item' + ( this.state.activeTab === ind ? ' active' : '' ) }
                  onClick={ () => this._tabClick(ind, name) }>{ title }</Link>
              ) }
              <div className="tab-view__header_mobile"
                onClick={ e => {this.header.classList.remove('closed');e.stopPropagation()} }></div>
            </div>
            <div className="cover tab-view__cover-mobile" onClick={ e => this.header.classList.add('closed') }></div>
        </div>
        <div className="tab-view__content">
          <ViewSelect active={ this.state.activeTab }>
            { this.props.children }
          </ViewSelect>
        </div>
      </div>
    );
  }

  _tabClick = (ind, name) => {
    this.setState({ activeTab: ind });
    this.props.updateLocation('?tab=' + name);
  }

}
