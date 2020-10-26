import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom'
import { nanoid } from "nanoid";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Error from "./components/Error";


function App() {
  return(
    <div className='todoapp stack-large'>
      <Navbar />
      
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route component={Error} />
      </Switch>
    </div>

  )
}

export default App;
