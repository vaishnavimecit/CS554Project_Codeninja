import React, { useContext, useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import axios from "axios";

function HospitalInfo(props) {
  const [message, setMessage] = useState(undefined);
  const [info, setInfo] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  let content = null;

  const id = props.match.params.google_id;

  function generateAlert(message, variant) {
    return <Alert variant={variant}>{message}</Alert>;
  }

  useEffect(() => {
    async function getData() {
      await getHospital(id);
    }
    if (!loaded) {
      getData();
    }
  }, [loaded]);

  async function getHospital(id) {
    try {
      const res = await axios.get(
        `http://localhost:3001/hospitals/google_id/${id}`
      );
      setInfo(res.data);
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

  function getContent() {
    const items = [];
    info.requestedItems.forEach((itm) => {
      items.push(
        <li>
          <Card.Text key={itm.name}>
            - {itm.quantity} {itm.name}
          </Card.Text>
        </li>
      );
    });

    return (
      <div>
        <Card key={info.google_id}>
          <Card.Body>
            <Card.Title>{info.name}</Card.Title>
            <Card.Text>{info.address}</Card.Text>
            <Card.Text>
              {info.city}, {info.state}
            </Card.Text>
            <Card.Text>Phone: {info.phone}</Card.Text>
            <Card.Text>Email: {info.email}</Card.Text>
            <Card.Text>Items this clinic needs donated:</Card.Text>
            <ul>{items}</ul>

            <Card.Text>Donation Instructions: {info.instructions}</Card.Text>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (info) {
    content = getContent();
  } else {
    content = (
      <div>
        <h2>Just One More Step!</h2>
        <Spinner className="center" animation="border" variant="primary" />
        <br></br>
        <small className="center">Loading Data On Hospital...</small>
      </div>
    );
  }
  return (
    <div>
      {message}

      <hr></hr>
      {content}
      <footer class="footer">
        2020 &#169; Stevens Institute of Technology
      </footer>
    </div>
  );
}

export default HospitalInfo;
