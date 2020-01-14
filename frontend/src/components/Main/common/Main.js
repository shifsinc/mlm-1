import React from 'react';
import './Main.css'
import Menu from './Menu.js'
import StartWork from './StartWork.js'

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
			startWork: null
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
						(<View { ...this.props }></View>)
					}
				</>)
		}

	  return (
	    <div className="main">
				{ content }
	    </div>
	  );
	}
}
