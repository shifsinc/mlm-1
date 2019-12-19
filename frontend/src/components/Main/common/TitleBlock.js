import React from 'react';
import './TitleBlock.css'

export default function(props) {/*updateLocation, title, className*/
  return (
    <div className={ 'title-block interface-block' + ( props.className ? ' ' + props.className : '' ) }>
      <h4 className="title-block__title">{ props.title }</h4>
      { props.children }
    </div>
  );
}
