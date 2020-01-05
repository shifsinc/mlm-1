import React from 'react';

import News from '../common/News.js'
import Blog from '../common/Blog.js'

export default function(props){/*apiCall*/
  return (<div className="admin__news">
    <News apiCall={ props.apiCall }></News>
  </div>);
}
