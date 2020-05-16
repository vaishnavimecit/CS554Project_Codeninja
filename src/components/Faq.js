import React from "react";
import "../App.css";

const Faq = () => {
  return (
    <div class="container">
      <div>
        <div>
          <h1 className="heading">Frequently Asked Questions</h1>
          <br></br>
          <h2 class="question">
            {" "}
            If I am a hospital/donor where do I sign up?
          </h2>
        </div>
        <p className="answer">
          Click the sign up link and sign up as a Donor or a Clinic
          respectively. Once you sign up, if you are looking to donate to
          hospitals near you, visit the Hospitals tab and you will be shown any
          clinics near you that have signed up with our site. Select which one
          you would like to donate to, and you will be provided with information
          on how to contact the clinic and instructions to be able to donate
          safely.
        </p>
        <br></br>
        <h2 class="question">How do I contact you?</h2>
        <p className="answer">
          {" "}
          You can contact us if you have any questions, concerns, or issues to
          raise by filling out the form under the 'Contact Us' tab. We will get
          back to you as soon as possible!
        </p>
        <br></br>
        <h2 class="question">
          Can I see which hospitals require supplies before I choose to donate
          to them?
        </h2>
        <p className="answer">
          Yes, you can click on Hospitals tab search any area by zipcode to show
          what hospitals are in the area and what supplies they are requesting
          if they have signed up with us.
        </p>
        <br></br>
        <h2 class="question">What are some items I can donate?</h2>
        <p className="answer">
          Preferred items include gloves and masks, hospitals will indicate
          which supplies they need most once you sign up.
        </p>
      </div>
      <footer class="footer">
        2020 &#169; Stevens Institute of Technology
      </footer>
    </div>
  );
};

export default Faq;
