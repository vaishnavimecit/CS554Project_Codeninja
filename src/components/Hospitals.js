import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function Hospitals() {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState(undefined);
  const [displayData, setDisplayData] = useState(undefined);
  const [zipcode, setZipCode] = useState(undefined);
  let email = null;
  let content = null;

  useEffect(() => {
    async function getData() {
      console.log("render");
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
    try {
      const res = await axios.get(
        `http://localhost:3001/donors/email/${email}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getLocationByZip = async (zip) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/locations/coordinates/${zip}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getHospitals = async (longitude, latitude) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/locations/hospitals?longitude=${longitude}&latitude=${latitude}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  };

  function getContent() {
    return <p>{JSON.stringify(displayData)}</p>;
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
