import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preferences from '../pages/home/prefrences';
import {User} from '../types';
const signout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  console.log("User data: ", localStorage.getItem("userData"));
  console.log("Auth token: ", localStorage.getItem("authToken"));
  return '/signin';
}
const resetPassword = () => {
  localStorage.getItem("authToken");
  localStorage.getItem("userData");
  console.log("User data: ", localStorage.getItem("userData"));
  console.log("Auth token: ", localStorage.getItem("authToken"));
  return '/reset-password';
}

const NavBar = () => {
  const navigate = useNavigate();
  const [showPreferences, setShowPreferences] = useState(false); // State to control visibility of preferences popup
  const [user, setUser] = useState<User | null>(null);
  const handlePreferencesClick = () => {
    setShowPreferences(true);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
  };
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData: User = JSON.parse(userDataString);
      setUser(userData);
    }
  }, []);

  return (
    <div className="rs-theme-dark">
      <Navbar>
        <Navbar.Brand href="#" aria-label="Sports News App">SportsNewsApp</Navbar.Brand>
        <Nav>
          <Nav.Item icon={<HomeIcon />} aria-label="Home">Home</Nav.Item>
          <Nav.Item aria-label="News" onClick={() => navigate('/article')}>Articles</Nav.Item>
        </Nav>
        <Nav pullRight>
          <Nav.Menu  icon={<CogIcon />} title={user ? `Welcome ${user.name}` : "Profile"} aria-label="Profile Menu">
            <Nav.Item onClick={() => {
              console.log("Signout button clicked!");
              navigate(signout());
            }} aria-label="Signout">Signout</Nav.Item>
            <Nav.Item  onClick={() => {
              console.log("password button clicked!");
              navigate(resetPassword());
            }} aria-label="Reset Password">Reset Password</Nav.Item>
            <Nav.Item onClick={handlePreferencesClick} aria-label="Change Preferences">Change Preferences</Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>

      {/* Conditionally render Preferences only when showPreferences is true */}
      {showPreferences && <Preferences show={showPreferences} onClose={handleClosePreferences} />}
    </div>
  );
};

export default NavBar;
