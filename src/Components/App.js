import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./Navbar/Header";
import Home from "../Pages/Homepage";
import LogIn from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import CompleteReg from "../Pages/auth/CompleteReg";



const App = () => {
  return (
    <>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/register" exact component={Register} />
            <Route path="/register/complete" exact component={CompleteReg} />
          </Switch>
        </BrowserRouter>
    </>
  );
};

export default App;
