import React from 'react';

/*--------------------------/
UNHANDLED STATELESS COMPONENT
  displays a message when
  the an unexpected error
  has occurred
/--------------------------*/

const UnhandledError = () => {
  
  return (
      <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
      </div>
  );
}

export default UnhandledError;