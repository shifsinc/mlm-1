import React from 'react';
import './App.css';

import PageHeader from './components/PageHeader.js';
import PageFooter from './components/PageFooter.js';
import Terms from './components/Terms.js';

import Start from './components/Start.js';
import SignIn from './components/Login/SignIn.js';
import SignUp from './components/Login/SignUp.js';
import FillData from './components/Login/FillData.js';
import PasswordResetRequest from './components/Login/PasswordResetRequest.js';
import PasswordReset from './components/Login/PasswordReset.js';
import AcceptTerms from './components/Login/AcceptTerms.js';

import Main from './components/Main/Main.js';

import apiCall from './apiCall.js';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: window.location.pathname,
      authToken: window.localStorage['authToken']
    };
  }

  componentDidMount(){
    window.addEventListener('popstate', this._updateLocation);
  }

  render(){
    var mainCont = this._getCurrentView(), isSignedIn = this.state.authToken ? true : false;
    return (
      <div className="App">
        <PageHeader isSignedIn={ isSignedIn } updateLocation={ this._updateLocation }></PageHeader>
        <div id="content">{ mainCont }</div>
        <PageFooter updateLocation={ this._updateLocation }></PageFooter>
      </div>
    );
  }

  _getCurrentView = () => {
    var isSignedIn = this.state.authToken ? true : false;
    var props = {
      updateLocation: this._updateLocation,
      apiCall: this._apiCall,
      params: this._getSearchParams(),
      location: this.state.location
    };
    switch( this.state.location ){
      case '/signin':
        //if( isSignedIn ) return this._updateLocation('/account');
        return <SignIn { ...props } updateAuthToken={ this._updateAuthToken }></SignIn>;
      case '/signup':
        if( isSignedIn ) return this._updateLocation('/account');
        return <SignUp { ...props }></SignUp>;
      case '/fillData':
        if( !isSignedIn ) return this._updateLocation('/signin');
        return <FillData { ...props }></FillData>;
      case '/acceptTerms':
        if( !isSignedIn ) return this._updateLocation('/signin');
        return <AcceptTerms { ...props }></AcceptTerms>;
      case '/passwordResetRequest':
        if( isSignedIn ) return this._updateLocation('/account');
        return <PasswordResetRequest { ...props }></PasswordResetRequest>;
      case '/passwordReset':
        if( isSignedIn ) return this._updateLocation('/account');
        return <PasswordReset { ...props }></PasswordReset>;
      case '/terms':
        return <Terms { ...props }></Terms>;

      case '/account':
    	case '/robot':
    	case '/team':
    	case '/marketing':
    	case '/finances':
    	case '/instructions':
      case '/settings':
        if( !isSignedIn ) return this._updateLocation('/signin');
        return <Main { ...props }></Main>;

      case '/signout':
        this._apiCall('signout').then(r => {
          if( r.status === 'ok' ){
            window.localStorage.clear('authToken');
            this.setState({ authToken: null });
          }
          this._updateLocation('/');
        });
        break;
      case '/confirmEmail':
        this._apiCall('confirmEmail', { confirmToken: props.params.confirmToken }).then(r => {
          this._updateLocation(r.action.path);
        });
        break;
      default:
        if( isSignedIn ) return this._updateLocation('/account');
        return <Start { ...props }></Start>;
    }
  }

  _updateLocation = location => {
    window.history.pushState(null, '', location);
    setTimeout( () => this.setState({ location: location }), 0 );
  }

  _updateAuthToken = authToken => {
    window.localStorage['authToken'] = authToken;
    setTimeout( () => this.setState({ authToken }), 0 );
  }

  _apiCall = (method, data) => {
    return apiCall(method, this.state.authToken, data);
  }

  _getSearchParams = () => {
    var get = {};
    if( !window.location.search.length ) return get;
    window.location.search.slice(1).split('&').forEach(p => {
    	var t = p.split('=');
    	get[ decodeURIComponent( t[0] ) ] = decodeURIComponent( t[1] );
    });
    return get;
  }

}

export default App;
