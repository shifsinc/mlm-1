import React from 'react';
import './Table.css'

export default function(props){/*titles, className*/
  var titles = Array.isArray( props.titles ) ? props.titles : [];
  return (
    <table className={ 'table items-border ' + ( props.className ? props.className : '' ) }>
      <thead><tr>{ titles.map((t, i) => <th key={ i }>{ t }</th>) }</tr></thead>
      <tbody>{ props.children }</tbody>
    </table>
  );
}
