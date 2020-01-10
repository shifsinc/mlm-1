import React from 'react';
import './ImagesView.css'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  var className = '';
  if( data.length > 1 ) className = 'multiple';
  return data.map( (d, i) => <img key={ i } className={ 'images-view__image ' + className } alt="img" src={ d }/> );
}
