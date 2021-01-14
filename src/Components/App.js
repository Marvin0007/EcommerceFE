import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../Firebase/firebase";

import Header from "./Navbar/Header";
import Home from "../Pages/Homepage";
import LogIn from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import CompleteReg from "../Pages/auth/CompleteReg";
import ResetPass from '../Pages/auth/ResetPass';

const App = () => {
  const dispatch = useDispatch();

  // To Check FireBase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("USER:", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: "Marvin",
            email: user.email,
            token: idTokenResult.token
          }
        });
      }
    })
    // Clean Up
    return () => unsubscribe(); 
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/register" exact component={Register} />
          <Route path="/register/complete" exact component={CompleteReg} />
          <Route path="/resetpass" exact component={ResetPass} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
