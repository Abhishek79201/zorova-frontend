import React from "react";
import logo from "../assets/image/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div class="hero-container footer">
        <div class="row p-5">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="f_cont">
              <div class="f_logo">
                <Link to={"/"}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
              <p class="mt-5 pe-3">
                We Believe healthcare should come to you. Care that comes to you
                - at home, at work, or online Technology designed for seamless
                healthcare delivery.
              </p>
              <div class="icons"></div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="f_li">
              <h5>HOME</h5>
              <br />

              <ul>
                <Link className="text-dark  " to={"/massage"}>
                  <li>MASSAGE</li>
                </Link>
                <Link className="text-dark  " to={"/stretch"}>
                  <li>STRETCH</li>
                </Link>
                <Link className="text-dark  " to={"/fitness"}>
                  <li>
                    FITNESS AND WEIGHT
                    <br /> LOSS PROGRAM
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="f_li">
              <h5>ABOUT US</h5>
              <br />

              <ul>
                <Link className="text-dark  " to={"/business"}>
                  <li>BUSINESS</li>
                </Link>
                <Link className="text-dark  " to={"/membership"}>
                  <li>MEMBERSHIP</li>
                </Link>
                <Link
                  className="text-dark  "
                  to={"/become-a-provider"}
                >
                  <li>BECOME A PROVIDER</li>
                </Link>
                <Link className="text-dark  " to={"/contact"}>
                  <li>CONTACT</li>
                </Link>
                <Link className="text-dark  " to={"/"}>
                  <li>OWN A FRANCHIES</li>
                </Link>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-6 col-sm-12">
            <div class="f_li">
              <h5>LEGAL</h5>
              <br />
              <ul>
                <Link className="text-dark  " to={"/"}>
                  <li>TERMS & CONDITIONS</li>
                </Link>
                <Link className="text-dark  " to={"/"}>
                  <li>CANCELLATION POLICY </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="foot">
            <p>©2023 Zorova, All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
