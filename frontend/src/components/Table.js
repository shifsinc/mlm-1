import React from 'react';
import './Table.css'

export default function(props){/*updateLocation, titles, contRef*/
  return (
    <table className="table">
      <thead><tr>{ props.titles.map((t, i) => <th key={ i }>{ t }</th>) }</tr></thead>
      <tbody ref={ props.contRef }>
      </tbody>
    </table>
  );
}
