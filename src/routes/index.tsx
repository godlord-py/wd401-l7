import React from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import ProtectedRoute from './ProtectedRoute';
const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute>
            <h1>Home</h1>
        </ProtectedRoute>
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
