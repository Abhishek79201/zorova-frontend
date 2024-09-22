import React from "react";
import member1 from "../assets/image/member_1.png";
import member2 from "../assets/image/member_2.png";
import icon1 from "../assets/image/icons/icon1.png";
import icon2 from "../assets/image/icons/icon2.png";
import icon3 from "../assets/image/icons/icons3.png";
import icon4 from "../assets/image/icons/icon4.png";
import { Link } from "react-router-dom";



function Membership() {



  return (
    <>
    
      <div class="hero-container">
        <div class="massage_banner mem_banner">
          <div class="container pt-5 pb-5 ">
            <div class="row pt-5 pb-5 pad_handle">
              <div class="col-lg-5 col-md-12 col-sm-12"></div>
              <div class="col-lg-7 col-md-12 col-sm-12">
                <div class="stretch_text mem_head">
                  <h1>
                    Explore Our Exclusive <span>Membership:</span>
                    Your Passport to
                    <span>Premium</span> Relaxation
                  </h1>
                  <p>
                    Experience the pinnacle of relaxation and wellness with our
                    tailored membership options, designed to cater to your
                    unique needs. Choose between our Monthly and Quarterly
                    plans, both offering a host of exceptional benefits for
                    individuals and families
                  </p>
                  <Link to="/become-a-member">
                    {" "}
                    <button class="custom_but">Become A Member</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="massage_banner_bg bg_col mem_opt">
          <div class="container">
            <h1 class="stretchinf_bn_text m-0">Membership Options</h1>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="massage_banner_bg">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="mem_mini bb">
                  <h2>Monthly Membership</h2>
                  <h6>(Individual & Family)</h6>
                  <p>
                    Enjoy flexibility with our Monthly Membership, providing
                    regular rejuvenation for you and your family
                  </p>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="mem_mini">
                  <h2>Quarterly Membership </h2>
                  <h6>(Individual & Family)</h6>
                  <p>
                    For a more extended commitment, our Quarterly Membership
                    offers enhanced savings and long-term benefits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">

    <div class="container">
        <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="mem_Sec_img">
                    <img src={member1} alt="member1"/>
                </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="mem_Sec_text ">
                    <h1>Membership Benefits</h1>
                    <div class="mini_benifit pt-3">
                        <div class="mini_benifit_img">
                            <img src={icon1} alt="icon1"/>
                        </div>
                        <div class="mini_benifit_text ">
                            <h5>Personalized Sessions</h5>
                            <p>Enjoy the luxury of personalized massage sessions, crafted to address your specific preferences and wellness goals.</p>
                        </div>
                    </div>
                    <div class="mini_benifit pt-3">
                        <div class="mini_benifit_img">
                            <img src={icon2}alt="icon2"/>
                        </div>
                        <div class="mini_benifit_text ">
                            <h5>Reduced Rates</h5>
                            <p>Enjoy the luxury of personalized massage sessions, crafted to address your specific preferences and wellness goals.</p>
                        </div>
                    </div>
                    <div class="mini_benifit pt-3">
                        <div class="mini_benifit_img">
                            <img src={icon3} alt="icon3"/>
                        </div>
                        <div class="mini_benifit_text ">
                            <h5>Priority Booking</h5>
                            <p>Enjoy the luxury of personalized massage sessions, crafted to address your specific preferences and wellness goals.</p>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    </div>


</div>
     
      <div class="hero-container py-5">
        <div class="row m-0">
          <div class="col-12 p-0">
            <div class="massage_banner_bg member_tital bg_col">
              <h1>
                Additional
                <br />
                membership details
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="member_sec_ban">
          <div class="container pt-5 pb-5">
            <div class="row">
              <div class="col-lg-4 col-md-8 col-sm-12">
                <div class="main_mem_text">
                  <div class="text_mem">
                    <h5>Location Access</h5>
                    <p>
                      Our membership grants you access to our services at every
                      location. However, please note that prices and services
                      may vary by location. Feel free to inquire for specific
                      details at each branch
                    </p>
                  </div>
                  <div class="text_mem">
                    <h5>Membership Confirmation</h5>
                    <p>
                      Membership enrollment will be confirmed through a call or
                      other suitable communication method. For further
                      information or any queries, don't hesitate to contact us.
                      Our dedicated staff will provide you with comprehensive
                      details and assistance
                    </p>
                  </div>
                  <div class="text_mem">
                    <h5>Combo Offers</h5>
                    <p>
                      We offer a variety of combo offers to enhance your
                      membership experience. Explore these exclusive packages
                      designed to cater to your unique wellness needs
                    </p>
                  </div>
                  <div class="text_mem text_mem1">
                    <h5>Family Plan</h5>
                    <p>
                      Our membership plans are flexible and can be tailored
                      according to family members. Enjoy the benefits of
                      well-being together with a plan that suits your family's
                      requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="row m-0">
          <div class="col-lg-6 col-md-6 col-sm-12 p-0">
            <div class="l_imgmem">
              <img src={member2} alt="member2" />
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12 p-0">
            <div class="l_textmem">
              <div class="container mt-3">
                <button
                  type="button"
                  class="btn mem_model_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                >
                  <div class="mem_model">
                    <h4>Membership terms & conditions</h4>
                    <div class="">
                      <img src={icon4} alt="icon4" />
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  class="btn mem_model_btn"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal1"
                >
                  <div class="mem_model">
                    <h4>cancellation policy</h4>
                    <div class="">
                      <img src={icon4} alt="icon4" />
                    </div>
                  </div>
                </button>
              </div>

              {/* <!-- The Modal --> */}
              <div class="modal" id="myModal">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div class="modal-header">
                      {/* <!-- <h4 class="modal-title">Zorova Membership Program Terms and Conditions</h4> --> */}
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div class="modal-body model_text">
                      <h3>Zorova Membership Program Terms and Conditions</h3>
                      <p>
                        Please carefully read the following terms and conditions
                        before enrolling in our membership program:
                      </p>
                      <h6>1. Variation by Location:</h6>
                      <p>
                        Prices and services offered within the membership
                        program may vary by location. Kindly consult with our
                        staff /Representative.
                      </p>

                      <h6>2. Treatment Duration:</h6>
                      <p>
                        each massage or treatment offered under the membership
                        program will be provided for the designated duration
                        period as specified at the time of booking.
                      </p>
                      <h6>3. Verification and Confirmation:</h6>
                      <p>
                        Membership benefits will be confirmed only after
                        verification of the customers. Please allow our team
                        sufficient time to verify essential details before
                        enjoying the privileges.
                      </p>
                      <h6>4. Cancellation and Rescheduling:</h6>
                      <p>
                        Cancellations and rescheduling of appointments are
                        subject to our standard policies. We request that you
                        provide adequate information to avoid any inconvenience.
                      </p>

                      <h6>5. Non-Transferable:</h6>
                      <p>
                        Membership benefits are non-transferable and may only be
                        used by the enrolled member or their designated family
                        members as specified under the Family Plan.
                      </p>

                      <h6>6. Non-Refundable:</h6>
                      <p>
                        Membership fees and payments are non-refundable. No
                        refunds or credits will be provided for unused services
                        or cancellations.
                      </p>

                      <h6>7. Privacy and Data Usage:</h6>
                      <p>
                        Any personal information provided during the membership
                        enrollment process will be handled in accordance with
                        our privacy policy.
                      </p>

                      <h6>8. Termination of Membership:</h6>
                      <p>
                        We reserve the right to terminate or suspend a
                        membership if any member violates our terms and
                        conditions or engages in inappropriate behavior/ engage
                        in illegal behavior.
                      </p>

                      <h6>9. Changes to Terms:</h6>
                      <p>
                        we may update or modify these terms and conditions from
                        time to time. We will provide information of any
                        significant changes to ensure transparency.
                      </p>

                      <h6>10. Exclusive Services and Discounts:</h6>
                      <p>
                        Membership benefits include exclusive services and
                        discounts on our regular services as specified in the
                        membership plan. Additional services or treatments not
                        covered under the membership may be offered at regular
                        rates.
                      </p>

                      <br />
                      <br />
                      <p class="main_text_m">
                        {" "}
                        By enrolling in Zorova Membership Program, you
                        acknowledge that you have read, understood, and agreed
                        to these terms and conditions.
                      </p>

                      <p class="main_text_m">
                        We are committed to providing you with a seamless and
                        rewarding wellness experience, and we appreciate your
                        adherence to these guidelines.
                      </p>
                      <p class="main_text_m">
                        If you have any questions or concerns about our
                        membership terms and conditions, please feel free to
                        contact our customer service team for assistance.
                      </p>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div class="modal-footer">
                      {/* <!-- <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> --> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- The Modal --> */}
              <div class="modal" id="myModal1">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    {/* <!-- Modal Header --> */}
                    <div class="modal-header">
                      {/* <!-- <h4 class="modal-title">Zorova Membership Program Terms and Conditions</h4> --> */}
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div class="modal-body model_text">
                      <h3>Zorova Cancellation Policy</h3>
                      <p>
                        We value your time and our commitment to providing
                        exceptional service. Please read our cancellation policy
                        carefully:
                      </p>
                      <h6>1. Cancellation Window:</h6>
                      <p>
                        You may cancel your appointment without any charge up to
                        24 hours or within 1 hour of booked preceding your
                        scheduled appointment.
                      </p>

                      <h6>2. Same-Day Cancellation:</h6>
                      <p>
                        For cancellations made on the same day as the
                        appointment, a 50% charge of the scheduled service will
                        apply.
                      </p>
                      <h6>3. Late Cancellation:</h6>
                      <p>
                        For cancellations made within two hours or after the
                        scheduled appointment time, the full price of the
                        scheduled service will be charged.
                      </p>
                      <h6>4. Cancellation Due to Natural Occurrence:</h6>
                      <p>
                        In the event of unforeseen natural occurrences, such as
                        severe weather conditions or other any other natural
                        occurrences, we will reschedule the service for a later
                        date at no additional charge.
                      </p>

                      <br />
                      <br />
                      <p class="main_text_m">
                        {" "}
                        Our cancellation policy ensures that we can efficiently
                        accommodate all our clients and manage our schedule
                        effectively. We understand that unforeseen circumstances
                        may arise, and we appreciate your understanding in
                        adhering to these guidelines.
                      </p>

                      <p class="main_text_m">
                        To cancel or reschedule an appointment, kindly contact
                        us within the stipulated time frame. Your cooperation
                        helps us maintain the quality of our services and offer
                        the best experience to all our clients.
                      </p>
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div class="modal-footer">
                      {/* <!-- <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> --> */}
                    </div>
                  </div>
                </div>
              </div>
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

export default Membership;
