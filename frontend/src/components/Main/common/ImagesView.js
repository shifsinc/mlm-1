import React from 'react';
import './ImagesView.css'

export default function(props){/*data*/
  var data = props.data ? props.data : [];
  var className = '';
  if( data.length > 1 ) className = 'multiple';
    var nf = require('../../../img/noPhoto.png');
    data = [{file_name:nf},{file_name:nf}];
  return data.map( (d, i) => <img key={ i } className={ 'images-view__image ' + className } alt="img" src={ d.file_name }/> );
}
