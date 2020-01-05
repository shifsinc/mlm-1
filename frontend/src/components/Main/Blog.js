import React from 'react';
import './Blog.css'
import Blog from './common/Blog.js'

export default function(props){/*apiCall*/
  return (<div className="main__content">
    <Blog apiCall={ props.apiCall }></Blog>
  </div>);
}
