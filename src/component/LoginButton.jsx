import React from 'react'
// import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const LoginButton = () => {
  // const handleSuccess = (credentialResponse) => {
  //     var credentialResponseRecorded=jwtDecode(credentialResponse.credential);
  //     console.log(credentialResponseRecorded);
  //   };

  //   const handleError = () => {
  //     console.log('Login Failed');
  //   };

  const login = useGoogleLogin({
    onSuccess: async response => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`
            }
          }
        )
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    // onSuccess:(tokenResponse) => console.log(tokenResponse)
  })

  return (
    // <GoogleLogin
    //   onSuccess={handleSuccess}
    //   onError={handleError}
    // />

    <button onClick={() => login()}>Signin</button>
  )
}

export default LoginButton
