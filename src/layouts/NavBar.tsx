import { Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const signout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  //display userdata and authtoken in console
  console.log("User data: ", localStorage.getItem("userData"));
  console.log("Auth token: ", localStorage.getItem("authToken"));
  return '/signin';
}

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="rs-theme-dark">
  <Navbar>
    <Navbar.Brand href="#" aria-label="Sports News App">SportsNewsApp</Navbar.Brand>
    <Nav>
      <Nav.Item icon={<HomeIcon />} aria-label="Home">Home</Nav.Item>
      <Nav.Item aria-label="News" onClick={() => {navigate('/article')}}>Articles</Nav.Item>
    </Nav>
    <Nav pullRight>
      <Nav.Menu icon={<CogIcon />} title="Profile" aria-label="Profile Menu">
        <Nav.Item onClick={() => {
          console.log("Signout button clicked!");
          navigate(signout()); 
        }} aria-label="Signout">Signout</Nav.Item>
        <Nav.Item href="/reset-password" aria-label="Change">Reset Password</Nav.Item>
      </Nav.Menu>
    </Nav>
  </Navbar>
  </div>
  );
};

export default NavBar;