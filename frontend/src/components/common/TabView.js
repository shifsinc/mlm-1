import React from 'react';
import './TabView.css'
import Link from './Link.js'

export default class extends React.Component {
  constructor(props){/*updateLocation, titles*/
    super(props);

    this.lastActive = 0;
  }

  componentDidMount = () => this.makeActive(0);

  render(){
    return (
      <div className={ 'tab-view' + ( this.props.className ? ' ' + this.props.className : '') }>
        <div className="tab-view__header" ref={ r => this.header = r }>
          { this.props.titles.map((text, ind) =>

              <Link key={ ind } className="tab-view__header__item" updateLocation={ this.props.updateLocation }
                onClick={ () => {
                  this.makeActive(ind);
                } }>{ text }</Link>

            ) }
        </div>
        <div className={ 'tab-view__content ' + ( this.props.contClassName ? this.props.contClassName : '' ) }
          ref={ r => this.cont = r }>
          { this.props.children }
        </div>
      </div>
    );
  }

  makeActive = ind => {
    this.header.children[ this.lastActive ].classList.remove('active');
    this.cont.children[ this.lastActive ].classList.remove('active');
    this.header.children[ ind ].classList.add('active');
    this.cont.children[ ind ].classList.add('active');
    this.lastActive = ind;
  }
}
