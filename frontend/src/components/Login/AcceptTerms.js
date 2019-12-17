import React from 'react';
import './AcceptTerms.css'
import Link from '../Link.js'
import TermsText from '../TermsText.js'

export default function(props){/*updateLocation*/
  return (
    <div className="terms interface-block">
      <TermsText></TermsText>
      <Link
      className="button accept-terms__button"
      path="/fillData"
      updateLocation={ props.updateLocation }>
      Я СОГЛАСЕН</Link>
    </div>
  );
}
