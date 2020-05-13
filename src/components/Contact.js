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

    if (
      name != undefined &&
      email != undefined &&
      subject != undefined &&
      message != undefined
    ) {
      if (name === typeof string) {
        window.emailjs
          .send("gmail", templateId, template_params)
          .then((res) => {
            console.log("Email sent successfully!!!");
          })
          .catch((err) => console.error("Failed", err));

        document.getElementById("contact-form").reset();
        var success = document.getElementById("success");
        success.innerHTML =
          "Email sent successfully! You will be contacted back!!!";
      }
    }
  }

  render() {
    return (
      <div class="container">
        <div class="contact">
          <Form
            id="contact-form"
            onSubmit={this.handleSubmit.bind(this)}
            method="POST"
          >
            <h2 class="heading">Get In Touch</h2>
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
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                id="email"
                name="email"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="subject">Subject:</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="message">Message:</Label>
              <Input
                type="textarea"
                id="message"
                name="message"
                onChange={this.handleChange}
              />
            </FormGroup>

            <Button type="submit">Submit</Button>
            <br />
            <br />
          </Form>
          <a class="links" href="mailto:asap.health@gmail.com" target="_blank">
            Email
          </a>{" "}
          |{" "}
          <a class="links" href="https://www.facebook.com/wix/" target="_blank">
            Facebook
          </a>{" "}
          |{" "}
          <a class="links" href="https://twitter.com/Wix" target="_blank">
            Twitter
          </a>{" "}
          |{" "}
          <a
            class="links"
            href="https://www.instagram.com/wix/"
            target="_blank"
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
