import React from 'react';
import TransferMoney from './common/TransferMoney.js'

export default class extends React.Component {
  render(){/*apiCall*/
    return (<div className="main__content">
      <TransferMoney { ...this.props }></TransferMoney>
    </div>);
  }
}
