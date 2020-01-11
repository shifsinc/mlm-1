import React from 'react';
import './News.css'

import News from '../common/News.js'
import Blog from '../common/Blog.js'

import Link from '../../common/Link.js'
import Input from '../../common/Input.js'
import SelectInput from '../../common/SelectInput.js'
import ViewSelect from '../../common/ViewSelect.js'
import AddContentPopup from './common/AddContentPopup.js'
import AttachFiles from './common/AttachFiles.js'
import AddNewsPopup from './News/AddNewsPopup.js'

export default class extends React.Component {
  constructor(props){/*apiCall*/
    super(props);
    this.state = {
      popup: null,
      listOpened: true,
      section: 0,
      videos: []
    }
  }

  render(){
    return (<div className="admin__news">
      <div className="admin__news__cont interface-block admin__first-block">
        <SelectInput className="admin__news__select" label="Отобразить" options={[ 'Записи блога', 'Новости' ]}
          onSelect={ ind => this.setState({ section: ind }) }>
        </SelectInput>

        <Link className="button admin__news__button" onClick={ () => this.setState({ listOpened: !this.state.listOpened }) }>
          { this.state.listOpened ? 'СКРЫТЬ' : 'ПОКАЗАТЬ' }
        </Link>

        <Link className="button admin__news__button" onClick={ () => this.setState({ popup: this.state.section }) }>
          ДОБАВИТЬ ЗАПИСЬ
        </Link>
      </div>

      <ViewSelect active={ this.state.listOpened ? this.state.section : null }>
        <Blog apiCall={ this.props.apiCall } _rand={ this.state.rand } _admin
          _editClick={ d => this._editClick('blog', d) } _deleteClick={ d => this._deleteClick('blog', d) }></Blog>
        <div className="interface-block">
          <News apiCall={ this.props.apiCall } _rand={ this.state.rand } _admin
            _editClick={ d => this._editClick('news', d) } _deleteClick={ d => this._deleteClick('news', d) }></News>
        </div>
      </ViewSelect>

      <ViewSelect active={ this.state.popup }>

        <AddNewsPopup { ...this.props } formTitle="НОВАЯ ЗАПИСЬ БЛОГА" onClose={ this._closePopup } section="blog"></AddNewsPopup>

        <AddNewsPopup { ...this.props } formTitle="НОВОСТЬ" onClose={ this._closePopup } section="news"></AddNewsPopup>

      </ViewSelect>
    </div>);
  }

  _closePopup = () => {
    this.setState({ popup: null, rand: Math.random() });
  }

  _deleteClick = (section, d) => {
    this.props.apiCall('admin/deleteNews', { news_id: d.news_id, section }).then(r => {
      if( r.status !== 'error' ) this.setState({ rand: Math.random() });
    });
  }

  _editClick = (section, d) => {

  }

}
