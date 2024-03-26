import { Navbar, Nav } from 'rsuite';
import AdminIcon from '@rsuite/icons/Admin';
import OffIcon from '@rsuite/icons/Off';
import FunnelIcon from '@rsuite/icons/Funnel';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preferences from '../pages/home/prefrences';
import { User } from '../types';
import CharacterLockIcon from '@rsuite/icons/CharacterLock';
import Pass from '../pages/Password/pass';


const NavBar = () => {
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
    setShowResetPassword(true); // Show the password reset pop-up
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false); // Close the password reset pop-up
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

  const resetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <div className="rs-theme-dark">
      <Navbar>
        <Navbar.Brand aria-label="Sports News App">SportsNewsApp</Navbar.Brand>
        <Nav>
          <Nav.Item aria-label="News" onClick={() => navigate('/article')}>Articles</Nav.Item>
        </Nav>
        <Nav pullRight>
          {user ? (
            <>
              <Nav.Item icon={<AdminIcon/>}>Welcome {user.name}</Nav.Item>
              <Nav.Item onClick={handleResetPasswordClick} icon={<CharacterLockIcon/>} aria-label="Reset Password">Reset Password</Nav.Item>
              <Nav.Item onClick={handlePreferencesClick} icon={<FunnelIcon/>} aria-label="Change Preferences">Change Preferences</Nav.Item>
              <Nav.Item onClick={signout} icon={<OffIcon/>} aria-label="Signout">Signout</Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item onClick={() => navigate('/signin')} aria-label="Sign In">Sign In</Nav.Item>
              <Nav.Item onClick={() => navigate('/signup')} aria-label="Sign Up">Sign Up</Nav.Item>
            </>
          )}
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
