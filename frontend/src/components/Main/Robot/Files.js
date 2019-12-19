import React from 'react';
import './Files.css'
import FilesView from '../common/FilesView.js'

export default function(props) {/*updateLocation, dataSrc*/
  return (
    <FilesView title="Скачать файлы" dataSrc={ props.dataSrc } className="robot__files"></FilesView>
  );
}
