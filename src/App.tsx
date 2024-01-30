import './App.css'
import React from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { MatchProvider } from './context/members/context'
import { ArticleProvider } from './context/articles/context'
function App() {
  return (
    <div>
      <MatchProvider>
        <ArticleProvider>
          <RouterProvider router={router} />
        </ArticleProvider>
      </MatchProvider>
    </div>  
  )
}
    
export default App;
