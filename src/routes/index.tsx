import React, { Children } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import ProtectedRoute from './ProtectedRoute';
import AccountLayout from '../layouts';
const router = createBrowserRouter([
    {
        path: '/',
        element:( <ProtectedRoute>
            <div>
            <AccountLayout/>
            </div>
        </ProtectedRoute>
        ),
    children: [
        {
            index:true,
            element: <></>
        }
    ],
},
    {
        path: 'signin',
        element: <Signin /> 
    },
    {
        path: 'signup',
        element: <Signup />
    },
    {
        path: '*',
        element: <Navigate to="/signin" replace />
    }
]);


export default router;
