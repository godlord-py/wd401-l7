import React from 'react';
import {Navigate, createBrowserRouter} from 'react-router-dom';
import Signin from '../pages/signin';
import Signup from '../pages/signup';

const router = createBrowserRouter([
    {
        path: "/", 
        element: <Signup/>,
        children: [
            {
                index: true,
                action: () => <Navigate to="/signin" />
            },
            {
                path: "/signin",
                element: <Signin/>,
            }
        ]
    }
])

export default router;