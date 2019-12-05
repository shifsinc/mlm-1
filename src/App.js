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
    switch( this.state.location ){
      case '/signout':
        signoutApi().catch(e => alert(e));
      case '/':
        return <StartView updateLocation={ this._updateLocation }></StartView>;
      case '/signin':
        return <SignInView updateLocation={ this._updateLocation }></SignInView>;
      case '/signup':
        return <SignUpView updateLocation={ this._updateLocation }></SignUpView>;
      case '/fillData':
        return <FillDataView updateLocation={ this._updateLocation }></FillDataView>;
      case '/passwordResetRequest':
        return <PasswordResetRequestView updateLocation={ this._updateLocation }></PasswordResetRequestView>;
      case '/passwordReset':
        return <PasswordResetView updateLocation={ this._updateLocation }></PasswordResetView>;
      case '/terms':
        return <TermsView updateLocation={ this._updateLocation }></TermsView>;
      default:

    }
  }

  _updateLocation = () => {
    this.setState({ location: window.location.pathname });
  }

}

export default App;
