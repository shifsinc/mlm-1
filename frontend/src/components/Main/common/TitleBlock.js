import React from 'react';
import './TitleBlock.css'

export default function(props) {/*updateLocation, title, className*/
  var title = props.title;
  if( title ) title = title.toUpperCase();
  return (<div className={ 'title-block interface-block ' + ( props.className ? props.className : '' ) }>
      <h4 className="title-block__title">{ title }</h4>
      { props.children }
    </div>);
}
