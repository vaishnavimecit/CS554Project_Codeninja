import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import signin from "./components/SignIn";
import signup from "./components/SignUp";
import hospitals from "./components/Hospitals";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import about from "./components/About";
import contact from "./components/Contact";
import AssociateHospital from "./components/AssociateHospital";
import HospitalInfo from "./components/HospitalInfo";
import NotFound from "./components/NotFound";
import faq from "./components/Faq";
import { AuthProvider } from "./firebase/Auth";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <div className="container mx-auto">
              <Switch>
                <Route path="/signin" exact component={signin} />
                <Route path="/sign-up" exact component={signup} />
                <Route path="/hospitals" exact component={hospitals} />
                <Route path="/about" exact component={about} />
                <Route path="/contact" exact component={contact} />
                <Route path="/faq" exact component={faq} />
                <Route
                  path="/associatehospital"
                  exact
                  component={AssociateHospital}
                />
                <Route
                  path="/hospitals/:google_id"
                  exact
                  component={HospitalInfo}
                />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
