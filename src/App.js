import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mx-auto">
          <Route path="/" exact component={Home} />
<<<<<<< Updated upstream
=======
          <Route path="/home" exact component={Home} />
          <div className="container mx-auto">
            <Route path="/signin" exact component={signin} />
            <Route path="/sign-up" exact component={signup} />
            <Route path="/hospitals" exact component={hospitals} />
            <Route path="/about" exact component={about} />
            <Route path="/contact" exact component={contact} />
            <Route path="/faq" exact component={faq} />
            <Route
              path="/hospitals/:set_gid"
              exact
              component={AssociateHospital}
            />
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </Router>
  );
}

export default App;
