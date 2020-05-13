import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import signin from "./components/SignIn";
import signup from "./components/SignUp";
import hospitals from "./components/Hospitals";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import about from "./components/About";
import contact from "./components/Contact"
import { AuthProvider } from "./firebase/Auth";

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
            <Route path="/hospitals" exact component={hospitals} />
            <Route path="/about" exact component={about} />
            <Route path="/contact" exact component={contact} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
