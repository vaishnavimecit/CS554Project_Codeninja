import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { createHospital, createDonor } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SocialSignIn from "./SocialSignIn";
function SignUp() {
  const [message, setMessage] = useState(undefined);
  const [validated, setValidated] = useState(false);
  const [otherType, setOtherType] = useState("Hospital/Clinic");
  const [entries, setEntries] = useState([]);
  useEffect(() => {}, [message, otherType, entries]);

  const { currentUser } = useContext(AuthContext);
  let formBody = null;

  const handleDonor = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.preventDefault();
    const {
      delivery,
      phone,
      first,
      last,
      city,
      state,
      zip,
      email,
      passwordOne,
      passwordTwo,
    } = e.target.elements;

    if (
      first.value.trim() === "" ||
      last.value.trim() === "" ||
      city.value.trim() === "" ||
      zip.value.trim() === "" ||
      state.value.trim() === "" ||
      email.value.trim() === ""
    ) {
      setMessage(generateAlert("All form fields are required", "warning"));
      return false;
    }
    if (
      passwordOne.value !== passwordTwo.value &&
      passwordOne.value.trim() !== ""
    ) {
      setMessage(generateAlert("Passwords do not match", "danger"));
      return false;
    }

    if (zip.value.length < 4 || zip.value.length > 6) {
      setMessage(generateAlert("Invalid Zip Code", "danger"));
      return false;
    }
    if (passwordOne.value.length < 8) {
      setMessage(
        generateAlert("Password must be at least 8 characters long.", "danger")
      );
      return false;
    }

    const items = [];
    for (let i = 0; i <= entries.length; i++) {
      if (
        e.target.elements[`item${i}`].value.trim() === "" ||
        e.target.elements[`quantity${i}`].value.trim() === ""
      ) {
        continue;
      }
      items.push({
        name: e.target.elements[`item${i}`].value,
        quantity: parseInt(e.target.elements[`quantity${i}`].value),
      });
    }

    setValidated(true);
    const newDonor = {
      items: items,
      delivery: delivery.value,
      city: city.value,
      state: state.value,
      name: {
        first: first.value,
        last: last.value,
      },
      zip: zip.value,
    };

    if (phone.value.trim() !== "") {
      if (phone.value.length < 8 || phone.value.length > 12) {
        setMessage(generateAlert("Invalid Phone Number.", "danger"));
        return false;
      } else {
        newDonor.phone = parseInt(phone.value);
      }
    }

    try {
      await createDonor(email.value, passwordOne.value, newDonor);
    } catch (error) {
      if (typeof error === "string") {
        setMessage(generateAlert(error, "danger"));
      } else {
        setMessage(
          generateAlert(
            error.message ? error.message : JSON.stringify(error),
            "danger"
          )
        );
      }
    }
  };

  const handleHospital = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    e.preventDefault();
    const {
      name,
      city,
      state,
      zip,
      cases,
      weeks,
      urgency,
      email,
      passwordOne,
      passwordTwo,
    } = e.target.elements;

    if (
      name.value.trim() === "" ||
      urgency.value.trim() === "" ||
      city.value.trim() === "" ||
      cases.value.trim() === "" ||
      weeks.value.trim() === "" ||
      zip.value.trim() === "" ||
      state.value.trim() === "" ||
      email.value.trim() === ""
    ) {
      setMessage(generateAlert("All form fields are required", "warning"));
      return false;
    }
    if (
      passwordOne.value !== passwordTwo.value &&
      passwordOne.value.trim() !== ""
    ) {
      setMessage(generateAlert("Passwords do not match", "danger"));
      return false;
    }

    if (zip.value.length < 4 || zip.value.length > 6) {
      setMessage(generateAlert("Invalid Zip Code", "danger"));
      return false;
    }
    if (passwordOne.value.length < 8) {
      setMessage(
        generateAlert("Password must be at least 8 characters long.", "danger")
      );
      return false;
    }
    const requestedItems = [];
    for (let i = 0; i <= entries.length; i++) {
      if (
        e.target.elements[`item${i}`].value.trim() === "" ||
        e.target.elements[`quantity${i}`].value.trim() === ""
      ) {
        continue;
      }
      requestedItems.push({
        name: e.target.elements[`item${i}`].value,
        quantity: parseInt(e.target.elements[`quantity${i}`].value),
      });
    }

    setValidated(true);

    try {
      await createHospital(email.value, passwordOne.value, {
        name: name.value,
        city: city.value,
        state: state.value,
        urgency: urgency.value,
        requestedItems: requestedItems,
        stats: {
          cases: parseInt(cases.value),
          weeksOfPpe: parseInt(weeks.value),
        },
        zip: zip.value,
      });
    } catch (error) {
      if (typeof error === "string") {
        setMessage(generateAlert(error, "danger"));
      } else {
        setMessage(
          generateAlert(
            error.message ? error.message : JSON.stringify(error),
            "danger"
          )
        );
      }
    }
  };

  if (currentUser) {
    if (otherType === "Donor") {
      return <Redirect to="/hospitals/set_gid" />;
    } else {
      return <Redirect to="/" />;
    }
  }
  function generateAlert(message, variant) {
    return <Alert variant={variant}>{message}</Alert>;
  }

  function addRow() {
    const numEntries = entries.length + 1;
    const itemName = "item" + numEntries;
    const quantityName = "quantity" + numEntries;
    setEntries(
      entries.concat(
        <Row key={"row" + numEntries}>
          <Col>
            <Form.Control
              placeholder="N95 Masks, Gloves, Scrubs, etc"
              required
              type="text"
              name={itemName}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Number of Items"
              required
              type="number"
              name={quantityName}
            />
          </Col>
        </Row>
      )
    );
  }

  function switchForm() {
    if (otherType === "Hospital/Clinic") {
      setOtherType("Donor");
    } else {
      setOtherType("Hospital/Clinic");
    }
    setEntries([]);
  }

  function getDonorForm() {
    return (
      <Form noValidate validated={validated} onSubmit={handleDonor}>
        <Row>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="First name" required name="first" />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Last name" required name="last" />
          </Col>
        </Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required name="city" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              required
              name="state"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control type="number" placeholder="Zip" required name="zip" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <hr></hr>
        <Row>
          <Col>
            <Form.Label>List Specific Items Are Able to Donate:</Form.Label>
            <Form.Control
              placeholder="N95 Masks, Gloves, Scrubs, etc"
              required
              type="text"
              name="item0"
            />
          </Col>
          <Col>
            <Form.Label>How Many Can You Donate?</Form.Label>
            <Form.Control
              placeholder="Number of Items"
              required
              type="number"
              name="quantity0"
            />
          </Col>
        </Row>
        {entries}
        <Button
          id="addRow"
          variant="outline-success"
          name="addRowBtn"
          onClick={addRow}
        >
          Add Row
        </Button>
        <Row>
          <Col>
            <Form.Label>What Is Your Preffered Delivery Method?</Form.Label>
            <Form.Control as="select" name="delivery">
              <option>Drop Off At Hospital/Clinic</option>
              <option>Send via Mail</option>
            </Form.Control>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email"
              required
              name="email"
              type="email"
            />
          </Col>
          <Col>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="Phone Number (optional)"
              required
              name="phone"
              type="number"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              id="passwordOne"
              name="passwordOne"
              type="password"
            />
          </Col>
          <Col>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder="Confirm Your Password"
              name="passwordTwo"
              type="password"
              placeholder="Confirm Password"
            />
          </Col>
        </Row>
        <hr></hr>
        <Button id="submitButton" name="submitButton" type="submit">
          Sign Up
        </Button>
      </Form>
    );
  }

  function getHospitalForm() {
    return (
      <Form noValidate validated={validated} onSubmit={handleHospital}>
        <Row>
          <Col>
            <Form.Label>Clinic/Hospital Name</Form.Label>
            <Form.Control placeholder="Clinic Name" required name="name" />
          </Col>
        </Row>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required name="city" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="State"
              required
              name="state"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control type="number" placeholder="Zip" required name="zip" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <hr></hr>
        <Row>
          <Col>
            <Form.Label>How Many COVID Cases Have You Received?</Form.Label>
            <Form.Control
              placeholder="Approximate Cases per Week"
              required
              type="number"
              name="cases"
            />
          </Col>
          <Col>
            <Form.Label>How Long Will Your Current PPE Stock Last?</Form.Label>
            <Form.Control
              placeholder="Number of Weeks"
              required
              type="number"
              name="weeks"
            />
          </Col>
          <Col>
            <Form.Label>How Urgently Do You Need PPE?</Form.Label>
            <Form.Control as="select" name="urgency">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </Form.Control>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>List Specific Items You Need:</Form.Label>
            <Form.Control
              placeholder="N95 Masks, Gloves, Scrubs, etc"
              required
              type="text"
              name="item0"
            />
          </Col>
          <Col>
            <Form.Label>How Many Do You Need?</Form.Label>
            <Form.Control
              placeholder="Number of Items"
              required
              type="number"
              name="quantity0"
            />
          </Col>
        </Row>
        {entries}
        <Button
          id="addRow"
          variant="outline-success"
          name="addRowBtn"
          onClick={addRow}
        >
          Add Row
        </Button>
        <hr></hr>
        <Row>
          <Col>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email"
              required
              name="email"
              type="email"
            />
          </Col>

          <Col>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="Phone Number (optional)"
              required
              name="phone"
              type="number"
            />
          </Col>
        </Row>
        <Form.Text className="text-muted">
          The contact information you provide here will be shared with potential
          donors.
        </Form.Text>
        <Row>
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              placeholder="Password"
              id="passwordOne"
              name="passwordOne"
              type="password"
            />
          </Col>
          <Col>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              placeholder="Confirm Your Password"
              name="passwordTwo"
              type="password"
              placeholder="Confirm Password"
            />
          </Col>
        </Row>
        <hr></hr>
        <Button id="submitButton" name="submitButton" type="submit">
          Sign Up
        </Button>
      </Form>
    );
  }

  if (otherType === "Donor") {
    formBody = getHospitalForm();
  } else {
    formBody = getDonorForm();
  }

  return (
    <div>
      {message}
      <Button variant="outline-info" size="lg" block onClick={switchForm}>
        Switch to {otherType} Sign Up
      </Button>
      <Card>
        <Card.Header>Sign Up</Card.Header>
        <Card.Body>{formBody}</Card.Body>
      </Card>
      <footer class="footer">
        2020 &#169; Stevens Institute of Technology
      </footer>
    </div>
  );
}

export default SignUp;
