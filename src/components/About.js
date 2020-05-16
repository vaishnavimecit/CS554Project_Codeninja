import React from "react";

const About = () => {
  return (
    <div class="container">
      <div class="about">
        <h1 className="heading">Who we are?</h1>
        <p className="answer">
          Hello, we are a group of students from Stevens Institute of
          Technology. We came up with this idea of creating a web application to
          assist hospitals and clincs around the country that have been
          struggling to get PPE. The main purpose of this application is to help
          match people willing to donate any kind of protective equipment with
          medical workers who need it most during Coronavirus pandemic. Our Goal
          is very simple. To make a difference, which was our driving force to
          provide this application to the public with no fees or advertising. We
          continue to strive to make a difference anywhere we can!
        </p>
        <h1 className="heading">What we do?</h1>
        <p className="answer"> 
          This application is designed to find hospitals and clinics near you or
          anywhere around the country. Donors can sign up and add items they
          wish to donate to match you with clincs near you in need of donations.
          Hospitals and clincs can sign up and provide their conatct inforamtion
          and their needs. Our approach is driven by the need to innovate, which
          we believe can create an influx of donations to hospitals that are in
          need of protective equipment. We are a diverse group of students that
          have ranging experience from variuos industries, and continue to
          strive to make a positive change in the world through software
          engineering.
        </p>
        <h1 className="heading">Who we server?</h1>
        <p>
          <ul>
            <li>Hospitals and Clinics</li>
            <li>Pharmaceuticals</li>
            <li>Medical equipment manufacturers</li>
            <li>Health Care workers</li>
            <li>and more...</li>
          </ul>
        </p>
      </div>
      <footer class="footer">
        2020 &#169; Stevens Institute of Technology
      </footer>
    </div>
  );
};

export default About;
