import React from 'react';
import './App.css';

import PageHeader from './components/PageHeader.js';
import PageFooter from './components/PageFooter.js';
import TermsView from './components/TermsView.js';

import StartView from './components/StartView.js';
import SignInView from './components/Login/SignInView.js';
import SignUpView from './components/Login/SignUpView.js';
import FillDataView from './components/Login/FillDataView.js';
import PasswordResetRequestView from './components/Login/PasswordResetRequestView.js';
import PasswordResetView from './components/Login/PasswordResetView.js';
import AcceptTermsView from './components/Login/AcceptTermsView.js';

import MainView from './components/Main/MainView.js';

import apiCall from './apiCall.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location: window.location.pathname,
      token: window.localStorage['authToken']
    };
  }

  componentDidMount(){
    window.addEventListener('popstate', this._updateLocation);
  }

  render(){
    var mainCont = this._getCurrentView(), isSignedIn = this.state.token ? true : false;
    return (
      <div className="App">
        <PageHeader isSignedIn={ isSignedIn } updateLocation={ this._updateLocation }></PageHeader>
        <div className="main-view">{ mainCont }</div>
        <PageFooter updateLocation={ this._updateLocation }></PageFooter>
      </div>
    );
  }

  _getCurrentView = () => {
    var isSignedIn = this.state.token ? true : false;
    var props = {
      updateLocation: this._updateLocation,
      apiCall: this._apiCall,
      params: this._getSearchParams(),
      location: this.state.location,
      token: this.state.token
    };
    switch( this.state.location ){
      case '/signin':
        //if( isSignedIn ) return this.setState({ location: '/account' });
        return <SignInView { ...props } updateToken={ this._updateToken }></SignInView>;
      case '/signup':
        //if( isSignedIn ) return this.setState({ location: '/account' });
        return <SignUpView { ...props }></SignUpView>;
      case '/fillData':
        return <FillDataView { ...props }></FillDataView>;
      case '/acceptTerms':
        return <AcceptTermsView { ...props }></AcceptTermsView>;
      case '/passwordResetRequest':
        //if( isSignedIn ) return this.setState({ location: '/account' });
        return <PasswordResetRequestView { ...props }></PasswordResetRequestView>;
      case '/passwordReset':
        return <PasswordResetView { ...props }></PasswordResetView>;
      case '/terms':
        return <TermsView { ...props }></TermsView>;

      case '/account':
        //if( !isSignedIn ) return this.setState({ location: '/signin' });
        return <MainView { ...props }></MainView>;

      case '/signout':
        apiCall('signout', props.token).then(r => {
          if( r.status === 'ok' ) window.localStorage.clear('authToken');
        });
      default:
        return <StartView { ...props }></StartView>;
    }
  }

  _updateLocation = () => {
    this.setState({ location: window.location.pathname });
  }

  _updateToken = token => {
    window.localStorage['authToken'] = token;
    this.setState({ token: token });
  }

  _apiCall = (method, data) => {
    return apiCall(method, this.state.token, data);
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
