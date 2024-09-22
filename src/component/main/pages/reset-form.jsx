import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { passwordReset } from "../../features/userSlicer";

export default function ResetForm() {

  // const [token, setToken]=useState();
  // const [email, setEmail]=useState;
const navigate=useNavigate();
const loading=useSelector((state)=>state.user.loading);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    if (!token || !email) {
      // Navigate to the login page if either token or email is missing
      navigate('/');  // Update '/login' with your actual login route
    }
    
    // ... rest of your useEffect code
  }, [navigate]); 

  const urlParams = new URLSearchParams(window.location.search);
    
  // Extract token and email from the URL
  const token = urlParams.get('token');
  const email = urlParams.get('email');

  const [password, setPassword]=useState();
  const [confirm, setConfirm]=useState();
  const dispatch=useDispatch();

  const handlePasswordReset =(event)=>{
    event.preventDefault();
    if(password && password==confirm && token && email){
      dispatch(passwordReset({email, password, token}));
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Both Passwords are not equal!`
      });
    }
  }
  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center py-5 w-50">
        <div class="container py-5">
          <form className="m-auto" onSubmit={handlePasswordReset} >
            <div class="row py-5 m-auto text-center">
              <h4>Set New Password</h4>
              <div class="row py-2 justify-content-center">
                <p class="col-lg-12 col-md-12 col-sm-12">
                  <input type="password" placeholder="Password*" onChange={(event) => setPassword(event.target.value)} required />
                </p>
                <p class="col-lg-12 col-md-12 col-sm-12">
                  <input type="password" placeholder="Confirm Password*" onChange={(event) => setConfirm(event.target.value)} required />
                </p>
                <p class="col-lg-12 col-md-12 col-sm-12 mt-3">
                <div class="sign_but ">
                <input type="submit" value={loading ? "Changing...":"Change Password"}  class="Creat_btn" style={{background:"none", border:"none"}} />

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
