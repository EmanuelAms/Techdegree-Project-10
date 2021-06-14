import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/*------------------------------------/
             PRIVATE ROUTE
protects routes for authenticated users
/------------------------------------*/

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser ? (
            // if there's an authenticated user, renders the component associated with the private route
              <Component {...props} />
            ) : (
            // if there's not an authenticated user, redirects the user to the /forbidden route
              <Redirect to={{
                pathname: '/forbidden',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
}

export default PrivateRoute;