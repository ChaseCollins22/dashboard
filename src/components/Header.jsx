import React from 'react';
import logo from "../assets/McdonaldsLogo.svg";
import '../styles/header.css';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="McDonald's Logo" className="inline-logo" />
      <h1>McDonald's Dashboard</h1>
    </header>
  );
};

export default Header;