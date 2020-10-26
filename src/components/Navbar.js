import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar(props) {
  return (
    <nav>
      <Link to="/" className="navLink">Home</Link>
      &nbsp;|&nbsp;
      <Link to="/about" className="navLink">About</Link>
      &nbsp;|&nbsp;
      <Link to="/API" className="navLink">API</Link>
      <ThemeSwitcher />
    </nav>
  );
}
