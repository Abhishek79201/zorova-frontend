import React from "react";
import objects from "../assets/image/objects.png";
import objects1 from "../assets/image/object2.png";
import objects2 from "../assets/image/objects3.png";
import objects3 from "../assets/image/objects4.png";
import { Link } from "react-router-dom";


function Business() {
  return (
    <>
      <div class="hero-container">
        <div class="massage_banner buss_banner">
          <div class="container pt-5 pb-5">
            <div class="row pt-5 pb-5">
              <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="massage_text buss_text">
                  <h1>
                    Partner with Us: Expand Your
                    <br /> <span>Business</span> Horizons
                  </h1>
                  <Link to="/become-a-partner">
                    <button class="custom_but">Become a Partner</button>
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
              At Zorova, we believe that collaboration is the cornerstone of
              success. Join us in a thriving partnership that promises growth,
              innovation, and mutual success.
            </p>
          </div>
        </div>
      </div>
      <div class="container-fluid p-0">
        <div class="row m-0 pt-5">
          <div class="col-lg-6 p-0">
            <div class="buss_f_img">
              <img src={objects} alt="objects" />
            </div>
          </div>
          <div class="col-lg-6 p-0">
            <div class="buss_f_text">
              <h1>Here's how we can work together:</h1>
              <h3>Business Integration:</h3>
              <h4>Well-Being Delivered to Your Employees</h4>
              <p>
                Experience the ultimate in relaxation and productivity with
                Zorova’s on-demand massage services. Our team of fully
                qualified, licensed, and insured massage therapists is here to
                cater to your employees’ well-being, right in the comfort of
                their homes. Witness the positive transformation as your
                employees feel refreshed, focused, and valued by their employer
              </p>
              <h3>Co-Marketing Initiatives:</h3>
              <p>
                Let's maximize our reach by combining marketing efforts. Through
                co-branded campaigns and promotional activities, we can capture
                the attention of a wider audience and drive mutual growth.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid p-0">
        <div class="row m-0 pt-3">
          <div class="col-lg-6 p-0">
            <div class="buss_f_text">
              <h3>Exclusive Collaborations:</h3>
              <p>
                Be part of exclusive collaborations that elevate your brand and
                ours. Our shared ventures will showcase the best of both worlds,
                setting new standards of excellence in our respective
                industries.
              </p>
              <h3>Network Expansion:</h3>
              <p>
                Benefit from our extensive network and industry expertise. We'll
                connect you with new opportunities, potential clients, and
                valuable contacts to foster growth.
              </p>
              <h3>Innovation Hub:</h3>
              <p>
                Join us in exploring new horizons of innovation. Together, we
                can embark on research and development projects that have the
                potential to shape the future of our industries.
              </p>
              <h3>Shared Success:</h3>
              <p>
                Our commitment to mutual success means we share in the fruits of
                our labor. Let's set ambitious goals and work together to
                achieve them.
              </p>
            </div>
          </div>
          <div class="col-lg-6 p-0">
            <div class="buss_f_img">
              <img src={objects1} alt="objects1" />
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid p-0">
        <div class="row m-0 pt-3">
          <div class="col-lg-6 p-0">
            <div class="buss_f_img">
              <img src={objects2} alt="objects2" />
            </div>
          </div>
          <div class="col-lg-6 p-0">
            <div class="buss_f_text">
              <h3>HOW TO GET STARTED : </h3>
              <p>
                Ready to explore the endless possibilities of partnering with
                us? Contact our team today to discuss how we can tailor a
                collaboration that aligns with your goals and ours. Let's write
                the next chapter of success together.
              </p>
              <h3>Join the Ranks of Successful Partners: </h3>
              <p>
                Discover what it means to thrive in a collaborative ecosystem.
                Partner with Zorova and embark on a journey of innovation,
                growth, and shared success. Together, we'll redefine industry
                standards and reach new heights.
              </p>
              <Link to={'/becomeapartner'}>
                <button class="custom_but">Become a Partner</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container py-5">
        <div class="massage_banner_bg bg_col">
          <div class="container">
            <h1 class="stretchinf_bn_text">
              Own Our Franchise: The Path to Success
            </h1>
          </div>
        </div>
      </div>
      <div class="container-fluid p-0">
        <div class="row m-0 pt-5">
          <div class="col-lg-6 p-0">
            <div class="buss_f_img">
              <img src={objects3} alt="objects3" />
            </div>
          </div>
          <div class="col-lg-6 p-0">
            <div class="buss_f_text">
              <h3>
                Discover why owning a Zorova franchise is the key to your
                entrepreneurial success:
              </h3>
              <ol>
                <li>
                  <span>Proven Business Model:</span> Benefit from our
                  time-tested business model, refined for efficiency and
                  profitability.
                </li>
                <li>
                  <span>Brand Recognition:</span> Leverage the power of a
                  recognized and trusted brand to attract customers.
                </li>
                <li>
                  <span>Comprehensive Training:</span> Receive comprehensive
                  training and ongoing support to ensure you're equipped for
                  success.
                </li>
                <li>
                  <span>Exclusive Territories:</span> Secure exclusive
                  territories, giving you a competitive edge in your market.
                </li>
                <li>
                  <span>Marketing Support:</span> Access marketing tools and
                  strategies to drive customer engagement and growth.
                </li>
                <li>
                  <span>Proven Track Record:</span> join a franchise with a
                  track record of success and a thriving network of satisfied
                  owners.
                </li>
                <li>
                  <span>Profitable Industry:</span> Thrive in a lucrative
                  industry with ample opportunities for growth and expansion.
                </li>
              </ol>
              <p>
                Unlock your entrepreneurial potential with. Join us and embark
                on a journey towards financial independence and business
                excellence
              </p>
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

export default Business;
