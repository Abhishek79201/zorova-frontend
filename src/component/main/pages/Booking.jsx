import React from "react";
import { Link } from "react-router-dom";
import Vector from "../assets/image/Vector.png";
import Vector1 from "../assets/image/Vector1.png";
import Vector2 from "../assets/image/Vector2.png";


function Booking() {
  return (
    <>
    
      <div class="container">
        <div class="row py-5">
          <div class="main_booking">
            <h2>Service Booking</h2>
            <div class="boking_detail py-5">
              <div class="list_box">
                <div class="select_heading">
                  <h4>Select A Service</h4>
                </div>
                <div class="container mini_div">
        <div class="row ms-0 me-0 py-5">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <Link  to={"/booking/Massage"}> <div class="emb_large">
              <img src={Vector} alt="Vector" />
              <h4 className="text-dark">Massage</h4>
            </div></Link>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
          <Link  to={"/booking/Stretch"}><div class="emb_large">
              <img src={Vector1} alt="Vector1" />
              <h4 className="text-dark">STRETCH </h4>
          
            </div></Link>
          </div>
          <div class="col-lg-4 col-md-12 col-sm-12">
          <Link  to={"/join-program"}><div class="emb_large">
              <img src={Vector2} alt="Vector2" />
              <h5 className="text-dark">Fitness and Weight Loss programs</h5>
   
            </div></Link>
          </div>
        </div>
      </div>
                {/* <div class="list_menu   py-5">
                  <h5>Massage</h5>
                  <Link class="aftehover" to={"/appoimentForm"}>
                    <p>Natural Massage</p>
                  </Link>
                  <Link class="aftehover" to={"/appoimentForm"}>
                    <p>Chair Massage</p>
                  </Link>
                  <Link class="aftehover" to={"/appoimentForm"}>
                    <p>Deep Massage</p>
                  </Link>
                  <Link class="aftehover" to={"/appoimentForm"}>
                    <p>Medical Massage</p>
                  </Link>

                  <h5>Stretch</h5>
                  <Link class="aftehover" to={"/appoimentForm"}>
                    <p>Light Stretching</p>
                  </Link>
                  <a class="aftehover" to={"/appoimentForm"}>
                    <p>Deep Stretching</p>
                  </a>
                  <h5>Fitness & Weight Loss Program</h5>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Booking;
