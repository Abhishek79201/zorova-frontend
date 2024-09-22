import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addFitness, setFitnessField } from "../../features/bookingSlicer";
import Swal from "sweetalert2";

function Joinprogram() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const auth=localStorage.getItem("auth-token");
  const fitnessStateData = useSelector((state)=>state.booking.data);

  useEffect(() => {
    if (!auth) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Signin First!'
      });
      navigate("/");
    }
  }, [auth]);

  useEffect(() => {
    // If userStateData exists, setup the beforeunload event listener
    if (fitnessStateData) {
      const handleBeforeUnload = (e) => {
        e.preventDefault(); // Required for cross-browser compatibility
        e.returnValue = ''; // This message is ignored by most browsers but can be used as a fallback for older browsers
        return ''; // This is the actual message that will be displayed in the alert
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [fitnessStateData]);

  const [fitness, setFitness] = useState({
    fullName: fitnessStateData.fullName || "",
    email: fitnessStateData.email || "",
    dob:fitnessStateData.dob || null,
    gender: fitnessStateData.gender || "",
    phone: fitnessStateData.phone || null,
    addressLine1: fitnessStateData.addressLine1 || "",
    addressLine2: fitnessStateData.addressLine2 || "",
    city: fitnessStateData.city || "",
    state: fitnessStateData.state || "",
    zipCode: fitnessStateData.zipCode || null,
    medicalCondition: fitnessStateData.medicalCondition || false,
    medicalConditionYesDetail: fitnessStateData.medicalConditionYesDetail || "",
    medication: fitnessStateData.medication || false,
    medicationYesDetail: fitnessStateData.medicationYesDetail || "",
    fitnessWeightLossGoalDesc: fitnessStateData.fitnessWeightLossGoalDesc || "",
    prevExerExp: fitnessStateData.prevExerExp || false,
    prevExerExpDetail: fitnessStateData.prevExerExpDetail || "",
    age: fitnessStateData.age || null,
    height: fitnessStateData.height || "",
    weight: fitnessStateData.weight || "",
    program: fitnessStateData.program || "",
    allergy: fitnessStateData.allergy || "",
    surgery: fitnessStateData.surgery || false,
    surgeryDetail: fitnessStateData.surgery || "",
    painDiscomfort: fitnessStateData.painDiscomfort || "",
    chronicMedicalConditions: fitnessStateData.chronicMedicalConditions || "",
    healthcare: fitnessStateData.healthcare || false,
    healthcareDetail: fitnessStateData.healthcareDetail || "",
    dietarySuppliments: fitnessStateData.dietarySuppliments || false,
    dietarySupplimentsDetail: fitnessStateData.dietarySupplimentsDetail || "",
    mobilityAids: fitnessStateData.mobilityAids || "",
    smoking: fitnessStateData.smoking || false,
    smokingDetail: fitnessStateData.smokingDetail || "",
    alcohol: fitnessStateData.alcohol || false,
    alcoholConsumptionDetail: fitnessStateData.alcoholConsumptionDetail || "",
    fitnessLevel: fitnessStateData.fitnessLevel || "",
    previousJoining: fitnessStateData.previousJoining || false,
    previousJoiningDetail: fitnessStateData.previousJoiningDetail || "",
    fitnessGoal: fitnessStateData.fitnessGoal || "",
    dailyDietaryIntake: fitnessStateData.dailyDietaryIntake || "",
    dietryPreferenceRestriction: fitnessStateData.dietryPreferenceRestriction || "",
    otherInfo: fitnessStateData.otherInfo || "",
  });

  const onChange = (element) => {
    if (element.target.name == "age") {
      if (typeof element.target.value === "string") {
        let value = parseInt(element.target.value, 10); // Convert string to integer
        setFitness({ ...fitness, [element.target.name]: value });
      }
    } else if (
      element.target.name == "medicalCondition" ||
      element.target.name == "medication" ||
      element.target.name == "healthcare" ||
      element.target.name == "surgery" ||
      element.target.name == "prevExerExp" ||
      element.target.name == "dietarySuppliments" ||
      element.target.name == "smoking" ||
      element.target.name == "alcohol" ||
      element.target.name == "previousJoining"
    ) {
      const value = element.target.value === "true"; // Convert string "true" or "false" to actual boolean value
      setFitness({ ...fitness, [element.target.name]: value });
    } else {
      setFitness({ ...fitness, [element.target.name]: element.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(fitness);
      // dispatch(addFitness(fitness));
      dispatch(setFitnessField(fitness));
      navigate("/paymentmethod");
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <div class="container">
        <div class="row py-5">
          <div class="mem_form">
            <h2 className="text-center">
              Flexiva Fitness and Weight Loss Program
            </h2>
            <p className="text-center">
              Please complete the following information to enroll in our Fitness
              and Weight Loss Program
            </p>
            <div class="container py-5">
              <div class="row">
                <form >
                  <div class="row py-5">
                    <h4>Personal Information:</h4>
                    <div class="row py-3">
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Full Name*"
                          onChange={onChange}
                          value={fitness.fullName} 
                          name="fullName"
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        {/* <label htmlFor="dob">Date of Birth*</label> */}
                        <input
                          id="dob"
                          type="text"
                          defaultValue="Date of Birth*"
                          value={fitness.dob}
                          onChange={onChange}
                          name="dob"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Gender*"
                          value={fitness.gender}
                          onChange={onChange}
                          name="gender"
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="email"
                          placeholder="Email Address*"
                          onChange={onChange}
                          value={fitness.email}
                          name="email"
                        />
                      </p>
                      <p class="col-lg-6 col-md-12 col-sm-12">
                        <input
                          type="number"
                          placeholder="Phone Number*"
                          value={fitness.phone}
                          onChange={onChange}
                          name="phone"
                        />
                      </p>
                    </div>
                    <h4>Address:</h4>
                    <div class="row py-3">
                      <p class="col-lg-12 col-md-12 col-sm-12">
                        <input
                          type="text"
                          placeholder="Address line 1*"
                          value={fitness.addressLine1}
                          onChange={onChange}
                          name="addressLine1"
                        />
                      </p>
                      <p class="col-lg-12 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="Address line 2*"
                          onChange={onChange}
                          value={fitness.addressLine2}
                          name="addressLine2"
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="City*"
                          onChange={onChange}
                          value={fitness.city}
                          name="city"
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="text"
                          placeholder="State/Province/Region"
                          onChange={onChange}
                          value={fitness.state}
                          name="state"
                        />
                      </p>
                      <p class="col-lg-6 col-md-6 col-sm-12">
                        <input
                          type="number"
                          placeholder="Zip/Postal Code*"
                          onChange={onChange}
                          value={fitness.zipCode}
                          name="zipCode"
                        />
                      </p>
                    </div>
                    <h4>Health Information:</h4>
                    <div class="s_form py-3">
                      <div class="f_qus">
                        <p>
                          Do you have any existing medical conditions or health
                          concerns?{" "}
                        </p>
                        <div class="form-check ms-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            onChange={onChange}
                            checked={fitness.medicalCondition==true}
                            name="medicalCondition"
                            id="Health1"
                            value={true}
                          />
                          <label class="form-check-label" for="Health1">
                            Yes
                          </label>
                        </div>
                        <div class="form-check ms-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            onChange={onChange}
                            checked={fitness.medicalCondition==false}
                            name="medicalCondition"
                            id="Health2"
                            value={false}
                          />
                          <label class="form-check-label" for="Health2">
                            No
                          </label>
                        </div>
                      </div>
                      <div class="s_qus my-1">
                        <label class="form-label" for="text1">
                          If yes, please provide details:
                        </label>
                        <input
                          class="form-control m-1"
                          type="text"
                          onChange={onChange}
                          value={fitness.medicalConditionYesDetail}
                          name="medicalConditionYesDetail"
                          id="text1"
                        />
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>Are you currently taking any medications? </p>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.medication == true}
                              name="medication"
                              id="Health3"
                              value={true}
                            />
                            <label class="form-check-label" for="Health3">
                              Yes
                            </label>
                          </div>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              name="medication"
                              checked={fitness.medication == false}
                              id="Health4"
                              value={false}
                            />
                            <label class="form-check-label" for="Health4">
                              No
                            </label>
                          </div>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            If yes, please provide details:
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                           value={fitness.medicationYesDetail}
                            name="medicationYesDetail"
                            id="text1"
                          />
                        </div>
                      </div>
                    </div>
                    <h4>Fitness and Weight Loss Goals:</h4>
                    <div class="s_form py-3">
                      <div class="f_qus">
                        <p>
                          Please briefly describe your fitness or weight loss
                          goals:{" "}
                        </p>
                      </div>
                      <div class="s_qus my-1">
                        <textarea
                          class="form-control m-1"
                          type="text"
                          onChange={onChange}
                          value={fitness.fitnessWeightLossGoalDesc}
                          name="fitnessWeightLossGoalDesc"
                          id="text1"
                        ></textarea>
                      </div>
                    </div>
                    <h4>Previous Exercise Experience:</h4>
                    <div class="s_form py-3">
                      <div class="f_qus">
                        <p>
                          Have you participated in any fitness or exercise
                          programs before?{" "}
                        </p>
                        <div class="form-check ms-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            onChange={onChange}
                            checked={fitness.prevExerExp == true}
                            name="prevExerExp"
                            id="PreviousPrevious1"
                            value={true}
                          />
                          <label class="form-check-label" for="Previous1">
                            Yes
                          </label>
                        </div>
                        <div class="form-check ms-3">
                          <input
                            class="form-check-input"
                            type="radio"
                            onChange={onChange}
                            checked={fitness.prevExerExp == false}
                            name="prevExerExp"
                            id="Previous2"
                            value={false}
                          />
                          <label class="form-check-label" for="Previous2">
                            No
                          </label>
                        </div>
                      </div>
                      <div class="s_qus my-1">
                        <label class="form-label" for="text1">
                          If yes, please provide details:
                        </label>
                        <input
                          class="form-control m-1"
                          type="text"
                          onChange={onChange}
                          value={fitness.prevExerExpDetail}
                          name="prevExerExpDetail"
                          id="text1"
                        />
                      </div>
                    </div>
                    <h4>Age, Weight, and Height:</h4>
                    <div class="row py-3">
                      <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group row mb-1">
                          <label for="age" class="col-sm-2 col-form-label">
                            Age:
                          </label>
                          <div class="col-sm-10">
                            <input
                              type="number"
                              class="form-control-plaintext"
                              placeholder="Years"
                              id="age"
                              value={fitness.age}
                              onChange={onChange}
                              name="age"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group row mb-1">
                          <label for="Weight" class="col-sm-2 col-form-label">
                            Weight:
                          </label>
                          <div class="col-sm-10">
                            <input
                              type="text"
                              class="form-control-plaintext"
                              id="Weight"
                              placeholder="lbs/kg"
                              onChange={onChange}
                              value={fitness.weight}
                              name="weight"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="form-group row mb-1">
                          <label for="Height" class="col-sm-2 col-form-label">
                            Height:
                          </label>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control-plaintext"
                              id="Height"
                              placeholder="ft/inches"
                              onChange={onChange}
                              value={fitness.height}
                              name="height"
                            />
                          </div>
                          <label for="Height" class="col-sm-2 col-form-label">
                            Or
                          </label>
                          <div class="col-sm-4">
                            <input
                              type="text"
                              class="form-control-plaintext"
                              id="Height"
                              placeholder="cm"
                              onChange={onChange}
                              name="height"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4>Program Selection:</h4>
                    <div class="row py-3">
                      <div class="col-sm-6">
                        <div class="fit_pro">
                          <label for="Fitness">Fitness Program</label>
                          <input
                            type="radio"
                            id="Fitness"
                            onChange={onChange}
                            checked={fitness.program=="Fitness Program"}
                            name="program"
                            value={"Fitness Program"}
                          />
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="fit_pro">
                          <label for="Weightloss">Weight Loss Program</label>
                          <input
                            type="radio"
                            id="Weightloss"
                            checked={fitness.program=="FWeight Loss Program"}
                            onChange={onChange}
                            name="program"
                            value={"Weight Loss Program"}
                          />
                        </div>
                      </div>
                      <p class="py-3 text-center">
                        Certainly, here are some additional health-related
                        questions that can help you better understand the health
                        and fitness status of your customers:
                      </p>
                    </div>
                    <h4>Health History:</h4>
                    <div class="row py-3">
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Do you have any allergies, food sensitivities, or
                            dietary restrictions we should be aware of?{" "}
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.allergy}
                            name="allergy"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Have you undergone any surgeries or medical
                            procedures in the past?{" "}
                          </p>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.surgery==true}
                              name="surgery"
                              id="medical1"
                              value={true}
                            />
                            <label class="form-check-label" for="medical1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.surgery==false}
                              name="surgery"
                              id="surgeries1"
                              value={false}
                            />
                            <label class="form-check-label" for="surgeries1">
                              No
                            </label>
                          </div>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            If yes, please provide details and dates:
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.surgeryDetail}
                            name="surgeryDetail"
                            id="text1"
                          />
                        </div>
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Are you currently experiencing any pain or
                            discomfort, particularly in the joints or muscles?{" "}
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            Please describe:
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.painDiscomfort}
                            name="painDiscomfort"
                            id="text1"
                          />
                        </div>
                      </div>
                    </div>
                    <h4>Medical Conditions:</h4>
                    <div class="row  py-3">
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Do you have a history of chronic medical conditions
                            such as diabetes, hypertension, heart disease, or
                            respiratory conditions?
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.chronicMedicalConditions}
                            name="chronicMedicalConditions"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Are you currently under the care of a healthcare
                            provider or specialist for any medical condition?{" "}
                          </p>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.healthcare==true}
                              name="healthcare"
                              id="MedicalCon1"
                              value={true}
                            />
                            <label class="form-check-label" for="MedicalCon1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.healthcare==false}
                              name="healthcare"
                              id="MedicalCon2"
                              value={false}
                            />
                            <label class="form-check-label" for="MedicalCon2">
                              No
                            </label>
                          </div>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            If yes, please provide details and dates:
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.healthcareDetail}
                            name="healthcareDetail"
                            id="text1"
                          />
                        </div>
                      </div>
                    </div>
                    <h4>Medications and Supplements:</h4>
                    <div class="row  py-3">
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Are you taking any dietary supplements, vitamins, or
                            herbal remedies?{" "}
                          </p>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.dietarySuppliments == true}
                              name="dietarySuppliments"
                              id="Medications1"
                              value={true}
                            />
                            <label class="form-check-label" for="Medications1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.dietarySuppliments == false}
                              name="dietarySuppliments"
                              id="Medications2"
                              value={false}
                            />
                            <label class="form-check-label" for="Medications2">
                              No
                            </label>
                          </div>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            If yes, please list them:
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.dietarySupplimentsDetail}
                            name="dietarySupplimentsDetail"
                            id="text1"
                          />
                        </div>
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Are you currently using any mobility aids or
                            assistive devices, such as crutches, braces, or a
                            wheelchair?
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.mobilityAids}
                            name="mobilityAids"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <h4>Lifestyle and Habits:</h4>
                    <div class="row  py-3">
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>Do you smoke or use tobacco products? </p>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.smoking==true}
                              name="smoking"
                              id="Lifestyle1"
                              value={true}
                            />
                            <label class="form-check-label" for="Lifestyle1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.smoking == false}
                              name="smoking"
                              id="Lifestyle2"
                              value={false}
                            />
                            <label class="form-check-label" for="Lifestyle2">
                              No
                            </label>
                          </div>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            If yes, how frequently?
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            value={fitness.smokingDetail}
                            onChange={onChange}
                            name="smokingDetail"
                            id="text1"
                          />
                        </div>
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>Do you consume alcoholic beverages? </p>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.alcohol==true}
                              name="alcohol"
                              id="Habits1"
                              value={true}
                            />
                            <label class="form-check-label" for="Habits1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.alcohol==false}
                              name="Habits"
                              id="Habits2"
                              value={false}
                            />
                            <label class="form-check-label" for="Habits2">
                              No
                            </label>
                          </div>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            If yes, how often and in what quantities?
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.alcoholConsumptionDetail}
                            name="alcoholConsumptionDetail"
                            id="text1"
                          />
                        </div>
                      </div>
                    </div>
                    <h4>Fitness History:</h4>
                    <div class="row  py-3">
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            How would you describe your current fitness level?{" "}
                          </p>
                          <label class="form-label" for="text1">
                            (e.g., sedentary, moderately active, very active)
                          </label>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.fitnessLevel}
                            name="fitnessLevel"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Have you previously worked with a fitness trainer or
                            participated in any exercise programs?{" "}
                          </p>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.previousJoining==true}
                              name="previousJoining"
                              id="Fitness1"
                              value={true}
                            />
                            <label class="form-check-label" for="Fitness1">
                              Yes
                            </label>
                          </div>
                          <div class="form-check ms-3">
                            <input
                              class="form-check-input"
                              type="radio"
                              onChange={onChange}
                              checked={fitness.previousJoining==false}
                              name="previousJoining"
                              id="Fitness2"
                              value={false}
                            />
                            <label class="form-check-label" for="Fitness2">
                              No
                            </label>
                          </div>
                        </div>
                        <div class="s_qus my-1">
                          <label class="form-label" for="text1">
                            If yes, how frequently?
                          </label>
                          <input
                            class="form-control m-1"
                            type="text"
                            value={fitness.previousJoiningDetail}
                            onChange={onChange}
                            name="previousJoiningDetail"
                            id="text1"
                          />
                        </div>
                      </div>
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Are there any specific fitness goals you would like
                            to achieve through our program, such as weight loss,
                            muscle gain, improved flexibility, or increased
                            cardiovascular fitness?
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.fitnessGoal}
                            name="fitnessGoal"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <h4>Nutrition and Diet:</h4>
                    <div class="row  py-3">
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            What is your typical daily dietary intake like? Are
                            you following any specific diet plan or eating
                            regimen?{" "}
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.dailyDietaryIntake}
                            name="dailyDietaryIntake"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>

                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Do you have any dietary preferences or restrictions,
                            such as vegetarian, vegan, gluten-free, or other
                            dietary choices?
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.dietryPreferenceRestriction}
                            name="dietryPreferenceRestriction"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <h4>Additional Information:</h4>
                    <div class="row  py-3">
                      <div class="s_form py-3">
                        <div class="f_qus">
                          <p>
                            Is there any other health-related information you
                            believe is important for us to know in order to
                            provide you with the best fitness and weight loss
                            program experience?
                          </p>
                        </div>
                        <div class="s_qus my-1">
                          <textarea
                            class="form-control m-1"
                            type="text"
                            onChange={onChange}
                            value={fitness.otherInfo}
                            name="otherInfo"
                            id="text1"
                          ></textarea>
                        </div>
                      </div>
                      <h5>
                        By gathering comprehensive health-related information,
                        you can tailor your fitness and weight loss programs to
                        the specific needs and goals of each customer, ensuring
                        a more effective and personalized approach to their
                        well-being journey. Remember to handle this information
                        with care and in compliance with privacy regulations.
                      </h5>
                      <p>
                        By submitting this application, I acknowledge that I
                        have read and agree to abide by the terms and conditions
                        of Flexiva Fitness and Weight Loss Program.
                      </p>
                    </div>
                  </div>
                  <div class="sign_but mt-3 ms-3 ros_box" onClick={handleSubmit}>
                    {/* <Link class="Creat_btn" to={'/paymentmethod'}> */}
                    {/* <input type="submit" value={"Submit & Pay"}/>  */}
                    <button
                      class="btn"
                      type="submit"
                      style={{ color: "white" }}
                    >
                      Submit & Pay
                    </button>
                    <img src="assets/image/arrow-right.png" alt="" />
                    {/* </Link> */}
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

export default Joinprogram;
