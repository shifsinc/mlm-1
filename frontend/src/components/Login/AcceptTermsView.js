import React from 'react';
import './AcceptTermsView.css'
import Link from '../Link.js'
import TermsText from '../TermsText.js'

export default function(props){/*updateLocation*/
  return (
    <div className="terms-view interface-block">
      <TermsText></TermsText>
      <Link
      className="button accept-terms-view__button"
      title="Я СОГЛАСЕН"
      path="/fillData"
      updateLocation={ props.updateLocation }></Link>
    </div>
  );
}
