import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import signin from "./components/SignIn"
import signup from "./components/SignUp"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { AuthProvider } from './firebase/Auth';


import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto">
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={signin} />
          <Route path="/sign-up" exact component={signup} />

        </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
