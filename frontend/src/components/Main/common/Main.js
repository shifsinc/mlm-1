import React from 'react';
import './Main.css'
import Menu from './Menu.js'
import StartWork from './StartWork.js'
import UserCard from './UserCard.js'
import ViewSelect from '../../common/ViewSelect.js'
import { getUserCardInfo } from '../../../utils.js'

const VIEWS = {
	'/account': require('../Account.js').default,
	'/robot': require('../Robot.js').default,
	'/team': require('../Team.js').default,
	'/marketing': require('../Marketing.js').default,
	'/finances': require('../Finances.js').default,
	'/refill': require('../Refill.js').default,
	'/transfer': require('../Transfer.js').default,
	'/instructions': require('../Instructions.js').default,
	'/blog': require('../Blog.js').default,
  '/settings': require('../Settings.js').default,
	'/admin': require('../Admin.js').default
}

export default class extends React.Component {
	constructor(props) {/*apiCall, location*/
		super(props);
		this.state = {
			startWork: null,
			popup: null,
			cardData: {}
		}

		props.apiCall('checkUserStartWork').then(r => {
			if( !r.result ) return;
			this.setState({ startWork: r.result.user_start_work });
		});
	}

	render(){
	  var View, loc = this.props.location;
		if( !this.state.startWork && ( loc === '/team' || loc === '/finances' ) ) View = () => (<div></div>);
		else View = VIEWS[ loc ];

		var content;
		if( this.state.startWork === null ){
			content = (<div></div>);
		} else {
			content = (<><Menu startWork={ this.state.startWork } { ...this.props } ></Menu>
					{
						( !this.state.startWork && this.props.location === '/robot' ) ?
						(<StartWork apiCall={ this.props.apiCall } updateLocation={ this.props.updateLocation }></StartWork>) :
						(<View { ...this.props } showUserCard={ this._showUserCard }></View>)
					}
				</>)
		}

	  return (
	    <div className="main">
				{ content }
				<ViewSelect active={ this.state.popup }>

	        <UserCard data={ this.state.cardData } apiCall={ this.props.apiCall }
	          onClose={ () => this.setState({ popup: null }) }>
	        </UserCard>

	      </ViewSelect >
	    </div>
	  );
	}

	_showUserCard = user_id => {
		getUserCardInfo( this.props.apiCall, user_id, d => this.setState({ cardData: d, popup: 0 }) );
	}
}
