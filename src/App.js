import React from "react";
import { Route, Switch } from 'react-router-dom'
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Error from "./components/Error";
import API from "./components/API"

function App() {
  return(
    <div className='todoapp stack-large'>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/API" component={API} />
        <Route component={Error} />
      </Switch>
    </div>

  )
}

export default App;
