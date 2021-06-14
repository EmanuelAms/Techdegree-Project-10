import React from 'react';

/*--------------------------/
NOTFOUND STATELESS COMPONENT
  displays a message when
  the requested page can't
  be found
/--------------------------*/

const NotFound = () => {
  
  return (
      <div className="wrap">
        <h2>Not Found</h2>
        <p>Sorry! We couldn't find the page you're looking for.</p>
      </div>
  );
}

export default NotFound;