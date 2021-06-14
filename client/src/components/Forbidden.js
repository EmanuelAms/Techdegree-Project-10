import React from 'react';

/*--------------------------/
FORBIDDEN STATELESS COMPONENT
  displays a message when
  the requested page can't
  be accessed
/--------------------------*/

const Forbidden = () => {
  
  return (
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
      </div>
  );
}

export default Forbidden;