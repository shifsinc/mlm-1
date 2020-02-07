import React from 'react';
import './ImagesView.css'
import Popup from '../../common/Popup.js'
import ViewSelect from '../../common/ViewSelect.js'
import { alignPhoto } from '../../../utils.js'

export default class extends React.Component {
  constructor(props){/*data*/
    super(props);
    this.state = {
      popup: null,
      popupSrc: null
    }
  }

  render(){
    var data = this.props.data ? this.props.data : [];

    var img = data.map( (d, i) => (
      <div key={ i } className={ `images-view__image ` + (!i ? 'first' : '') }><div className="images-view__image-cont">
          <img alt="news photo" src={ d.file_name } onClick={ () => this._photoClick(d) } onLoad={ alignPhoto }/>
      </div></div>
    ) );

    return (<>
      <ViewSelect active={ this.state.popup }>
        <Popup className="images-view__popup" onClose={ () => this.setState({ popup: null }) }>
          <img src={ this.state.popupSrc }/>
        </Popup>
      </ViewSelect>
      { img }
    </>)
  }

  _photoClick = ({ file_name }) => {
    this.setState({ popup: 0, popupSrc: file_name });
  }
}
