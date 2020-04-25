import React from "react";
import { doSignOut } from "../firebase/FirebaseFunctions";

const SignOutButton = () => {
  return (
    <li className="nav-item">
      <a className="nav-link" onClick={doSignOut}>
        Sign Out
      </a>
    </li>
  );
};

export default SignOutButton;
