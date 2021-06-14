import React from 'react';
import {Link} from 'react-router-dom';

/*--------------------------/
HEADER STATELESS COMPONENT
    displays top menu bar
    with sign in and sign up
    if no authenticated user
    or user name and sign out
    if authenticated user
/--------------------------*/

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a href="/">Courses</a></h1>
            <nav>
              {authUser ? (
                <React.Fragment>
                  <ul className="header--signedin">
                  <span>Welcome, {authUser.firstName} {authUser.lastName}! </span>
                  <Link to="/signout">Sign Out</Link>
                  </ul> 
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <ul className="header--signedout">
                  <li><Link className="signup" to="/signup">Sign Up</Link></li>
                  <li><Link className="signin" to="/signin">Sign In</Link></li>
                  </ul>
                </React.Fragment>
              )}
            </nav>
        </div>
      </header>
    );
  }
};