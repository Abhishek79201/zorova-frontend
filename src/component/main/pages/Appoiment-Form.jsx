import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import thankU from "../assets/image/thanku.png";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./slider.css"
import { useDispatch, useSelector } from "react-redux";
import { addService, getDiscount, getPrice, resetMassageState, setMassageField, setStep } from "../../features/bookingSlicer";
import { Container, Row, Col, Card } from 'react-bootstrap';
import Swal from "sweetalert2";
import { getUserData } from "../../features/userSlicer";
import { getLocations, getServicePricing } from "../../features/siteSettingsSlicer";
import { REACT_APP_BASE_URL } from "../../../config";
const session_url = localStorage.getItem("auth-token");

function AppoimentForm() {

  const { type } = useParams();
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth-token");
  const dispatch = useDispatch();

  const massageStateData = useSelector((state) => state.booking.data);
  const pricesData = useSelector((state) => state.siteSettings.prices);
  const siteSettingLoader = useSelector((state) => state.siteSettings.loading);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [serviceDuration, setServiceDuration] = useState(3600);
  const [totalPeople, setTotalPeople] = useState(1);
  // const [gender, setGender] = useState("male");
  const [bookingDate, setBookingDate] = useState("");



  useEffect(() => {
    if (!auth) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Signin First!'
      });
      navigate("/");
    }
  }, [auth]);

  // useEffect(() => {
  //   // If userStateData exists, setup the beforeunload event listener
  //   if (massageStateData) {
  //     const handleBeforeUnload = (e) => {
  //       e.preventDefault(); // Required for cross-browser compatibility
  //       e.returnValue = ''; // This message is ignored by most browsers but can be used as a fallback for older browsers
  //       return ''; // This is the actual message that will be displayed in the alert
  //     };

  //     window.addEventListener('beforeunload', handleBeforeUnload);

  //     // Clean up the event listener when the component is unmounted
  //     return () => {
  //       window.removeEventListener('beforeunload', handleBeforeUnload);
  //     };
  //   }
  // }, [massageStateData]);





  useEffect(() => {
    if (!auth) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Login First!'
      });
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    dispatch(getLocations());
    dispatch(getServicePricing());
  }, []);


  function capitalizeFirstLetter(string) {
    // Check if the string is null or undefined
    if (string === null || string === undefined) {
      return ''; // Or handle it in a way that makes sense for your application
    }

    // Ensure the string has at least one character
    if (string.length === 0) {
      return string;
    }

    // Capitalize the first letter
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const data = [
    {
      "_id": "65bef2210abc330ecb4b638b",
      "category": "Massage",
      "subCategory": "Medical Massage",
      "serviceName": "Medical Massage",
      "price": 200,
      "state": "Bihar",
      "city": "Seohar",
      "duration": 45,
      "discount": 20,
      "transportation": 10,
      "GST": 0,
      "otherExpense": 0,
      "__v": 0
    },
    {
      "_id": "65bef2b10abc330ecb4b6390",
      "category": "Massage",
      "state": "Bihar",
      "subCategory": "Deep Massage",
      "serviceName": "Deep Massage",
      "price": 200,
      "city": "Seohar",
      "duration": 60,
      "discount": 20,
      "transportation": 10,
      "GST": 10,
      "otherExpense": 5,
      "__v": 0
    },
    {
      "_id": "65bef3c4e2c6d39be009a181",
      "category": "Stretch",
      "state": "Bihar",
      "subCategory": "Deep Stretching",
      "serviceName": "Deep Stretching",
      "price": 500,
      "city": "Seohar",
      "duration": 45,
      "discount": 50,
      "transportation": 10,
      "GST": 0,
      "otherExpense": 0,
      "__v": 0
    },
    {
      "_id": "65befe9920f616f1a0154298",
      "category": "Massage",
      "state": "Bihar",
      "subCategory": "Chair Massage",
      "serviceName": "SomeServiceType",
      "price": 100,
      "city": "Seohar",
      "duration": 60,
      "discount": 10,
      "transportation": 10,
      "GST": 5,
      "otherExpense": 20,
      "__v": 0
    },
    {
      "_id": "65cabb9a2f3a070dc06cb575",
      "category": "Massage",
      "state": "Bihar1",
      "subCategory": "Chair Massage",
      "serviceName": "Chair Massage-Seohar-45",
      "price": 16,
      "city": "Muzafarpur1",
      "duration": 45,
      "discount": 0,
      "transportation": 0,
      "GST": 0,
      "otherExpense": 0,
      "__v": 0
    },
    {
      "_id": "65e6f74da7df368448f09b12",
      "category": "Massage",
      "state": "Bihar",
      "subCategory": "Natural Massage",
      "serviceName": "Natural Massage",
      "price": 100,
      "city": "Muzafarpur",
      "duration": 60,
      "discount": 0,
      "transportation": 5,
      "GST": 5,
      "otherExpense": 5,
      "__v": 0
    },
    {
      "_id": "665063d86754586b9982ea45",
      "category": "Massage",
      "state": "Bihar1",
      "subCategory": "Natural Massage",
      "serviceName": "Natural ",
      "price": 350,
      "city": "Muzaffarpur1",
      "duration": 45,
      "discount": 0,
      "transportation": 10,
      "GST": 10,
      "otherExpense": 10,
      "__v": 0
    },
    {
      "_id": "6660181518803a3baa7875ed",
      "category": "Massage",
      "state": "Bihar1",
      "subCategory": "Natural Massage",
      "serviceName": "Natural  3",
      "price": 300,
      "city": "Muzaffarpur1",
      "duration": 45,
      "discount": 0,
      "transportation": 10,
      "GST": 10,
      "otherExpense": 16,
      "__v": 0
    }
  ];

  const massageData = [...new Set(
    pricesData?.filter(item => item.category === "Massage")
      .map(item => item.subCategory)
  )];

  const stretchData = [...new Set(
    pricesData?.filter(item => item.category === "Stretch")
      .map(item => item.subCategory)
  )];

  console.log(massageData);
  console.log(stretchData);

  const MassageOptions = [
    {
      title: "Natural Massage",
      imageSrc:
        "https://assets.zeel.com/web/images/massages/service-swedish.svg",
      description:
        "Perfect for relaxation, with pressure designed to your comfort to reduce tension.",
      icon: "Stress Relief",
    },
    {
      title: "Chair Massage",
      imageSrc:
        "https://assets.zeel.com/web/images/massages/service-deep-tissue.svg",
      description:
        "Effective work to reduce tightness, tension, and increase range of motion.",
      icon: "Medium Pressure",
    },
    {
      title: "Deep Massage",
      imageSrc:
        "https://assets.zeel.com/web/images/massages/service-prenatal.svg",
      description:
        "Ideal for easing stress on joints and improving sleep quality before or after birth.",
      icon: "Comfort",
    },
    {
      title: "Medical Massage",
      imageSrc:
        "https://assets.zeel.com/web/images/massages/service-prenatal.svg",
      description:
        "Ideal for easing stress on joints and improving sleep quality before or after birth.",
      icon: "Comfort",
    },
  ];
  const StretchOptions = [
    {
      title: "Light Stretching",
      imageSrc:
        "https://assets.zeel.com/web/images/massages/service-swedish.svg",
      description:
        "Perfect for relaxation, with pressure designed to your comfort to reduce tension.",
      icon: "Stress Relief",
    },
    {
      title: "Deep Stretching",
      imageSrc:
        "https://assets.zeel.com/web/images/massages/service-deep-tissue.svg",
      description:
        "Effective work to reduce tightness, tension, and increase range of motion.",
      icon: "Medium Pressure",
    },
  ];

  let treatmentOptions = [];
  if (type === "Massage") {
    // treatmentOptions = MassageOptions;
    treatmentOptions = massageData;
  } else if (type === "Stretch") {
    // treatmentOptions = StretchOptions;
    treatmentOptions = stretchData;

  }

  const handleTreatmentSelect = (treatment) => {
    dispatch(resetMassageState());
    setSelectedTreatment(treatment);
    // if (index === 1) {
    //   setServiceDuration(2700)
    // } else {
    //   setServiceDuration(3600)
    // }
    dispatch(setMassageField({ serviceType: treatment, service: type }));
  };


  // const [step, setStep] = useState(0);
  const step = useSelector((state) => state.booking.step);
  const [hideButton, setHideButton] = useState(0);

  const step_form = step + 1;

  const Form = () => {
    if (step == 0) {
      return <Login />;
    } else if (step == 1) {
      return <Contact />;
    } else if (step == 2) {
      return <Social />;
    } else if (step == 3) {
      return <SecLast />;
    }
    // else if (step == 4) {
    //   return <Welcome />;
    // }
  };
  const Login = () => {

    const dispatch = useDispatch();
    const massageStateData = useSelector((state) => state.booking.data);
    const [massage, setMassage] = useState({ duration: massageStateData.duration || 0, peoples: massageStateData.peoples || 1, gender: massageStateData.gender || "male" });
    const selectedCategoryDurations = [...new Set(pricesData?.filter(item => item.subCategory === selectedTreatment).map(item => item.duration))];
    const onChange = (element) => {
      if (element.target.name == "duration" || element.target.name == "peoples") {
        if (typeof element.target.value === 'string') {
          let value = parseInt(element.target.value, 10); // Convert string to integer
          setMassage({ ...massage, [element.target.name]: value });
        }

      } else {
        setMassage({ ...massage, [element.target.name]: element.target.value });

      }
    }



    return (
      <>
        {siteSettingLoader ? "loading..." :
          <>
            <div className="form_body">
              <div className="header_form">
                <h4>Service Booking</h4>
              </div>
              <div className="form_data">
                <div className="container">
                  <div class="row py-5">
                    <h4 className="text-center">{type} Detail</h4>

                    <div className="container mt-3">
                      <label className="h5">Choose a treatment</label>
                      <div className="row">
                        {treatmentOptions.map((treatment, index) => (
                          <div key={index} className={`col-md-3 mb-3 `}>
                            <div
                              className={`card ${selectedTreatment === treatment
                                ? "border border-primary"
                                : ""
                                }`}
                              onClick={() => handleTreatmentSelect(treatment)}
                            >
                              <div className="card-body">
                                {/* <div className="text-center">
                              <img src={treatment.imageSrc} alt={treatment.title} className="img-fluid mb-3" />
                            </div> */}
                                <h5 className="card-title">{treatment}</h5>
                                {/* <p className="card-text">{treatment.description}</p> */}
                                {/* <div className="text-center">
                              <img src={treatment.icon} alt={treatment.icon} />
                              <div className="mt-2">{treatment.icon}</div>
                            </div> */}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedTreatment !== null && (
                        <div className="mt-3">
                          {/* Display additional data for the selected treatment */}
                          {/* <h5>{MassageOptions[selectedTreatment].title} Details</h5>
                      <p>{MassageOptions[selectedTreatment].description}</p> */}
                          <div class="row py-5">
                            <div class="col-lg-6 col-md-6 col-sm-12 py-3">
                              <h5>
                                Duration for{" "}
                                {selectedTreatment}?
                              </h5>
                              <div className="btn-group col-xs-12">
                                {selectedCategoryDurations.map((item, index) => (
                                  <label key={index} className="option">
                                    <input onChange={onChange} value={item * 60} className="inp" type="radio" name="duration" checked={massage.duration === item * 60} />
                                    <span className="btn btn-outline-secondary btn-option text-dark">
                                      {item}
                                    </span>
                                  </label>
                                ))}
                              </div>


                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12  py-3">
                              <h5>How Many People?</h5>
                              <div class="btn-group col-xs-12">
                                <label class="option">
                                  <input
                                    class="inp"
                                    type="radio"
                                    name="peoples"
                                    value={1}
                                    checked={massage.peoples === 1}
                                    onChange={onChange}
                                  />
                                  <span class="btn btn-outline-secondary btn-option text-dark">
                                    One
                                  </span>
                                </label>
                                <label class="option">
                                  <input
                                    class="inp"
                                    type="radio"
                                    name="peoples"
                                    value={2}
                                    checked={massage.peoples === 2}
                                    onChange={onChange}
                                  />
                                  <span class="btn btn-outline-secondary btn-option text-dark">
                                    Two
                                  </span>
                                </label>
                                <label class="option">
                                  <input
                                    class="inp"
                                    type="radio"
                                    name="peoples"
                                    value={3}
                                    checked={massage.peoples === 3}
                                    onChange={onChange}
                                  />
                                  <span class="btn btn-outline-secondary btn-option text-dark">
                                    Three
                                  </span>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12  py-3">
                              <h5>Who is this massage for?</h5>
                              <div class="btn-group col-xs-12">
                                <label class="option">
                                  <input
                                    class="inp"
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={massage.gender === "male"}
                                    onChange={onChange}
                                  />
                                  <span class="btn btn-outline-secondary btn-option text-dark">
                                    Male
                                  </span>
                                </label>
                                <label class="option">
                                  <input
                                    class="inp"
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={massage.gender === "female"}
                                    onChange={onChange}
                                  />
                                  <span class="btn btn-outline-secondary btn-option text-dark">
                                    Female
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* Add more details as needed */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer_form">
              <button
                type="button"
                onClick={() => {
                  if (massage.duration == 0) {
                    Swal.fire({
                      icon: 'error',
                      title: 'error',
                      text: 'Please select duration!'
                    });
                    return;
                  } else {
                    dispatch(setStep(step + 1));
                    dispatch(setMassageField(massage));
                  }
                }}
              >
                Next
              </button>
            </div>
          </>
        }

      </>
    );
  };

  const Contact = () => {
    const [emptyFields, setEmptyFields] = useState([]);
    const massageStateData = useSelector((state) => state.booking.data);
    const loggedInUser = useSelector((state) => state.user.data)
    const [massage, setMassage] = useState({ fullName: massageStateData?.fullName || loggedInUser?.fullName, addressLine1: massageStateData?.addressLine1 || loggedInUser?.addressLine1, phone: massageStateData.phone || loggedInUser?.phone, addressLine2: massageStateData.addressLine2 || loggedInUser?.addressLine2, city: massageStateData.city || "", state: massageStateData.state || "", zipCode: massageStateData.zipCode || "", country: "India" || "" });
    console.log(massageStateData)
    const locationsStateData = useSelector((state) => state.siteSettings.locations);
    // const uniqueStates = [...new Set(locationsStateData?.map(item => item.state))];
    const uniqueStates = [...new Set(pricesData?.filter(item => item.subCategory === massageStateData.serviceType).map(item => item.state))];

    const [selectedState, setSelectedState] = useState("Bihar");
    const [errorMessage, setErrorMessage] = useState('');


    const onChange = (element) => {
      setMassage({ ...massage, [element.target.name]: element.target.value });
    }

    // Function to get the cities of the selected state
    const getCitiesBySelectedState = () => {
      const selectedStateData = pricesData?.filter(item => item.state === massage.state && item.subCategory === massageStateData.serviceType);
      return [...new Set(selectedStateData.map(item => item.city))];
    };


    return (
      <>
        <div className="form_body">
          <div className="header_form pt-3">
            <h4>Personal Details</h4>
            {/* <span>{step_form}</span> */}
          </div>
          <form className="form_data"  >
            <div className="container">
              <div class="row py-5">
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input value={massage.fullName} name="fullName" onChange={onChange} type="text" placeholder="Full Name*" required />
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input
                    value={massage.phone}
                    onChange={onChange}
                    onBlur={(e) => {
                      const regex = /^91\d{10}$/; // Regex pattern for Indian phone number starting with '91' followed by 10 digits
                      const { value } = e.target;
                      if (regex.test(value)) {
                        setErrorMessage('');
                      } else {
                        setErrorMessage('Invalid phone number format. It should be 91 followed by 10 digits.');
                      }
                    }}
                    style={{ borderColor: emptyFields.includes('phone') || errorMessage ? 'red' : '' }}
                    type="tel"
                    name="phone"
                    placeholder="Mobile # 91xxxxxxxxxxx"
                    required
                  />
                  {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                </p>

                <p class="col-lg-12 col-md-12 col-sm-12">
                  <input value={massage.addressLine1} onChange={onChange} style={{ borderColor: emptyFields.includes("addressLine1") ? "red" : "" }} type="text" name="addressLine1" placeholder="Address line 1*" required />
                </p>
                <p class="col-lg-12 col-md-6 col-sm-12">
                  <input value={massage.addressLine2} onChange={onChange} type="text" name="addressLine2" placeholder="Address line 2*" required />
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <select
                    placeholder="State/Province/Region"
                    required
                    name="state"
                    value={massage.state}
                    onChange={onChange}
                    style={{ borderColor: emptyFields.includes("state") ? "red" : "" }}
                  >
                    <option value="" selected disabled hidden>State/Province/Region</option>
                    {uniqueStates.map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                    {/* <option value={"bihar"}>Bihar</option> */}
                  </select>
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  {/* <input type="text" placeholder="City*" required /> */}
                  <select
                    required
                    name="city"
                    value={massage.city}
                    onChange={onChange}
                    style={{ borderColor: emptyFields.includes("city") ? "red" : "" }}
                  >
                    <option value="" selected disabled hidden>City*</option>
                    {getCitiesBySelectedState().map((city, index) => (
                      <option key={index} value={city}>{city}</option>
                    ))}
                  </select>
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input value={massage.zipCode} onChange={onChange} style={{ borderColor: emptyFields.includes("zipCode") ? "red" : "" }} name="zipCode" type="text" placeholder="Zip/Postal Code*" required />
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input value={"India"} onChange={onChange} disabled={true} name="country" type="text" placeholder="Country*" />
                </p>

              </div>
            </div>
          </form>
        </div>
        <div className="footer_form">
          <button
            onClick={() => {
              dispatch(setStep(step - 1));
            }}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              const requiredFields = ["country", "phone", "addressLine1", "state", "city", "zipCode"];
              const empty = requiredFields.filter(field => !massage[field]);
              setEmptyFields(empty);

              if (empty.length === 0 && !errorMessage) {
                dispatch(setMassageField(massage));
                dispatch(getPrice({ persons: massageStateData.peoples, duration: massageStateData.duration / 60, serviceType: massageStateData.serviceType, city: massage.city })).then((res) => {
                  if (res.error) {
                    // dispatch(setStep(step - 1));
                  } else {
                    dispatch(setStep(step + 1));
                  }
                });

              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'error',
                  text: 'Please fill all required fields!'
                });
              }

            }}
          >
            Next
          </button>
        </div>
      </>
    );
  };


  // const Social = () => {
  //   const initialStartTime = 600; // Initial start time set to 10:00 AM
  //   const minDifference = massageStateData.duration / 60; // Minimum time difference (in minutes)
  //   const maxDifference = massageStateData.duration / 60; // Maximum time difference (in minutes)

  //   const [sliderValues, setSliderValues] = useState([0, 0]);

  //   useEffect(() => {
  //     if (sliderValues[0] === 0 && sliderValues[1] === 0) {
  //       const currentTime = new Date();
  //       const currentHours = currentTime.getHours();
  //       const currentMinutes = currentTime.getMinutes();
  //       const totalCurrentMinutes = currentHours * 60 + currentMinutes;
  //       const totalEndMinutes = totalCurrentMinutes + minDifference;
  //       setSliderValues([totalCurrentMinutes, totalEndMinutes]);
  //     }
  //   }, [sliderValues]);

  //   const formatTime = (value) => {

  //     const hours = Math.floor(value / 60);
  //     const minutes = value - hours * 60;

  //     let formattedHours = hours.toString().padStart(2, '0');
  //     let formattedMinutes = minutes.toString().padStart(2, '0');

  //     if (hours >= 12) {
  //       formattedHours = hours === 12 ? hours : hours - 12;
  //       formattedMinutes += ' PM';
  //     } else {
  //       formattedHours = hours === 0 ? 12 : hours;
  //       formattedMinutes += ' AM';
  //     }

  //     return `${formattedHours}:${formattedMinutes}`;

  //   };

  //   const handleSliderChange = (values) => {
  //     // console.log(values);
  //     const [start, end] = values;
  //     if (start < initialStartTime) {
  //       setSliderValues([initialStartTime, initialStartTime + minDifference]);
  //     }
  //     else if (end - start < minDifference || end - start > maxDifference) {
  //       setSliderValues([start, start + minDifference]);
  //     } else {
  //       setSliderValues(values);
  //     }

  //   };

  //   const getCurrentDate = () => {
  //     const today = new Date();
  //     const year = today.getFullYear();
  //     const month = (today.getMonth() + 1).toString().padStart(2, '0');
  //     const day = today.getDate().toString().padStart(2, '0');
  //     return `${year}-${month}-${day}`;
  //   };


  //   return (
  //     <>
  //       <div className="form_body">
  //         <div className="header_form py-3">
  //           <h4>Pick a Date & Time</h4>
  //           {/* <span>{step_form}</span> */}
  //         </div>
  //         <div className="form_data">
  //           <div className="container">
  //             <div class="row">
  //               <div class="timg_div">
  //                 <div class="month">
  //                   <div class="sd-container">
  //                     <input class="sd ssd" type="date" onChange={(e) => setBookingDate(e.target.value)} value={bookingDate} name="selected_date" min={getCurrentDate()}
  //                     />
  //                     <span class="open-button">
  //                       <button type="button"></button>
  //                     </span>
  //                   </div>
  //                 </div>

  //                 <h3 class="start mt-4">Start by - Finish by</h3>
  //                 <h3 className="start slider-time">
  //                   <span id="startTime">{formatTime(sliderValues[0])}</span> - <span id="endTime">{formatTime(sliderValues[1])}</span>
  //                 </h3>
  //                 <div class="progras">
  //                   {/* <!-- <img src="assets/image/progress.png" alt=""> --> */}
  //                   <div className="slider-container py-3">
  //                     <Slider
  //                       min={initialStartTime}
  //                       max={1200}
  //                       step={15}
  //                       range
  //                       draggableTrack
  //                       onBeforeChange={() => true}
  //                       // marks={{ [initialStartTime]: '10:00 AM', 1440: '12:00 AM' }}
  //                       value={sliderValues}
  //                       onChange={handleSliderChange}
  //                     />

  //                     <div className="slider-time2">

  //                     </div>
  //                   </div>

  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="footer_form">
  //         <button
  //           onClick={() => {
  //             dispatch(setStep(step - 1));
  //           }}
  //         >
  //           Previous
  //         </button>
  //         <button
  //           type="button"
  //           onClick={() => {
  //             const startTimeElement = document.getElementById("startTime");
  //             const endTimeElement = document.getElementById("endTime");

  //             const startTimeText = startTimeElement ? startTimeElement.textContent.trim() : "";
  //             const endTimeText = endTimeElement ? endTimeElement.textContent.trim() : "";

  //             const time = `${startTimeText} - ${endTimeText}`;

  //             if (bookingDate) {
  //               dispatch(setMassageField({
  //                 date: bookingDate,
  //                 start_time: startTimeText,
  //                 end_time: endTimeText
  //               }));
  //               dispatch(setStep(step + 1));
  //             } else {
  //               Swal.fire({
  //                 icon: 'error',
  //                 title: 'error',
  //                 text: 'Please Enter Date First!'
  //               });
  //             }


  //           }}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </>
  //   );
  // };

  const Social = () => {
    const initialStartTime = 600; // Initial start time set to 10:00 AM
    const minDifference = massageStateData.duration / 60; // Minimum time difference (in minutes)
    const maxDifference = massageStateData.duration / 60; // Maximum time difference (in minutes)
    const [sliderValues, setSliderValues] = useState([0, 0]);
    const [bookingDate, setBookingDate] = useState('' || massageStateData.date);
    const dispatch = useDispatch();

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    useEffect(() => {
      if (sliderValues[0] === 0 && sliderValues[1] === 0) {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const totalCurrentMinutes = currentHours * 60 + currentMinutes;
        const fourHoursLater = totalCurrentMinutes + 240;
        const totalEndMinutes = fourHoursLater + minDifference;
        setSliderValues([fourHoursLater, totalEndMinutes]);
      }
    }, [sliderValues, minDifference]);

    useEffect(() => {
      if (bookingDate === getCurrentDate()) {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const totalCurrentMinutes = currentHours * 60 + currentMinutes;
        const fourHoursLater = totalCurrentMinutes + 240;
        const totalEndMinutes = fourHoursLater + minDifference;
        setSliderValues([fourHoursLater, totalEndMinutes]);
      } else {
        setSliderValues([initialStartTime, initialStartTime + minDifference]);
      }
    }, [bookingDate, minDifference]);

    const formatTime = (value) => {
      const hours = Math.floor(value / 60);
      const minutes = value - hours * 60;
      let formattedHours = hours.toString().padStart(2, '0');
      let formattedMinutes = minutes.toString().padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      formattedHours = hours > 12 ? hours - 12 : hours;
      formattedHours = formattedHours === 0 ? 12 : formattedHours;
      return `${formattedHours}:${formattedMinutes} ${period}`;
    };

    const handleSliderChange = (values) => {
      const [start, end] = values;
      const currentTime = new Date();
      const totalCurrentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
      const fourHoursLater = totalCurrentMinutes + 240;

      if (bookingDate === getCurrentDate() && start < fourHoursLater) {
        setSliderValues([fourHoursLater, fourHoursLater + minDifference]);
      } else if (start < initialStartTime) {
        setSliderValues([initialStartTime, initialStartTime + minDifference]);
      } else if (end > 1200) {
        setSliderValues([start, 1200]);
      } else if (end - start < minDifference || end - start > maxDifference) {
        setSliderValues([start, start + minDifference]);
      } else {
        setSliderValues(values);
      }
    };

    return (
      <>
        <div className="form_body">
          <div className="header_form py-3">
            <h4>Pick a Date & Time</h4>
          </div>
          <div className="form_data">
            <div className="container">
              <div className="row">
                <div className="timg_div">
                  <div className="month">
                    <div className="sd-container">
                      <input
                        className="sd ssd"
                        type="date"
                        onChange={(e) => setBookingDate(e.target.value)}
                        value={bookingDate}
                        name="selected_date"
                        min={getCurrentDate()}
                      />
                      <span className="open-button">
                        <button type="button"></button>
                      </span>
                    </div>
                  </div>
                  <h3 className="start mt-4">Start by - Finish by</h3>
                  <h3 className="start slider-time">
                    <span id="startTime">{ sliderValues[1]<=1200 ? formatTime(sliderValues[0]): ""}</span> - <span id="endTime">{sliderValues[1]<=1200 ? formatTime(sliderValues[1]):"Time Not Available"}</span>
                  </h3>
                  <div className="progras">
                    <div className="slider-container py-3">
                      <Slider
                        min={initialStartTime}
                        max={1200}
                        step={15}
                        range
                        draggableTrack
                        onBeforeChange={() => true}
                        value={sliderValues}
                        onChange={handleSliderChange}
                      />
                      <div className="slider-time2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_form">
          <button onClick={() => dispatch(setStep(step - 1))}>Previous</button>
          <button
            type="button"
            onClick={() => {
              if (sliderValues[1] > 1200) {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Please select time between 10:00 AM to 8:00 PM on specific date!'
                });
                return;
              } else {
                const startTimeElement = document.getElementById("startTime");
                const endTimeElement = document.getElementById("endTime");
                const startTimeText = startTimeElement ? startTimeElement.textContent.trim() : "";
                const endTimeText = endTimeElement ? endTimeElement.textContent.trim() : "";
                const time = `${startTimeText} - ${endTimeText}`;
                if (bookingDate) {
                  dispatch(setMassageField({
                    date: bookingDate,
                    start_time: startTimeText,
                    end_time: endTimeText
                  }));
                  dispatch(setStep(step + 1));
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please Enter Date First!'
                  });
                }
              }

            }}
          >
            Next
          </button>
        </div>
      </>
    );
  };

  const SecLast = () => {
    const massageStateData = useSelector((state) => state.booking.data);
    const priceData = useSelector((state) => state.booking.priceData);
    const [referralCode, setReferralCode] = useState(localStorage.getItem('referralCode') || null);

    const [priceD, setPriceD] = useState(priceData || {});
    const [code, setCode] = useState("");
    const startTimeElement = document.getElementById("startTime");
    const endTimeElement = document.getElementById("endTime");

    const startTimeText = startTimeElement ? startTimeElement.textContent.trim() : "";
    const endTimeText = endTimeElement ? endTimeElement.textContent.trim() : "";

    const time = `${startTimeText} - ${endTimeText}`;

    if (priceD.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Service not available!`
      })
      dispatch(setStep(step - 1));
    }
    useEffect(() => {
      if (priceData) {
        setPriceD(priceData);
      }
    }, [priceData]);

    const selectedOptions = {
      date: bookingDate,
      time: `${massageStateData.start_time} - ${massageStateData.end_time}`,
      // time: `${document.getElementById("startTime").textContent.trim()} - ${document.getElementById("endTime").textContent.trim()}`,
      duration: `${massageStateData.duration / 60} m`,
      type: massageStateData.service,
      serviceType: massageStateData.serviceType,
      gender: capitalizeFirstLetter(massageStateData.gender),
      totalPeople: massageStateData.peoples,
      name: `${massageStateData.fullName}`,
      address: `${massageStateData.addressLine1}, ${massageStateData.addressLine2}, ${massageStateData.state} - ${massageStateData.zipCode} `,
      city: massageStateData.city,
      country: massageStateData.country,
      phone: massageStateData.phone,
      cost: priceD.cost,

      // Add more details as needed
    };


    // payment Gateway Code Integration

    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
      const loadRazorpayScript = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;

        script.onload = () => {
          setScriptLoaded(true);
        };

        document.body.appendChild(script);
      };

      loadRazorpayScript();
    }, []);



    const checkoutHandler = async (amount, id) => {
      if (scriptLoaded) {
        // Make a GET request with headers
        const { data: { key } } = await axios.get(`${REACT_APP_BASE_URL}/api/getkey`, {
          headers: {
            'Authorization': `Bearer ${session_url}`
          }
        });

        console.log(key);

        // Make a POST request with headers
        const { data: { order } } = await axios.post(`${REACT_APP_BASE_URL}/api/checkout`, {
          amount
        }, {
          headers: {
            'Authorization': `Bearer ${session_url}`
          }
        });

        console.log("id coming in checkout handler: ", id);
        const options = {
          key,
          amount: order.amount,
          currency: "INR",
          name: `Zorova`, // service name - duration
          description: `${massageStateData.serviceType}-${massageStateData.duration}`, // details 
          image: "https://avatars.githubusercontent.com/u/25058652?v=4",  // avatar update
          order_id: order.id,
          callback_url: `${REACT_APP_BASE_URL}/api/paymentverification?id=${id}`, // env file mai
          prefill: {  // temporary
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9999999999"
          },
          notes: { // address update Zorova
            "address": "Zorova India"
          },
          theme: { // update color
            "color": "#121212"
          }
        };
        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        console.error('Failed to load Razorpay script');
      }
      // razor.createPayment(options)

    }

    return (
      <>
        <div className="form_body">
          <div className="header_form py-3">
            {/* <h4>Summary</h4> */}
            {/* <span>{step_form}</span> */}
          </div>
          <Container>
            <Row>
              <Col md={6}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{ color: '#50289A' }} >Order Summary</Card.Title>
                    <Card.Text>
                      <strong>Date:</strong> {selectedOptions.date}
                      <br />
                      <strong>Time:</strong> {selectedOptions.time}
                      <br />
                      <strong>Duration:</strong> {selectedOptions.duration}
                      <br />
                      <strong>Total Person:</strong> {selectedOptions.totalPeople}
                      <br />
                      <strong>Treatment Type:</strong> {selectedOptions.serviceType}
                      <br />
                      <strong>Gender:</strong> {selectedOptions.gender}
                      <br />
                      <strong>Referral:</strong> {referralCode ? referralCode : "N/A"}
                      <br />
                      {/* <strong>
                        Cost: <span style={{ fontSize: '1em' }}>{selectedOptions.cost}</span>
                      </strong> */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card >
                  <Card.Body >
                    <Card.Title style={{ color: '#50289A' }}>Contact Information</Card.Title>
                    <Card.Text>
                      <strong>Name:</strong> {selectedOptions.name}
                      <br />
                      <strong>Address:</strong> {selectedOptions.address}
                      <br />
                      <strong>Phone:</strong> {selectedOptions.phone}
                      <br />
                      <strong>City:</strong> {selectedOptions.city}
                      <br />
                      <strong>Country:</strong> {selectedOptions.country}
                      <br />
                      <br />

                      {/* Add more details as needed */}
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>
              <Col md={6} className="py-4" >
                <Card>
                  <Card.Body>
                    <Card.Title style={{ color: '#50289A' }} >Promotional Discount</Card.Title>
                    <Card.Text>
                      <div className="mb-3">
                        <label>Referral Code</label>
                        <div className="input-group is-invalid">
                          <input type="text" className="form-control border-left-0" value={referralCode} required name='voucherCode' onChange={(e) => { setReferralCode(e.target.value) }} />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label>Voucher Code</label>
                        <div className="input-group is-invalid">

                          <input type="text" className="form-control border-left-0" required name='voucherCode' onChange={(e) => { setCode(e.target.value) }} />
                          <div className="input-group-prepend">
                            <button className="btn btn-primary"
                              onClick={() => {
                                dispatch(getPrice({ persons: massageStateData.peoples, duration: massageStateData.duration / 60, serviceType: massageStateData.serviceType, city: massageStateData.city, code: code })).then(async (result) => {
                                  if (!result.error) {
                                    console.log("good");
                                    // if(result.payload.discountType=="Percentage"){
                                    //     const discountedPrice=Math.floor(priceD.netAmount*(result.payload.amount/100));
                                    //     await setPriceD(prevState => ({ ...prevState, discount: discountedPrice }));
                                    //     await setPriceD(prevState => ({ ...prevState, netAmount: Math.floor(priceD.netAmount-discountedPrice) }));
                                    //     await setPriceD(prevState => ({ ...prevState, GST: Math.floor(priceD.netAmount*(priceD.gstPercentage/100))}));
                                    //     await setPriceD(prevState => ({ ...prevState, totalAmount: Math.floor((priceD.netAmount*(priceD.gstPercentage/100))+(priceD.netAmount-discountedPrice))}));
                                    // }else{
                                    //   setPriceD(prevState => ({ ...prevState, discount: result.payload.amount }));
                                    // }
                                  } else {
                                    Swal.fire({
                                      icon: 'error',
                                      title: 'Error',
                                      text: `Offer Not Exist!`
                                    })
                                  }
                                })
                              }}
                            >Submit</button>
                          </div>
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="border-none border-0">
                <Card className="invoice-card m-0 p-0 border-none border-0">
                  <Card.Body className="d-flex flex-column align-items-end">
                    {/* <Card.Title style={{ color: '#50289A', fontWeight: 'bold' }}>Invoice</Card.Title> */}
                    <Card.Text className="invoice-totals flex-fill">
                      <div className="row justify-content-between align-items-center">
                        <div style={{ width: '200px' }}><strong>Cost:</strong></div>
                        <div style={{ width: '120px' }} className="text-right">{priceD.cost}.00</div>
                      </div>
                      <div className="row justify-content-between align-items-center">
                        <div style={{ width: '200px' }}><strong>Promotional Discount.:</strong></div>
                        <div style={{ width: '120px' }} className="text-right">{priceD.discount}.00</div>
                      </div>
                      <div className="row justify-content-between align-items-center">
                        <div style={{ width: '200px' }}><strong>Transportation:</strong></div>
                        <div style={{ width: '120px' }} className="text-right">{priceD.transportation}.00</div>
                      </div>
                      <div className="row justify-content-between align-items-center">
                        <div style={{ width: '200px' }}><strong>Other Charges:</strong></div>
                        <div style={{ width: '120px' }} className="text-right">{priceD.otherExpense}.00</div>
                      </div>
                      <div className="row justify-content-between align-items-center">
                        <div style={{ width: '200px' }}><strong>Net Amount:</strong></div>
                        <div style={{ width: '120px' }} className="text-right">{priceD.netAmount}</div>
                      </div>
                      <div className="row justify-content-between align-items-center">
                        <div style={{ width: '200px' }}><strong>GST {priceD.gstPercentage}%:</strong></div>
                        <div style={{ width: '120px' }} className="text-right">{priceD.GST}</div>
                      </div>
                      <div className="row justify-content-between align-items-center">
                        <div style={{ width: '200px' }}><strong>Total Amount:</strong></div>
                        <div style={{ width: '120px' }} className="text-right"><strong>{priceD.totalAmount}</strong></div>
                      </div>
                    </Card.Text>

                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </Container>
          {/* <div className="form_data">
            <div className="container">
              <div class="row">
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input type="text" placeholder="Name On Card*" />
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input type="number" placeholder="Card Number*" />
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input type="text" placeholder="Expiry date*" />
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input type="email" placeholder="CVV*" id="last" />
                  <label for="last" className="lab_11">
                    Last three digits on signature
                  </label>
                </p>
            
              </div>
            </div>
          </div> */}
        </div >
        <div className="footer_form">
          <button
            onClick={() => {
              dispatch(setStep(step - 1));
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              // saving data in redux
              dispatch(setMassageField({
                cost: priceD.cost,
                otherExpense: priceD.otherExpense,
                transportation: priceD.transportation,
                GST: priceD.GST,
                discount: priceD.discount,
                netAmount: priceD.netAmount,
                totalAmount: priceD.totalAmount,
                referralCode: referralCode ? referralCode : null
              }));

              // Dispatching an action to save service data in the database
              dispatch(
                addService({
                  ...massageStateData,
                  cost: priceD.cost,
                  otherExpense: priceD.otherExpense,
                  transportation: priceD.transportation,
                  GST: priceD.GST,
                  discount: priceD.discount,
                  netAmount: priceD.netAmount,
                  totalAmount: priceD.totalAmount,
                  referralCode: referralCode ? referralCode : null
                })
              ).then((result) => {
                if (!result.error) {
                  console.log(result.payload);
                  console.log(result.payload.id);
                  checkoutHandler(priceD.totalAmount, result.payload.id);
                } else {
                  console.error("Error saving service data:", result.error);
                }
              });
              // setStep(step + 1);
            }}
          >
            Proceed to Pay {priceD.totalAmount}
          </button>
        </div >
      </>
    );
  };

  // const Welcome = () => {
  //   const isOrderPlaced = useSelector((state) => state.booking.isSignup);
  //   const massageStateData = useSelector((state) => state.booking.data);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     if (isOrderPlaced === true) {
  //       console.log("email")
  //       // dispatch(sendConfirmationEmail(massageStateData));
  //     }
  //   }, [isOrderPlaced]);
  //   return (
  //     <>
  //       <div className="final">
  //         <div className="final_content">
  //           <span className="check">
  //             <img src={thankU} alt="thankU" />
  //           </span>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <>
      <div className="container">
        <div class="form">
          <div className="card">
            <div>{<Form />}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppoimentForm;
