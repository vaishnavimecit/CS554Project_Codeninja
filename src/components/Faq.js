import React from "react";
import "../App.css";

const Faq = () => {
  return (
    <div class="container">
      <div >
        <div>
          <br></br>
        <h2 class="question">  If I am a hospital/donor where do I sign up?</h2>
        </div>
        <h4 className="answer">
        Click the donors page, and it will take you to a form. Fill in the 
        information required in the fields, and you can see the number of hospitals 
        in the nearby area once you have filled out the form.
        </h4>
        <br></br>
        <h2 class="question">How do I contact you?</h2>
        <h4 className="answer">
        You can contact us by reaching out to the email under the contact us page.
        </h4>
        <br></br>
        <h2 class="question">Can I see which hospitals require supplies before I choose to  donate to them?</h2>
        <h4 className="answer">
        Yes you can click on Hospitals tab on home page and search the hospital you want
        </h4>
        <br></br>
        <h2 class="question">What are some items I can donate?</h2>
        <h4 className="answer">
        Preferred items include gloves and masks, hospitals will indicate which supplies they absolutley need once you sign up.
        </h4>
        
      </div>
      <footer class="footer">
        2020 &#169; Stevens Institute of Technology
      </footer>
    </div>
  );
};

export default Faq;