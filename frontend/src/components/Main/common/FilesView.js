import React from 'react';
import './FilesView.css'

export default function(props){/*updateLocation, header, dataSrc*/
  var cont;
  props.dataSrc.then(files => {
    files.forEach(f => {
      var tr = document.createElement('tr');
      tr.innerHTML = `<td><a target="_blank" href="` + f.file_url + `">` + f.file_type + `</a></td><td>` + f.file_descr + `</td>`;
      cont.appendChild(tr);
    });
  });
  return (
    <div className="files-view interface-block">
      <h3>{ props.header }</h3>
      <table className="table">
        <thead><tr><th>ФАЙЛ</th><th>ОПИСАНИЕ</th></tr></thead>
        <tbody ref={ r => cont = r }>
        </tbody>
      </table>
    </div>
  );
}
