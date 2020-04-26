import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";

function Hospitals() {
  const { currentUser } = useContext(AuthContext);
  const [location, setLocation] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {}, [location]);
  useEffect(() => {
    async function getLocation() {
      const user = await getUserLocation(email);
      setUser(user);
      setLocation(user.location);
    }
    if (email) {
      getLocation();
    }
  }, []);

  const getUserLocation = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/donors/email/${email}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  // if (currentUser) {
  //   setEmail(currentUser.email);
  // }
  return <div></div>;
}

export default Hospitals;
