import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';

/*--------------------------/
USERSIGNOUT STATELESS COMPONENT
  sign out the authenticated
  user
/--------------------------*/
    
const UserSignOut = ({context}) => {
    useEffect(() =>  context.actions.signOut());
    return (
    <Redirect to="/" />
    )
};

export default UserSignOut;