import './App.css'
import React from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { MatchProvider } from './context/members/context'
import { ArticleProvider } from './context/articles/context'
import { SportProvider } from './context/sports/context'
import { TeamProvider } from './context/teams/context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <MatchProvider>
        <ArticleProvider>
          <SportProvider>
            <TeamProvider>
          <RouterProvider router={router} />
          <ToastContainer/>
          </TeamProvider>
          </SportProvider>
        </ArticleProvider>
      </MatchProvider>
    </div>  
  )
}
    
export default App;
