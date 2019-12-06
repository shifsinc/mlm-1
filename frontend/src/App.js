import React from 'react';
import './App.css';

import PageHeader from './components/PageHeader.js';
import PageFooter from './components/PageFooter.js';

import StartView from './components/StartView.js';
import SignInView from './components/Login/SignInView.js';
import SignUpView from './components/Login/SignUpView.js';
import FillDataView from './components/Login/FillDataView.js';
import PasswordResetRequestView from './components/Login/PasswordResetRequestView.js';
import PasswordResetView from './components/Login/PasswordResetView.js';
import TermsView from './components/TermsView';

import MainView from './components/Main/MainView.js';

import signoutApi from './api/signout.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isSignedIn: false,
      location: window.location.pathname
    };
  }

  componentDidMount(){
    window.addEventListener('popstate', this._updateLocation);
  }

  render(){
    var mainCont = this._getCurrentView();
    return (
      <div className="App">
        <PageHeader isSignedIn={ this.state.isSignedIn } updateLocation={ this._updateLocation }></PageHeader>
        <div className="main-view">{ mainCont }</div>
        <PageFooter updateLocation={ this._updateLocation }></PageFooter>
      </div>
    );
  }

  _getCurrentView = () => {
    var params = {
      updateLocation: this._updateLocation,
      params: this._getSearchParams(),
      action: this.state.action
    };
    switch( this.state.location ){
      case '/signin':
        return <SignInView { ...params }></SignInView>;
      case '/signup':
        return <SignUpView { ...params }></SignUpView>;
      case '/fillData':
        return <FillDataView { ...params }></FillDataView>;
      case '/passwordResetRequest':
        return <PasswordResetRequestView { ...params }></PasswordResetRequestView>;
      case '/passwordReset':
        return <PasswordResetView { ...params }></PasswordResetView>;
      case '/terms':
        return <TermsView { ...params }></TermsView>;

      case '/account':
        return <MainView { ...params }></MainView>;

      case '/signout':
        signoutApi().catch(e => alert(e));
      default:
        return <StartView { ...params }></StartView>;
    }
  }

  _updateLocation = () => {
    this.setState({ location: window.location.pathname });
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
