import React from "react";

const About = () => {
  return (
    <div class="container">
      <div class="about">
        <h1 className="heading">Who we are?</h1>
        <p>
          Hello, we are the students of Stevens Institute of Technology. We came
          up with this idea of creating a web application to serve the hospitals
          with certain needs. The main purpose of this application is to help
          the states during COVID-19(Corona). Our Goal is very simple. To make a
          difference, which may explain why we tend to create this page. We are
          striving hard to adopt a more pivotal role in the manner in which we
          want to help the nation.
        </p>
        <h1 className="heading">What we do?</h1>
        <p>
          This can be used to find any hospitals nearby, clinical needs and for
          donations. Donors can sign up and add details about what they can
          donate. Hospitals can sign up and add their clinical needs. Our
          approach is driven by the need to innovate, which we believe can help
          create the desired multiplier effect for the hospitals. Our portfolio
          is diverse and spans both public and private sector. It includes large
          multispeciality tertiary hospitals, mid-sized single speciality
          hospitals, diagnostic service providers, primary healthcare clinics,
          and other niche service providers. We believe that quality of
          execution plays a vital role in determining the overall impact of any
          intervention.
        </p>
        <h1 className="heading">Who we server?</h1>
        <p>
          <ul>
            <li>Hospitals & Clinics</li>
            <li>Pharmaceuticals</li>
            <li>Medical equipment manufacturers</li>
            <li>Health care providers</li>
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
