import React from 'react';

export default (props) => {
const renderItems = props.emails.map((email,index) => <li key={index}>{email.email}</li>)
  return(
    <ul className="List">
      {renderItems}
    </ul>
  );
};