import React from 'react';
import './Switch.css'

export default function(props){/*className, onClick, titles, active*/
    return (
      <div className={ 'switch ' + ( props.className ? props.className : '' ) }>
      {
        props.titles.map( (t, ind) => <div key={ ind } onClick={ () => props.onClick(ind) }
          className={ props.active === ind ? 'active': '' }>{ t }</div> )
      }
      </div>
    );
  }
