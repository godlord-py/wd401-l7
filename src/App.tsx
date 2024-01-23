import './App.css'
import React from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { Navbar } from 'rsuite'
import { MatchProvider } from './context/context'
function App() {
  return (
    <div>
      <MatchProvider>
      <RouterProvider router={router}/>
      </MatchProvider>
    </div>  
  )
}
    
export default App;
