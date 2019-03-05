import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
        {...rest}
         render={
            (props) => {
                if (auth.isAuthenticated()) {
                    console.log("authenticated true");
                    return <Component {...props}/>
                }
                else {
                    console.log("authenticated false");
                    return (<Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }
                    />
                    );
                    
                }
            }
        }/>
    )
}

export default ProtectedRoute;