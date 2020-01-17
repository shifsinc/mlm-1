import React from 'react';
import './ReferalsTree.css'
import './userStatus.css'
import { RATES_IMAGES, RATES_TITLES } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*apiCall, userClick, userId, updateLocation*/
    super(props);
    this.state = { tree: null };

    this._updateTree( props.userId );
  }

  _updateTree = user_id => {
    this.props.apiCall('getReferalsTree', { levels: 5, user_id }).then( r => this.setState({ tree: r.result }) );
  }

  componentDidUpdate = prevProps => {
    if( prevProps.userId !== this.props.userId ){
      this._updateTree( this.props.userId );
    }
  }

  render(){
    var flatTree = this._decompose(this.state.tree);
    var row0 = flatTree[0] ? flatTree[0] : [],
      row1 = flatTree[1] ? flatTree[1] : [],
      row2 = flatTree[2] ? flatTree[2] : [],
      row3 = flatTree[3] ? flatTree[3] : [];
    return (
      <div className="referals-tree" ref={ r => this.cont = r }>
        <div className="referals-tree__row">
          { this._getTreeNode( row0[0] ) }
        </div>
        <div className="referals-tree__row">
          {[ this._getTreeNode( row1[0] ), this._getTreeNode( row1[1] ) ]}
        </div>
        <div className="referals-tree__row">
          {[ this._getTreeNode( row2[0] ), this._getTreeNode( row2[1] ),
            this._getTreeNode( row2[2] ), this._getTreeNode( row2[3] ) ]}
        </div>
        <div className="referals-tree__row">
          {[ this._getTreeNode( row3[0] ), this._getTreeNode( row3[1] ),
           this._getTreeNode( row3[2] ), this._getTreeNode( row3[3] ),
           this._getTreeNode( row3[4] ), this._getTreeNode( row3[5] ),
           this._getTreeNode( row3[6] ), this._getTreeNode( row3[7] ) ]}
        </div>
      </div>
    );
  }

  _decompose = tree => {
    var arr = [];
    const f = (node, level = 0, num = 0) => {
      if( !node ) return;
      if( !arr[level] ) arr[level] = {};
      arr[level][num] = node;
      f(node._left, level + 1, num*2);
      f(node._right, level + 1, num*2+1);
    }
    f(tree);
    return arr;
  }

  _getTreeNode = node => {
    if( !node ) return <div key={ Math.random() }></div>;

    return (<div key={ node.user_id } className={ 'referals-tree__user status-' + node.user_status }>
      <div className="referals-tree__user__ratio">
        <div className="referals-tree__user__cont">
          <div className="referals-tree__user__info">
            <div className="info-button referals-tree__user__info-button" onClick={ () => this.props.userClick(node) }></div>
            <div className={ 'referals-tree__user-avatar status-' + node.user_status + '-avatar' }></div>
            <span>{ node.user_name }</span>
            <span>{node.user_surname }</span>
          </div>
          <div className="referals-tree__user__rate">
            <img alt={ RATES_TITLES[ node.user_rate ] }
              src={ RATES_IMAGES[ node.user_rate ] ? RATES_IMAGES[ node.user_rate ] : undefined }/>
          </div>
          <div className="referals-tree__user__yt"><span>{ node.stats_yt_left }</span><span>{ node.stats_yt_right }</span></div>
        </div>
      </div>
      <div className="referals-tree__user__more" onClick={ () => this._moreClick(node.user_id) }></div>
    </div>);
  }

  _moreClick = user_id => {
    this._updateTree(user_id);
    this.props.updateLocation('?user_id=' + user_id);
  }

}
