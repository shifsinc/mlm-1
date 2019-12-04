import React from 'react';
import './Link.css';

function Link(props) {/*className, title, path, updateLocation*/
  return (
    <a className={ 'link ' + (props.className ? props.className : '') } href={ props.path }
        onClick={e => {
          e.preventDefault();
          window.history.pushState(null, '', props.path);
          props.updateLocation();
        }}>{ props.children ? props.children : props.title }</a>
  );
}

export default Link;
