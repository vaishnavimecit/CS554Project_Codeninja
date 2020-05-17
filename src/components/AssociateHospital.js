import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import axios from "axios";
import { AuthContext } from "../firebase/Auth";

function AssociateHospital(props) {
  const [message, setMessage] = useState(undefined);
  const [hospitals, setHospitals] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(undefined);
  const { currentUser } = useContext(AuthContext);
  let content = null;
  useEffect(() => {
    async function getData() {
      console.log(props.match.params.set_gid);
      associate(props.match.params.set_gid);
    }
    getData();
  }, []);

  function generateAlert(message, variant) {
    return <Alert variant={variant}>{message}</Alert>;
  }

  async function associate(g_id) {
    try {
      //${profile.id}?g_id=${g_id}`
      await axios
        .get(`http://localhost:3001/hospitals/getHospital/${g_id}`)
        .then((data) => {
          setHospitals(data);
          console.log(hospitals);
        });
      console.log(hospitals);
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
    console.log(hospitals);
    items.push(
      <Card key={hospitals.data.google_id}>
        <Card.Body>
          <Card.Title>{hospitals.data.name}</Card.Title>
          <Card.Text>{hospitals.data.city}</Card.Text>
          <Card.Text>{hospitals.data.state}</Card.Text>
          <Card.Text>{hospitals.data.phone}</Card.Text>
        </Card.Body>
      </Card>
    );

    return <div>{items}</div>;
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
      {content}
      <footer class="footer">
        2020 &#169; Stevens Institute of Technology
      </footer>
    </div>
  );
}

export default AssociateHospital;
