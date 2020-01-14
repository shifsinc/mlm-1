import React from 'react';
import AddMoney from './common/AddMoney.js'

export default class extends React.Component {
  render(){/*apiCall*/
    return (<div className="main__content">
      <AddMoney { ...this.props }></AddMoney>
    </div>);
  }
}
