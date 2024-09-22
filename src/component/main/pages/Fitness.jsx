import React from "react";
import Layer_1 from "../assets/image/Layer_1.png";
import Group1 from "../assets/image/Group 114.png";
import Group2 from "../assets/image/Group 102.png";
import Group3 from "../assets/image/Group 115.png";
import Group4 from "../assets/image/Group 103.png";
import Group5 from "../assets/image/Group 116.png";
import Group6 from "../assets/image/Group 104.png";
import Group7 from "../assets/image/Group 117.png";
import Group8 from "../assets/image/Group 105.png";
import Png from "../assets/image/Png Man 1.png";
import { Link } from "react-router-dom";


function Fitness() {
  return (
    <>

      <div class="hero-container">
        <div class="massage_banner fitness_banner">
          <div class="container pt-5 pb-5">
            <div class="row pt-5 pb-5">
              <div class="col-lg-5 col-md-8 col-sm-12">
                <div class="massage_text">
                  <h1 class="fitnes_t">
                    Turning <span>Stones</span> into Stepping{" "}
                    <span>Stones</span> :
                  </h1>
                  <p>Crafting Your Path to Transformation</p>
                  
                  <Link to="/booking">
                    <button class="custom_but">Book An Appointment</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="fitness_tital">
          <h1>Step into a realm where transformation knows no limits</h1>
        </div>
        <div class="wellnes_cont">
          <div class="row m-0">
            <div class="col-lg-6 col-md-12 col-sm-12 p-0">
              <div class="wellnes_details">
                <h1>a place where we redefine wellness</h1>
                <p>
                  We understand that embarking on a weight loss journey can be
                  overwhelming, but rest assured, you're not alone. At Flexiva,
                  we're committed to guiding you step by step towards a
                  healthier, happier you.Step into a different kind of journey –
                  one that's all about reimagining what transformation can be.
                  We're not your typical fitness company; we're here to shake
                  things up. Our focus isn't only on exercise – it's on crafting
                  a plan that takes care of your whole self
                </p>
                <button class="custom_but">Join Us</button>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12 p-0">
              <div class="wellnes_miniImg">
                <img src={Layer_1} alt="Layer_1" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="row m-0 pt-5 pb-5">
          <div class="ff py-3">
            <img class="f1 " src={Group1} alt="Group1" />
            <img class="f2" src={Group2} alt="Group2" />
          </div>
          <div class="ff1 py-3">
            <img class="f1" src={Group3} alt="Group3" />
            <img class="f2" src={Group4} alt="Group4" />
          </div>
          <div class="ff py-3">
            <img class="f1" src={Group5} alt="Group5" />
            <img class="f2" src={Group6} alt="Group6" />
          </div>
          <div class="ff1 py-3">
            <img class="f1" src={Group7} alt="Group7" />
            <img class="f2" src={Group8} alt="Group8" />
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="routine">
          <h2>
            {" "}
            It's more than just a routine; it's a mix of everything that makes
            you feel amazing
          </h2>
        </div>
        <div class="routine_p">
          <p>
            We celebrate every victory, no matter how small. Our trainers guide
            you through progressive milestones, ensuring that your progress is
            consistent, sustainable, and rewarding.
          </p>
        </div>
      </div>
      <div class="hero-container">
        <div class="fit_main">
          <div class="row m-0 f_main">
            <div class="col-lg-6 p-0">
              <div class=" fit_text">
                <p>
                  Our ultimate goal isn't just weight loss; it's to empower you
                  with the tools for lifelong wellness. Together, we'll
                  cultivate habits that extend beyond the journey, ensuring you
                  stay on the path of health and vitality.
                </p>
                <p>
                  Embrace this chapter of change, where each day brings you
                  closer to your goals. We're here to support you as you rewrite
                  your story, shedding not just pounds, but limitations. Your
                  journey to weight loss and wellness begins here.
                </p>
              </div>
            </div>
            <div class="col-lg-6 p-0">
              <div class=" fit_imh">
                <img src={Png} alt="Png" />
              </div>
            </div>
          </div>
        </div>
        <div class="hero-container">
          <div class="routine">
            <h2>
              {" "}
              Join Flexiva and discover that we're not just about changing your
              body; we're about transforming your entire outlook on wellness.
            </h2>
          </div>
        </div>
      </div>
      <div class="container-fluid ps-0 pe-0">
        <div class="review_div">
          <h1>Revive Your Spark</h1>
          <Link to={"/booking"}>
            <button class="custom_but">Book An Appointment</button>
          </Link>
        </div>
      </div>
      
    </>
  );
}

export default Fitness;
