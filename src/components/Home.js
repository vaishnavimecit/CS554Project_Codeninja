import React, { Component } from "react";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const texts = [
  {
    name: "Text 1",
    text: "ASAP Health.",
  },
  {
    name: "Text 2",
    text: "Take Action.",
  },
  {
    name: "Text 3",
    text: "Make a Difference.",
  },
];

class Home extends Component {
  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 1000,
      autoplaySpeed: 4000,
      cssEase: "linear",
      className: "slides",
    };
    return (
      <div className="App-header">
        <Slider {...settings}>
          {texts.map((text) => {
            return (
              <div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1>{text.text}</h1>
                <br></br>
                <br></br>
              </div>
            );
          })}
        </Slider>
        
      </div>
    );
  }
}
export default Home;
