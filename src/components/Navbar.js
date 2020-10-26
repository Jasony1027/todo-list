import React from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar(props) {
  return (
    <nav>
      <Link to="/">Home</Link>
      &nbsp;|&nbsp;
      <Link to="/about">About</Link>
      &nbsp;&nbsp;
      <ThemeSwitcher />
    </nav>
  );
}
