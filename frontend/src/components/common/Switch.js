import React from 'react';
import './Switch.css'

export default function(props){/*className, onClick, titles, active*/
    var titles = Array.isArray( props.titles ) ? props.titles : [];
    return (
      <div className={ 'switch ' + ( props.className ? props.className : '' ) }>
      {
        titles.map( (t, ind) => {
          return (<div key={ ind } onClick={ () => props.onClick(ind) } className={ props.active === ind ? 'active': '' }>{ t }</div>);
        })
      }
      </div>
    );
  }
