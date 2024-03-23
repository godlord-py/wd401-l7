import React, { Children } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import ProtectedRoute from './ProtectedRoute';
import AccountLayout from '../layouts';
import ArticleComponent from '/home/godlord/capstone301/sportnewsapp/src/pages/home/Article';
import HomePage from '../pages/home/HomePage';
import Pass from '../pages/Password/pass';
import Preferences from '../pages/home/prefrences';
const router = createBrowserRouter([
    {
        path: '/',
        element:( <ProtectedRoute>
            <div>
            <AccountLayout/>
            </div>
        </ProtectedRoute>
        ),
},

{
    path: 'match',
    children: [
      {
        index: true,
        element: <Navigate to="/" replace />,
      },
      {
        path: ':matchId',
        element: <HomePage/>,
      },
    ],
  },
  {
    path: 'article',
    children: [
      {
        index: true,
        element: <Navigate to="/" replace />,
      },
      {
        path: ':articleId',
        element: <ArticleComponent />,
      },
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
    },
    {
      path: 'reset-password',
      element: <Pass/>
    },
    {
      path: 'preference',
      element: <Preferences/>
    }
]);


export default router;
