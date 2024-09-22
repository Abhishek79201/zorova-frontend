import React from "react";
import Layer_1 from "../assets/image/icons/Layer_1.png";
import Layer_2 from "../assets/image/icons/Layer_2.png";
import Layer_3 from "../assets/image/icons/Layer_3.png";
import provider_1 from "../assets/image/provider_1.png";
import provider_2 from "../assets/image/provider_2.png";
import provider_3 from "../assets/image/provider_3.png";
import provider_4 from "../assets/image/provider_4.png";
import { Link } from "react-router-dom";

function BecomeProvider() {
  return (
    <>
    
      <div class="hero-container">
        <div class="massage_banner provider_banner">
          <div class="container pt-5 pb-5">
            <div class="row pt-5 pb-5">
              <div class="col-lg-5 col-md-8 col-sm-12">
                <div class="massage_text provider_text">
                  <h1>
                    Join Our Team: Work with <span>Zorova</span>{" "}
                  </h1>
                  <Link to="/onboarding">
                    <button class="custom_but">Become a Provider</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="massage_banner_bg">
          <div class="container">
            <p class="massage_banner_text">
              At Zorova, we believe that the heart of our success lies in our
              talented and dedicated team. We're always on the lookout for
              individuals who share our passion for excellence and our
              commitment to delivering exceptional products/services. If you're
              ready to embark on a journey of growth and innovation, we invite
              you to explore career opportunities with us.
            </p>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="row m-0">
          <div class="col-lg-6 col-md-12 col-sm-12 p-0">
            <div class="provider_detail">
              <h1>
                Empower Your Earnings: Join Zorova for the Best in the Industry
              </h1>
              <p>
                At Zorova, we believe you should be in control of what you
                earn. That's why we offer a payment structure that's unmatched
                in the industry. Here's why joining Zorova means unlocking your
                true earning potential:
              </p>
              <div class="empower_list">
                <div class="mem_Sec_text ">
                  <div class="empower_list_d pt-3">
                    <div class="mini_benifit_img">
                      <img src={Layer_1} alt="Layer_1" />
                    </div>
                    <div class="empower_list_text ">
                      <h5>Respect for Your Time</h5>
                      <p>
                        We value your time, and so do our clients. Late
                        cancellations of the appointment come with a fee,
                        ensuring that your schedule is respected
                      </p>
                    </div>
                  </div>
                  <div class="empower_list_d pt-3">
                    <div class="mini_benifit_img">
                      <img src={Layer_2} alt="Layer_2" />
                    </div>
                    <div class="empower_list_text ">
                      <h5>No-Hassle Payments</h5>
                      <p>
                        Say goodbye to payment hassles. Your hard-earned money
                        is deposited directly into your bank account every week,
                        like clockwork.
                      </p>
                    </div>
                  </div>
                  <div class="empower_list_d pt-3">
                    <div class="mini_benifit_img">
                      <img src={Layer_3} alt="Layer_3" />
                    </div>
                    <div class="empower_list_text ">
                      <h5>Transparent Pricing & Payment</h5>
                      <p className="pp">
                        With Zorova, there are no surprises. You'll see exactly
                        what you earn for every appointment, providing clarity
                        and peace of mind
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 p-0">
            <div class="empower_img">
              <img src={provider_1} alt="provider_1" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div
          class="massage_banner_bg mem_opt bg_col"
         
        >
          <div class="container">
            <h1 class="stretchinf_bn_text m-0">
              Explore opportunities throughout Zorova
            </h1>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="massage_banner_bg py-5">
          <div class="container">
            <div class="row">
              <div class="pro_list">
                <h4> Massage therapist</h4>
                <h4>Stretch provider</h4>
                <h4>Fitness Trainer</h4>
                <h4>Sales & Service </h4>
                <h4>Management Corporate</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="row m-0 py-5">
          <div class="safty_h">
            <h1>Zorova’s Commitment to Safety</h1>
            <p>
              At Zorova, your health and safety are paramount. We've
              implemented a multi-faceted safety framework to ensure you're
              always protected. Here's how we're dedicated to keeping you safe:
            </p>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="row m-0">
          <div class="col-lg-6 col-md-12 col-sm-12 p-0">
            <div class="provider_detail">
              <div class="empower_list">
                <div class="mem_Sec_text ">
                  <div class="empower_list_d pt-3">
                    <div class="empower_list_text ">
                      <h5>A Trust & Safety Team That's Always There: </h5>
                      <p>
                        Our dedicated Trust & Safety Team is at your service
                        whenever you're on an appointment, around the clock, 7
                        days a week, 365 days a year. They're your safety net.
                      </p>
                    </div>
                  </div>
                  <div class="empower_list_d pt-3">
                    <div class="empower_list_text ">
                      <h5>Zero Tolerance for Client Violations</h5>
                      <p>
                        We take your safety seriously. Our proactive
                        zero-tolerance policy swiftly addresses any client or
                        patient violations of Zorova’s Terms of Use.
                      </p>
                    </div>
                  </div>
                  <div class="empower_list_d pt-3">
                    <div class="empower_list_text ">
                      <h5>Real-Time, Secure Communication</h5>
                      <p>
                        Stay connected and secure with our live chat feature,
                        connecting you with Provider Support personnel whenever
                        you need assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 p-0">
            <div class="empower_img">
              <img src={provider_2} alt="provider_2" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="row m-0">
          <div class="col-lg-6 col-md-12 col-sm-12 p-0">
            <div class="empower_img1">
              <img src={provider_3} alt="provider_3" />
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 p-0">
            <div class="provider_detail">
              <div class="empower_list">
                <div class="mem_Sec_text ">
                  <div class="empower_list_d pt-3">
                    <div class="empower_list_text ">
                      <h5>Verified Client Identities</h5>
                      <p>
                        We go the extra mile to verify client identities, adding
                        an extra layer of security to your appointments.
                      </p>
                    </div>
                  </div>
                  <div class="empower_list_d pt-3">
                    <div class="empower_list_text ">
                      <h5>Continuous Vigilance for Risk Prevention</h5>
                      <p>
                        We continuously monitor and respond to potential risks,
                        ensuring your safety is never compromised.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div
          class="massage_banner_bg bg1"
        >
          <div class="container">
            <p class="massage_banner_text pp" >
              With Zorova, you're in safe hands. Our comprehensive safety
              measures are designed to provide you with peace of mind, so you
              can focus on what you do best. Your well-being is our top
              priority, always.
            </p>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="row  ms-0 me-0">
          <div class="join_h py-5">
            <h1>Join Our Team</h1>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 p-0">
            <div class="provider_type_text">
              <p>
                At Zorova, we're not just offering jobs; we're offering careers
                that allow you to thrive, grow, and make a meaningful impact.
                Join us in shaping the future of Zorova and be part of a team
                that's passionate about excellence. If you have any questions or
                need assistance with the application process, please contact our
                team. We look forward to welcoming you to the Zorova family.
              </p>
              <Link to="/onboarding">
                <button class="custom_but">Join Now</button>
              </Link>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 p-0">
            <div class="stretch_type1">
              <img src={provider_4} alt="provider_4" />
            </div>
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

export default BecomeProvider;
