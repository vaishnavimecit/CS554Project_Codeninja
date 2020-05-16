import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

import "bootstrap/dist/css/bootstrap.css";

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async handleSubmit(e) {
    e.preventDefault();

    let { name, email, subject, message } = e.target.elements;

    const templateId = "makechange";

    console.log(name.value);

    var template_params = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    var name1 = name.value;
    var mail = email.value;
    var sub = subject.value;
    var msg = message.value;

    if (
      name1 !== undefined &&
      mail !== undefined &&
      sub !== undefined &&
      msg !== undefined
    ) {
      //console.log(name1 + mail + sub + msg);

      window.emailjs
        .send("gmail", templateId, template_params)
        .then((res) => {
          console.log("Email sent successfully!!!");
        })
        .catch((err) => console.error("Failed", err));

      var success = document.getElementById("success");
      success.innerHTML =
        "Email sent successfully! You will be contacted back!!!";
    } else {
      var failure = document.getElementById("success");
      failure.innerHTML = "Please provide values!!!";
    }

    document.getElementById("contact-form").reset();
  }

  render() {
    return (
      <div className="container">
        <div className="contact">
          <Form
            id="contact-form"
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <h1 className="heading">Get In Touch</h1>
            <p id="success">
              To discuss how we can help you, please feel free to contact us
              with any questions or concerns you have!!!
            </p>

            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name here"
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email id here"
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="subject">Subject:</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter the subject"
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="message">Message:</Label>
              <Input
                type="textarea"
                id="message"
                name="message"
                placeholder="Enter your message for us"
                onChange={this.handleChange}
                required
              />
            </FormGroup>

            <Button className="cnt-btn" type="submit">
              Click me to send
            </Button>
            <br />
            <br />
          </Form>
          <a className="links" href="mailto:asaphealth576@gmail.com">
            Email
          </a>{" "}
          |{" "}
          <a
            className="links"
            href="https://www.facebook.com/wix/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>{" "}
          |{" "}
          <a
            className="links"
            href="https://twitter.com/Wix"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>{" "}
          |{" "}
          <a
            class="links"
            href="https://www.instagram.com/asap_health/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <br />
          <Button type="submit" hidden>
            Donate Now >
          </Button>
        </div>
        <footer class="footer">
          2020 &#169; Stevens Institute of Technology
        </footer>
      </div>
    );
  }
}

export default Contact;
