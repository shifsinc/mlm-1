import React from 'react';
import './ReferalsTree.css'
import '../common/userStatus.css'
import { RATES } from '../../../const.js'

export default class extends React.Component {
  constructor(props) {/*apiCall, userClick*/
    super(props);
    this.state = { tree: null };

    this._updateTree();
  }

  _updateTree = user_id => {
    this.props.apiCall('getReferalsTree', { levels: 5, user_id }).then( r => this.setState({ tree: r.result }) );
  }

  render(){
    var flatTree = this._decompose(this.state.tree);
    var row0 = flatTree[0] ? flatTree[0] : [],
      row1 = flatTree[1] ? flatTree[1] : [],
      row2 = flatTree[2] ? flatTree[2] : [],
      row3 = flatTree[3] ? flatTree[3] : [];
    return (
      <div className="team__referals-tree" ref={ r => this.cont = r }>
        <div className="team__referals-tree__row">
          { this._getTreeNode( row0[0] ) }
        </div>
        <div className="team__referals-tree__row">
          {[ this._getTreeNode( row1[0] ), this._getTreeNode( row1[1] ) ]}
        </div>
        <div className="team__referals-tree__row">
          {[ this._getTreeNode( row2[0] ), this._getTreeNode( row2[1] ),
            this._getTreeNode( row2[2] ), this._getTreeNode( row2[3] ) ]}
        </div>
        <div className="team__referals-tree__row">
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

    return (<div key={ node.user_id } className={ 'team__referals-tree__user status-' + node.user_status }>
      <div className="team__referals-tree__user__ratio">
        <div className="team__referals-tree__user__cont">
          <div className="team__referals-tree__user__info">
            <div className="info-button team__referals-tree__user__info-button" onClick={ () => this.props.userClick(node) }></div>
            <div className={ 'team__referals-tree__user-avatar status-' + node.user_status + '-avatar' }></div>
            <span>{ node.user_name }</span>
            <span>{node.user_surname }</span>
          </div>
          <div className="team__referals-tree__user__rate">
            <img alt={ node.user_rate } src={ RATES[ node.user_rate ] ? RATES[ node.user_rate ] : undefined }/>
          </div>
          <div className="team__referals-tree__user__yt"><span>{ node.stats_yt_left }</span><span>{ node.stats_yt_right }</span></div>
        </div>
      </div>
      <div className="team__referals-tree__user__more" onClick={ () => this._updateTree(node.user_id) }></div>
    </div>);
  }

}
