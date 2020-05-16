import React, { Component, useContext } from "react";
import PropTypes from "prop-types";
import SignOutButton from "./SignOut";
import { AuthContext } from "../firebase/Auth";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="head">
      {currentUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </div>
  );
};

const NavigationAuth = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Make A Change
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="navi-link" href="/faq">
              FAQ
            </a>
          </li>
          <li className="nav-item">
            <a className="navi-link" href="/about">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a className="navi-link" href="/contact">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className="navi-link" href="/hospitals">
              Hospitals
            </a>
          </li>
        </ul>
        <ul className="navbar-nav flex-row ml-md-auto">
          <SignOutButton></SignOutButton>
        </ul>
      </div>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        Make A Change
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="navi-link" href="/faq">
              FAQ
            </a>
          </li>
          <li className="nav-item">
            <a className="navi-link" href="/about">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a className="navi-link" href="/contact">
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a className="navi-link" href="/hospitals">
              Hospitals
            </a>
          </li>
        </ul>
        <ul className="navbar-nav flex-row ml-md-auto">
          <li className="nav-item">
            <a className="navi-link" href="/signin">
              Sign In
            </a>
          </li>

          <li className="nav-item">
            <a className="navi-link" href="/sign-up">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {}

  // componentDidMount() {}

  // componentWillReceiveProps(nextProps) {}

  // shouldComponentUpdate(nextProps, nextState) {}

  // componentWillUpdate(nextProps, nextState) {}

  // componentDidUpdate(prevProps, prevState) {}

  // componentWillUnmount() {}

  // render() {
  //   return (
  //     <div>
  //       <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //         <a className="navbar-brand" href="/">
  //           Make A Change
  //         </a>
  //         <button
  //           className="navbar-toggler"
  //           type="button"
  //           data-toggle="collapse"
  //           data-target="#navbarNav"
  //           aria-controls="navbarNav"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse" id="navbarNav">
  //           <ul className="navbar-nav">
  //             <li className="nav-item">
  //               <a className="nav-link" href="/donor-form">
  //                 Donor Form
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a className="nav-link" href="/hospital-form">
  //                 Hospital Form
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a className="nav-link" href="/hospital-info">
  //                 Hospital Info Sheet
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a className="nav-link" href="/about">
  //                 About Us
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a className="nav-link" href="/contact">
  //                 Contact
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a className="nav-link" href="/hospitals">
  //                 Hospitals
  //               </a>
  //             </li>
  //           </ul>
  //           <ul className="navbar-nav flex-row ml-md-auto">
  //             <li className="nav-item">
  //               <a className="nav-link" href="/signin">
  //                 Sign In
  //               </a>
  //             </li>

  //             <li className="nav-item">
  //               <a className="nav-link" href="/sign-up">
  //                 Sign Up
  //               </a>
  //             </li>
  //                  <SignOutButton />

  //           </ul>
  //         </div>
  //       </nav>
  //     </div>
  //   );
  //}
}

//Navbar.propTypes = {};

export default Navigation;
