import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFitness, setFitnessField } from "../../features/bookingSlicer";
import { getPackages } from "../../features/siteSettingsSlicer";


function Paymentmethod() {
  const dispatch = useDispatch();
  const fitnessStateData = useSelector((state) => state.booking.data);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(fitnessStateData);
      dispatch(addFitness(fitnessStateData));
      // dispatch(setFitnessField(fitness));
      // navigate("/thankU");
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error("Error logging in:", error);
    }
  };

  const packagesStateData = useSelector((state) => state.siteSettings.packages);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    dispatch(getPackages());
    setTrigger(false);
  }, [trigger]);
  return (
    <>

      <form action="" class="py-5">
        {/* <!-- One "tab" for each step in the form: --> */}
        <div class="container my-3">
          <h4 className="flex_mem">Zorova Membership</h4>
          <p className="text-center">
            Please complete the following information to apply for our exclusive
            membership
          </p>
          <div class="row py-5">
            <h4>Membership Type:</h4>
            <div class="row py-3">
              {packagesStateData?.map((item, index) => (
                <div class="col-sm-6 my-2">
                  <div class="price_mem">
                    <div class="fit_pro">
                      <div class="">
                        <h6>{item.packageName}</h6>
                        <p>{item.packageFor} ({item.price} INR)</p>
                      </div>
                      <input
                        type="radio"
                        id="Fitness"
                        name="price"
                        value={item.price}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* <div class="col-sm-6 my-2">
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
                    required
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
                      required
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
                    required
                  />
                </div>
              </div> */}
            </div>
            <h4>Add Card:</h4>
            <p class="col-lg-6 col-md-6 col-sm-12">
              <input type="text" placeholder="Name On Card*" required />
            </p>
            <p class="col-lg-6 col-md-6 col-sm-12">
              <input type="number" placeholder="Card Number*" required />
            </p>
            <p class="col-lg-6 col-md-6 col-sm-12">
              <input type="text" placeholder="Expiry date*" required />
            </p>
            <p class="col-lg-6 col-md-6 col-sm-12">
              <input type="email" placeholder="CVV*" required />
              <label for="" className="lab_s" >
                Last three digits on signature
              </label>{" "}
            </p>

            <div class="form-check pt-3">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck2"
                required
              />
              <label
                class="form-check-label lab_s"
                for="invalidCheck2"

              >
                Remember credit card details for next time
              </label>
            </div>
          </div>
          <div className="over_box1">
            <div className="d-flex">
              <button class="sign_but1" type="button" id="prevBtn">
                {/* <!-- <img src="assets/image/back.png" alt="" /> --> */}
                <Link class="Creat_btn" to={'/join-program'}>

                  Back
                </Link>
              </button>
              <button class="sign_but2" type="button" id="nextBtn" onClick={handleSubmit}>
                <span class="Creat_btn" >

                  Join
                </span>

                {/* <!-- <img src="assets/image/arrow-right.png" alt="" /> --> */}
              </button>
            </div>
          </div>
        </div>
      </form>

    </>
  );
}

export default Paymentmethod;
