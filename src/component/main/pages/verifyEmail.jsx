import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { sendRegistrationEmail } from '../../features/userSlicer';

function VerifyEmail() {
  const location = useLocation();
  const dispatch=useDispatch();
  const [verificationStatus, setVerificationStatus] = useState('');
  const loading=useSelector((state)=>state.user.loading);
  const base_url= REACT_APP_BASE_URL;
  const urlParams = new URLSearchParams(location.search);
  const email = urlParams.get('email');

  useEffect(() => {
    // Extract token and email from the URL parameters
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const email = urlParams.get('email');

    

    // // Verify email on page load
    const verifyEmail = async () => {
      try {
        const response = await fetch(`${base_url}/mail/verify?token=${token}&email=${email}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.text();
         Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email Verified Successfully!'
        });
        setVerificationStatus(data);
      } catch (error) {
        console.error('Error verifying email:', error.message);
        setVerificationStatus('Error verifying email');
      }
    };

    verifyEmail();
  }, [location.search]);  // Dependency on location.search ensures the effect runs when the URL changes

  if(verificationStatus){
    <Navigate to="/" />
  }

  const handleResendMail =()=>{
    if(email){
    dispatch(sendRegistrationEmail({email}));
    }
  }
  return (
    <div>
      {verificationStatus ? (
        <p>{verificationStatus=="Error verifying email" ? 
      <p>Verification failed, <a onClick={handleResendMail} className='text-primary' style={{cursor:"pointer"}} > {loading ? "loading...":"Resend mail"}</a> </p>
      :verificationStatus}</p>
      ) : (
        <p>Verifying email...</p>
      )}
     
    </div>
  );
}

export default VerifyEmail;
