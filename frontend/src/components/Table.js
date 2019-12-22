import React from 'react';
import './Table.css'

export default function(props){/*titles, className*/
  return (
    <table className={ 'table' + ( props.className ? ' ' + props.className : '' ) }>
      <thead><tr>{ props.titles.map((t, i) => <th key={ i }>{ t }</th>) }</tr></thead>
      <tbody>{ props.children }</tbody>
    </table>
  );
}
