import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function RestrictiveRoute({component: Component, ...rest}) {

    const {currentUser} = useAuth();
    
    return (
        <Route {...rest} render={props => (
            currentUser ?
                <Redirect to="/" />
            :
            <Component {...props} />
        )} />
    );
};