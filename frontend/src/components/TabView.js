import React from 'react';
import './TabView.css'
import Link from './Link.js'

export default function(props){/*updateLocation, titles*/
  var cont, lastActive = 0;
  return (
    <div className={ 'tab-view' + ( props.className ? ' ' + props.className : '') }>
    <div className="tab-view__header">
      { props.titles.map((t, i) =>
          <Link className="tab-view__header__item" updateLocation={ props.updateLocation } onClick={ () => {
            cont.children[ lastActive ].classList.remove('active');
            cont.children[ i ].classList.add('active');
            lastActive = i;
          } }>{ t }</Link>
        ) }
    </div>
    <div className="tab-view__content" ref={ r => {cont = r; if(r) r.children[0].classList.add('active')} }>
      { props.children }
    </div>
    </div>
  );
}
