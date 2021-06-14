import React from 'react';

/*------------------------------/
        AUTHENTICATED
displays successful authentication
page after a user signs in
/------------------------------*/

const Authenticated = ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} {authUser.lastName} is authenticated!</h1>
      <p>Your username is {authUser.emailAddress}.</p>
    </div>
  </div>
  );
}

export default Authenticated;