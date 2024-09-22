import React from "react";
import { Link } from "react-router-dom";


function Becomemember() {
  return (
    <>
    
      <div class="container">
        <div class="row py-5">
          <div class="mem_form">
            <h2 className="text-center">Zorova Membership</h2>
            <p className="text-center">
              Please complete the following information to apply for our
              exclusive membership
            </p>
            <div class="container py-5">
              <div class="row">
                <form>
                  <div class="row py-5">
                    <h4>Personal Information:</h4>
                    <div class="row py-3">
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input type="text" placeholder="Full Name*" required />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="date"
                          placeholder="Date of Birth*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input type="text" placeholder="Gender*" required />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="email"
                          placeholder="Email Address*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-12 col-sm-12">
                        <input
                          type="number"
                          placeholder="Phone Number*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-12 col-sm-12">
                        <input
                          type="number"
                          placeholder="Alternate Phone Number*"
                          required
                        />
                      </p>
                    </div>
                    <h4>Address:</h4>
                    <div class="row py-3">
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Address line 1*"
                          required
                        />
                      </p>
                      <p class="col-lg-12 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Address line 2*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input type="text" placeholder="City*" required />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="State/Province/Region"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="number"
                          placeholder="Zip/Postal Code*"
                          required
                        />
                      </p>
                    </div>
                    <h4>Membership Type:</h4>
                    <div class="row py-3">
                      <div class="col-sm-6 my-2">
                        <div class="price_mem">
                          <div class="fit_pro">
                            <div class="">
                              <h6>Monthly Membership</h6>
                              <p>(Individual)</p>
                            </div>
                            <input
                              type="radio"
                              id="Fitness"
                              name="fav_language"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 my-2">
                        <div class="fit_pro">
                          <div class="">
                            <h6>Monthly Membership</h6>
                            <p>(Family)</p>
                          </div>
                          <input
                            type="radio"
                            id="Weightloss"
                            name="fav_language"
                            value=""
                          />
                        </div>
                      </div>
                      <div class="col-sm-6 my-2">
                        <div class="price_mem">
                          <div class="fit_pro">
                            <div class="">
                              <h6>Quarterly Membership </h6>
                              <p>(Individual)</p>
                            </div>
                            <input
                              type="radio"
                              id="Fitness"
                              name="fav_language"
                              value=""
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6 my-2">
                        <div class="fit_pro">
                          <div class="">
                            <h6>Quarterly Membership </h6>
                            <p>(Family)</p>
                          </div>
                          <input
                            type="radio"
                            id="Weightloss"
                            name="fav_language"
                            value=""
                          />
                        </div>
                      </div>
                    </div>
                    <h4>
                      Additional Family Members{" "}
                      <span className="app"> (if applicable)</span> :
                    </h4>
                    <div class="row py-3">
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="1st Person Full Name*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Date of Birth*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input type="text" placeholder="Gender*" required />
                      </p>
                    </div>
                    <div class="row py-3">
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="2nd Person Full Name"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Date of Birth*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input type="text" placeholder="Gender*" required />
                      </p>
                    </div>
                    <div class="row py-3">
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="3rd Person Full Name"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Date of Birth*"
                          required
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input type="text" placeholder="Gender*" required />
                      </p>
                    </div>
                    <h4>Preferred Location:</h4>
                    <div class="row  py-3">
                      <div class="s_form py-3">
                        <label class="form-label" for="text1">
                          Specify Preferred Location
                        </label>
                        <div class="s_qus my-1">
                          <input
                            class="form-control m-1"
                            type="text"
                            name="text"
                            id="text1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="sign_but mt-3 ms-3 ros_box"
                    
                  >
                    <Link class="Creat_btn " to={'/paymentmethod'} >
                      Submit & Pay
                      <img src="assets/image/arrow-right.png" alt="" />
                    </Link>
                   
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Becomemember;
