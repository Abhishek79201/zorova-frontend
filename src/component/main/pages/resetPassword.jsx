import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendResetEmail } from "../../features/userSlicer";

export default function ResetPassword() {
  const [email, setEmail]=useState();
  const loading= useSelector((state)=>state.user.loading);
  const dispatch=useDispatch();
  const handlePasswordReset =(event)=>{
    event.preventDefault();
    if(email){
      dispatch(sendResetEmail(email));
    }
  }
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center py-5 w-50">
        <div class="container py-5">
          <form className="m-auto" onSubmit={handlePasswordReset}>
            <div class="row py-5 m-auto text-center">
              <h4>Forgot password?</h4>
              <hr />
              <p>
                Enter your email. We'll send a link allowing you to reset/set
                your password.
              </p>
              <div class="row py-2 justify-content-center">
                <p class="col-lg-6 col-md-6 col-sm-12">
                  <input type="email" placeholder="Email Address*" name="email"  onChange={(event) => setEmail(event.target.value)} required />
                </p>
                <p class="col-lg-6 col-md-6 col-sm-12">
                <div class="sign_but "  >
                  <input type="submit" value={loading ? "sending..." :"Reset Password" } class="Creat_btn" style={{background:"none", border:"none"}} />
                    
                    <img src="assets/image/arrow-right.png" alt="" />
                 
                </div>
                </p>

                
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
