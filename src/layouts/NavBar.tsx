import { Navbar, Nav, Button } from 'rsuite';
import AdminIcon from '@rsuite/icons/Admin';
import OffIcon from '@rsuite/icons/Off';
import FunnelIcon from '@rsuite/icons/Funnel';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preferences from '../pages/home/prefrences';
import { User } from '../types';
import CharacterLockIcon from '@rsuite/icons/CharacterLock';
import Pass from '../pages/Password/pass';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handlePreferencesClick = () => {
    setShowPreferences(true);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
  };
  const handleResetPasswordClick = () => {
    setShowResetPassword(true); 
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false); 
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData: User = JSON.parse(userDataString);
      setUser(userData);
    }
  }, []);

  const signout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    console.log("User data: ", localStorage.getItem("userData"));
    console.log("Auth token: ", localStorage.getItem("authToken"));
    navigate('/signin');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="rs-theme-dark">
      <Navbar>
        <Navbar.Brand aria-label="Sports News App">{t('SportsNewsApp')}</Navbar.Brand>
        <Nav>
          <Nav.Item aria-label="News" onClick={() => navigate('/article')}>{t('Articles')}</Nav.Item>
          <Nav.Item aria-label="Live Sports" onClick={() => navigate('/live')}>{t('Live Sports')}</Nav.Item>
        </Nav>
        <Nav pullRight>
          {user ? (
            <>
              <Nav.Item icon={<AdminIcon/>}>{t('Welcome')} {user.name}</Nav.Item>
              <Nav.Item onClick={handleResetPasswordClick} icon={<CharacterLockIcon/>} aria-label="Reset Password">{t('Reset Password')}</Nav.Item>
              <Nav.Item onClick={handlePreferencesClick} icon={<FunnelIcon/>} aria-label="Change Preferences">{t('Change Preferences')}</Nav.Item>
              <Nav.Item onClick={signout} icon={<OffIcon/>} aria-label="Signout">{t('Signout')}</Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item onClick={() => navigate('/signin')} aria-label="Sign In">{t('Sign In')}</Nav.Item>
              <Nav.Item onClick={() => navigate('/signup')} aria-label="Sign Up">{t('Sign Up')}</Nav.Item>
            </>
          )}
          <Nav.Item>  
            <Button 
              onClick={() => changeLanguage('en')}
              style={{ fontWeight: currentLanguage === 'en' ? 'bold' : 'normal',
              color: currentLanguage === 'en' ? 'blue' : 'inherit' 
               }}
            >
              English
            </Button>
            |
            <Button 
              onClick={() => changeLanguage('es')}
              style={{ fontWeight: currentLanguage === 'es' ? 'bold' : 'normal',
              color: currentLanguage === 'es' ? 'blue' : 'inherit' 
               }}
            >
              Spanish
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar>
      {showPreferences && <Preferences show={showPreferences} onClose={handleClosePreferences} authToken={localStorage.getItem("authToken")} />}
      {showResetPassword && (
        <Pass onClose={handleCloseResetPassword} />
      )}
    </div>
  );
};

export default NavBar;