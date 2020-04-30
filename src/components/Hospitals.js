import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function Hospitals() {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState(undefined);
  const [displayData, setDisplayData] = useState(undefined);
  let email = null;
  let content = null;
  let zipcode = null;

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
  }, [displayData]);

  async function handleSearch(e) {
    e.preventDefault();
    console.log(e.target.elements);
    const { zip } = e.target.elements;

    if (zip.value.trim() === "" || zip.value.trim().length < 4) {
      setMessage(generateAlert("Invalid Zip Code", "danger"));
      return false;
    }
    try {
      zipcode = zip;
      const location = await getLocationByZip(zipcode);
      const hospitals = await getHospitals(
        location.longitude,
        location.latitude
      );
      setDisplayData(hospitals);
    } catch (e) {
      if (typeof error === "string") {
        setMessage(generateAlert(e, "danger"));
      } else {
        setMessage(generateAlert(JSON.stringify(e), "danger"));
      }
    }
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
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search Hospitals By Zipcode"
          aria-label="Search Hospitals By Zipcode"
          aria-describedby="basic-addon2"
          name="zip"
        />
        <InputGroup.Append>
          <Button
            variant="outline-success"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <hr></hr>
      {content}
    </div>
  );
}

export default Hospitals;
