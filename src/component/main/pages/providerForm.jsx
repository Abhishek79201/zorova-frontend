import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkProviderDuplicateRequest, registerProvider } from "../../features/providerSlicer";
import Swal from "sweetalert2";
import NoAccess from "./NoAccess";


function Providerform({userId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth-token");
  const isDuplicateRequest = useSelector(state => state.provider.isDuplicate);

  // console.log(isDuplicateRequest)
  
  
  useEffect(()=>{
    dispatch(checkProviderDuplicateRequest(userId))
  },[dispatch, userId])

  useEffect(() => {
    if (!auth) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Signin First!'
      });
      navigate("/");
    }
  }, [auth]);

  useEffect(()=>{
    setProvider({ ...provider, "userId": userId });
  },[userId])


  const [refrence1, setRefrence1] = useState({           
    fullName:"",
   phone:'',
   relationship:"",
  })
  const [refrence2, setRefrence2] = useState({
    fullName:"",
     phone:'',
     relationship:"",
  })

  const [provider, setProvider] = useState({ 
    userId: userId,
    certificate: "",
    yearsOfExperience: "",
    areasOfSpecialization:[],
    services:"",
    areas:"",
    aadharCard:"",
    photo:"",
      professionalRefrence1:{},
      professionalRefrence2:{},
       status: 0
       });

       

       const onChange = (element) => {
        setProvider({ ...provider, [element.target.name]: element.target.type === "file" ? element.target.files[0]:element.target.value });
        
      }

      const onChangeRefrence1 = (element) => {
        setRefrence1({ ...refrence1, [element.target.name]: element.target.value });
        setProvider({ ...provider, professionalRefrence1: refrence1 });
      }

      const onChangeRefrence2 = (element) => {
        setRefrence2({ ...refrence2, [element.target.name]: element.target.value });
        setProvider({ ...provider, professionalRefrence2: refrence2 });
      }

      const handleCreateProvider = async (event) => {
        event.preventDefault();
        console.log(provider)
        if(
          provider.userId === undefined ||
          provider.certificate === "" ||
          provider.yearsOfExperience === "" ||
          provider.areasOfSpecialization === "" ||
          provider.services === "" ||
          provider.areas === "" ||
          provider.aadharCard ==="" ||
          provider.photo === "" ||
          refrence1.fullName === "" ||
          refrence1.phone === "" ||
          refrence1.relationship === "" ||
          refrence2.fullName === "" ||
          refrence2.phone === "" ||
          refrence2.relationship === ""
        ){
          Swal.fire({
            icon: 'warning',
            title: 'Please fill all the required fields First!'
          });
        }else{
          dispatch(registerProvider(provider));
        }
 
      }

  
     
  return (
    <>
    {isDuplicateRequest?
  <NoAccess message="Your Application is already under process. " /> :  <div class="container">
  <div class="row py-5">
    <div class="mem_form">
      <h2 className="text-center">Provider Application Form</h2>
      <p className="text-center">
        Interested in joining our team of dedicated providers for massage,
        stretching, or fitness training? We're excited to have you on
        board. Please complete the following form to initiate your
        application.*
      </p>
      <div class="container py-5">
        <div class="row">
          <form onSubmit={handleCreateProvider}>
            <div class="row py-5">
              {/* <h4>Personal Information:</h4> */}
              <div class="row py-3">
                {/* <p class="col-lg-6 col-md-6 col-sm-12">
                  <input type="text" placeholder="Full Name*" required   onChange={onChange}/>
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
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input
                    type="number"
                    placeholder="Contact Number*"
                    required
                  />
                </p>
                <p class="col-lg-6 col-md-12 col-sm-12">
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                  />
                </p>
                <p></p> */}
                <h4>Personal Information:</h4>
                <p></p>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Certifications and Licenses (if applicable)
                  </label>
                  <input class="form-control" type="file" id="formFile" name="certificate"  onChange={onChange}/>
                </div>
                <p class="col-lg-12 col-md-12 col-sm-12">
                  <input
                    type="number"
                    placeholder="Years Of Experience"
                    name="yearsOfExperience"
                    onChange={onChange}
                  />
                </p>
                <p class="col-lg-12 col-md-12 col-sm-12">
                  <input
                    type="text"
                    placeholder="Areas of Specialization (e.g., Massage, Yoga, Personal Training, etc.)"
                    name="areasOfSpecialization"
                    onChange={onChange}
                  />
                </p>
                <h6>Services You Are Interested in Providing:</h6>
                <p></p>
                <p class="col-lg-12 col-md-12 col-sm-12">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea22"
                    rows="3"
                    name="services"
                    onChange={onChange}
                  ></textarea>
                </p>
                <p class="col-lg-12 col-md-12 col-sm-12">
                  <input
                    type="text"
                    name="areas"
                    placeholder="Areas or Locations Where You Prefer to Provide Services"
                    onChange={onChange}
                  />
                </p>
                <p></p>
                <h4>Professional References:</h4>
                <p></p>
                <h6>
                  Please Provide Contact Information for Two Professional
                  References
                </h6>
                <h6>Reference 1:</h6>
                <p class="col-lg-6 col-md-12 col-sm-12">
                  <input type="text" placeholder="Full Name*" name="fullName" onChange={onChangeRefrence1}/>
                </p>
                <p class="col-lg-6 col-md-12 col-sm-12">
                  <input type="number" placeholder="Contact Number*" name="phone" onChange={onChangeRefrence1}/>
                </p>
                <p class="col-lg-6 col-md-12 col-sm-12">
                  <input type="text" placeholder="Relationship to you*" name="relationship" onChange={onChangeRefrence1}/>
                </p>
                <h6>Reference 2:</h6>
                <p class="col-lg-6 col-md-12 col-sm-12">
                  <input type="text" placeholder="Full Name*" name="fullName" onChange={onChangeRefrence2}/>
                </p>
                <p class="col-lg-6 col-md-12 col-sm-12">
                  <input type="number" placeholder="Contact Number*" name="phone" onChange={onChangeRefrence2}/>
                </p>
                <p class="col-lg-6 col-md-12 col-sm-12">
                  <input type="text" placeholder="Relationship to you*" name="relationship" onChange={onChangeRefrence2}/>
                </p>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Aadhar Card:
                  </label>
                  <input class="form-control" type="file" id="formFile" name="aadharCard" onChange={onChange}/>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Photo::
                  </label>
                  <input class="form-control" type="file" id="formFile" name="photo" onChange={onChange} />
                </div>
              </div>
            </div>
            <div class="btn sign_but mt-3 ms-3 ros_box text-light" onClick={handleCreateProvider}>
                Submit
                <img src="assets/image/arrow-right.png" alt="" />
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
  }
    
    </>
  );
}

export default Providerform;
