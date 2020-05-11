import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import signin from "./components/SignIn";
import signup from "./components/SignUp";
import hospitals from "./components/Hospitals";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AssociateHospital from "./components/AssociateHospital";
import contact from "./components/Contact";
import faq from "./components/Faq"
import { AuthProvider } from "./firebase/Auth";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Route path="/" exact component={Home} />
          <div className="container mx-auto">
           
            <Route path="/signin" exact component={signin} />
            <Route path="/sign-up" exact component={signup} />
            <Route path="/hospitals" exact component={hospitals} />
            <Route path="/contact" exact component={contact} />
            <Route path="/faq" exact component={faq} />
            <Route
              path="/hospitals/set_gid"
              exact
              component={AssociateHospital}
            />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
