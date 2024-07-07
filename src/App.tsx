import './App.css'
import React, { useState } from 'react'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import { MatchProvider } from './context/members/context'
import { ArticleProvider } from './context/articles/context'
import { SportProvider } from './context/sports/context'
import { TeamProvider } from './context/teams/context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";
function App() {
  const { t, i18n: {changeLanguage, language} } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(language)

  const handleChangeLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "es" : "en";
    setCurrentLanguage(newLanguage);
    changeLanguage(newLanguage);
  }
  return (
        <MatchProvider>
          <ArticleProvider>
            <SportProvider>
              <TeamProvider>
                <RouterProvider router={router} />
                <ToastContainer />
              </TeamProvider>
            </SportProvider>
          </ArticleProvider>
        </MatchProvider>
  )
}
    
export default App;
