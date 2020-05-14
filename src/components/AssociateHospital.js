import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { AuthContext } from "../firebase/Auth";

function AssociateHospital() {
  const [message, setMessage] = useState(undefined);
  const [hospitals, setHospitals] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(undefined);
  const { currentUser } = useContext(AuthContext);
  let content = null;
  useEffect(() => {
    async function getData() {
      const user = await getAccount();
      if (user) {
        await getHospitals(user.location._longitude, user.location._latitude);
      }
    }
    if (!loaded) {
      getData();
    }
  }, [loaded]);

  if (!currentUser || profile === null) {
    return <Redirect to="/"></Redirect>;
  }

  function generateAlert(message, variant) {
    return <Alert variant={variant}>{message}</Alert>;
  }

  async function associate(g_id) {
    try {
      await axios.post(
        `http://localhost:3001/hospitals/${profile.id}?g_id=${g_id}`
      );
      setProfile(null);
      setLoaded(true);
    } catch (e) {
      if (typeof e === "string") {
        setMessage(generateAlert(e, "danger"));
      } else {
        setMessage(
          generateAlert(e.message ? e.message : JSON.stringify(e), "danger")
        );
      }
    }
  }

  function getContent() {
    const items = [];
    hospitals.forEach((hosp) => {
      items.push(
        <Card key={hosp.google_id}>
          <Card.Body>
            <Card.Title>{hosp.name}</Card.Title>
            <Card.Text>{hosp.address}</Card.Text>
            <Button variant="primary" onClick={() => associate(hosp.google_id)}>
              This is Me!
            </Button>
          </Card.Body>
        </Card>
      );
    });
    return <div>{items}</div>;
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function getAccount() {
    let retryCount = 0;
    const maxRetries = 5;
    while (retryCount < maxRetries) {
      retryCount++;
      try {
        const res = await axios.get(
          `http://localhost:3001/hospitals/email/${currentUser.email}`
        );
        setProfile(res.data);
        return res.data;
      } catch (e) {
        await delay(500);
      }
    }
    setProfile(null);
    setLoaded(true);
  }

  async function getHospitals(longitude, latitude) {
    try {
      const res = await axios.get(
        `http://localhost:3001/locations/hospitals?longitude=${longitude}&latitude=${latitude}`
      );
      setHospitals(res.data);
      setLoaded(true);
      return res.data;
    } catch (e) {
      if (typeof e === "string") {
        setMessage(generateAlert(e, "danger"));
      } else {
        setMessage(
          generateAlert(e.message ? e.message : JSON.stringify(e), "danger")
        );
      }
    }
  }

  if (hospitals) {
    content = getContent();
  } else {
    content = (
      <div>
        <h2>Just One More Step!</h2>
        <Spinner className="center" animation="border" variant="primary" />
        <br></br>
        <small className="center">Loading Data On Your Region...</small>
      </div>
    );
  }
  return (
    <div>
      {message}

      <hr></hr>
      {content}
    </div>
  );
}

export default AssociateHospital;
