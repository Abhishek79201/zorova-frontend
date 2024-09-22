import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch,useSelector } from "react-redux";
import { becomeAPartner } from "../../features/franchiseSlicer";


function Becomeapartner() {
  const dispatch=useDispatch()
  const auth = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth) {
      navigate("/");
      Swal.fire({
        icon: 'warning',
        title: 'Please Signin First!'
      });
    }
  }, []);
  
  const [partner, setPartner] = useState({ 
    fullName: "",
    dateOfBirth: "",
    contact: "",
    email: "",
    businessInfo: "",
    currentBusiness: "",
    businessExperience: "",
    proposedLocation: "",
    businessPlan: "",
    financialInfo: "",
    availableInvestment: "",
    sourceOfFunding: "",
    canBringToOurNetwork: "",
    additionalInfo: "",
       });

       const _partner = useSelector(state => state.franchise);
      console.log(_partner)
  // useEffect(() => {
  //   if (!auth) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Please Signin First!'
  //     });
  //     navigate("/");
  //   }
  // }, [auth]);

  const submitPartnerForm =()=>{
    if( partner.fullName ==""||
    partner.dateOfBirth==""||
    partner.contact==""||
    partner.email==""||
    partner.businessInfo==""){
         Swal.fire({
        icon: 'warning',
        title: 'Please fill all the required fields!'
      });
    }else{
      dispatch(becomeAPartner(partner))
    }

  }

  const onChange = (element) => {
    setPartner({ ...partner, [element.target.name]:element.target.value });
    
  }
console.log(partner,"pppppppp")
  return (
    <>
    
      <div class="container">
        <div class="row py-5">
          <div class="mem_form">
            <h2 className="text-center" >Franchise Application Form</h2>
            <p className="text-center">
              Interested in becoming a part of our franchise family?
              <br />
              We're thrilled to have you on board. Please complete the following
              form to start the application process.
            </p>
            <div class="container py-5">
              <div class="row">
                <form onSubmit={submitPartnerForm}>
                  <div class="row py-5">
                    <h4>Personal Information:</h4>
                    <div class="row py-3">
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input type="text" 
                        placeholder="Full Name*" 
                        required 
                        name="fullName"
                        onChange={onChange} 
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="date"
                          placeholder="Date of Birth*"
                          required
                          name="dateOfBirth"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Contact Number*"
                          required
                          name="contact"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="email"
                          placeholder="Email Address*"
                          required
                          name="email"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-6 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Business Info*"
                          required
                          name="businessInfo"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-6 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Current Business (if any)"
                          name="currentBusiness"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-6 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Business Experience (if any)"
                          name="businessExperience"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Proposed Location for Franchise:"
                          name="proposedLocation"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Business Plan Summary:"
                          name="businessPlan"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Financial Information:"
                          name="financialInfo"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Liquid Capital Available for Investment:"
                          name="availableInvestment"
                          onChange={onChange}
                        />
                      </p>
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <input 
                        type="text"
                         placeholder="Source of Funding:"
                         name="sourceOfFunding"
                         onChange={onChange}
                          />
                      </p>
                      <p>
                        What do you believe you can bring to our franchise
                        network?
                      </p>
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea10"
                          rows="3"
                          name="canBringToOurNetwork"
                          onChange={onChange}
                        ></textarea>
                      </p>
                    </div>

                    <h4>Additional Information:</h4>
                    <div class="row py-3">
                      <p>
                        Please provide any additional information you believe is
                        relevant to your franchise application:
                      </p>
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea22"
                          rows="3"
                          name="additionalInfo"
                          onChange={onChange}
                        ></textarea>
                      </p>
                    </div>

                    <div class="form-check pt-3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck2"
                        required

                      />
                      <label
                        class="form-check-label lab_11"
                        for="invalidCheck2"
                        
                      >
                        By submitting this application, I acknowledge that I
                        have read and agree to abide by the terms and conditions
                        of [Your Fitness Company Name] Fitness and Weight Loss
                        Program.
                      </label>
                    </div>
                  </div>
                  <div
                    class="sign_but mt-3 ms-3 ros_box"
                    onClick={submitPartnerForm}
                  >
                    <Link class="Creat_btn " to={''}>
                      Submit
                      <img src="assets/image/arrow-right.png" alt="" />
                    </Link>
                    {/* <!-- <button class="btn sign_but Creat_btn" type="submit">Submit & Pay
                            <img src="assets/image/arrow-right.png" alt="" />
                            </button> --> */}
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

export default Becomeapartner;
