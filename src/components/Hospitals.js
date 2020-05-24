import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

function Hospitals() {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState(undefined);
  const [displayData, setDisplayData] = useState(undefined);
  const [zipcode, setZipCode] = useState(undefined);
  let email = null;
  let content = null;

  useEffect(() => {
    async function getData() {
      try {
        if (currentUser && !zipcode) {
          email = currentUser.email;
          const user = await getUser(email);
          const hospitals = await getHospitals(
            user.location._longitude,
            user.location._latitude
          );
          setDisplayData(hospitals);
        } else if (zipcode) {
          const location = await getLocationByZip(zipcode);
          const hospitals = await getHospitals(
            location.longitude,
            location.latitude
          );
          setDisplayData(hospitals);
        }
      } catch (e) {
        if (typeof error === "string") {
          setMessage(generateAlert(e, "danger"));
        } else {
          setMessage(generateAlert(JSON.stringify(e), "danger"));
        }
      }
    }
    getData();
  }, [zipcode]);

  async function handleSearch(e) {
    e.preventDefault();
    const { zip } = e.target.elements;

    if (zip.value.trim() === "" || zip.value.trim().length < 4) {
      setMessage(generateAlert("Invalid Zip Code", "danger"));
      return false;
    }
    setZipCode(zip.value);
  }

  function generateAlert(message, variant) {
    return <Alert variant={variant}>{message}</Alert>;
  }

  const getUser = async (email) => {
    let res;
    try {
      res = await axios.get(
        `https://make-a-changebackend-lkskcm7koq-uc.a.run.app/donors/email/${email}`
      );
      return res.data;
    } catch {
      try {
        res = await axios.get(
          `https://make-a-changebackend-lkskcm7koq-uc.a.run.app/hospitals/email/${email}`
        );
        return res.data;
      } catch {
        throw "Error: user not found.";
      }
    }
  };

  const getLocationByZip = async (zip) => {
    try {
      const res = await axios.get(
        `https://make-a-changebackend-lkskcm7koq-uc.a.run.app/locations/coordinates/${zip}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getHospitals = async (longitude, latitude) => {
    try {
      const res = await axios.get(
        `https://make-a-changebackend-lkskcm7koq-uc.a.run.app/locations/hospitals?longitude=${longitude}&latitude=${latitude}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  function getContent() {
    const sortedHospitals = displayData.sort((a, b) => {
      if (a.isSignedUp && b.isSignedUp) {
        if (a.data.urgency === b.data.urgency) {
          return 0;
        } else if (
          a.data.urgency === "Critical" &&
          b.data.urgency !== "Critical"
        ) {
          return -1;
        } else if (
          a.data.urgency !== "Critical" &&
          b.data.urgency === "Critical"
        ) {
          return 1;
        } else if (a.data.urgency === "Medium" && b.data.urgency !== "Medium") {
          return -1;
        } else if (a.data.urgency !== "Medium" && b.data.urgency === "Medium") {
          return 1;
        } else {
          return a.data.urgency === "Low" ? -1 : 1;
        }
      } else if (a.isSignedUp && !b.isSignedUp) {
        return -1;
      } else if (!a.isSignedUp && b.isSignedUp) {
        return 1;
      } else {
        return 1;
      }
    });
    const items = [];
    sortedHospitals.forEach((hosp) => {
      if (hosp.isSignedUp) {
        items.push(
          <Card key={hosp.google_id}>
            <Card.Body>
              <Card.Title>{hosp.name}</Card.Title>
              <Card.Text>{hosp.address}</Card.Text>
              <Card.Text text="success">
                This clinic is signed up with us!
              </Card.Text>
              <Card.Text>
                Their indicated severity of needing PPE donations is:{" "}
                <Card.Text
                  text={
                    hosp.data.urgency === "Critical"
                      ? "danger"
                      : hosp.data.urgency === "Low"
                      ? "success"
                      : "warning"
                  }
                >
                  {hosp.data.urgency}
                </Card.Text>
                <Card.Text>
                  Items they are requesting:
                  {"\n" +
                    hosp.data.requestedItems
                      .map((itm) => `${itm.quantity} ${itm.name}`)
                      .join(", ")}
                </Card.Text>
              </Card.Text>
              <Button variant="success" href={`/hospitals/${hosp.google_id}`}>
                Get In Contact to Donate!
              </Button>
            </Card.Body>
          </Card>
        );
      } else {
        items.push(
          <Card key={hosp.google_id}>
            <Card.Body>
              <Card.Title>{hosp.name}</Card.Title>
              <Card.Text>{hosp.address}</Card.Text>
              <Card.Text>This clinic is not signed up with us.</Card.Text>
            </Card.Body>
          </Card>
        );
      }
    });
    return <div>{items}</div>;
  }

  if (displayData) {
    content = getContent();
  } else {
    if (currentUser) {
      content = (
        <div>
          <Spinner className="center" animation="border" variant="primary" />
          <br></br>
          <small className="center">Loading Data On Your Region...</small>
        </div>
      );
    } else {
      content = (
        <p className="center">
          Or Sign In to View Hopsitals and Clinics In Your Area.
        </p>
      );
    }
  }
  return (
    <div>
      {message}
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Hospitals By Zipcode"
            aria-label="Search Hospitals By Zipcode"
            aria-describedby="basic-addon2"
            name="zip"
          />
          <InputGroup.Append>
            <Button variant="outline-success" type="submit">
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>

      <hr></hr>
      {content}
    </div>
  );
}

export default Hospitals;
