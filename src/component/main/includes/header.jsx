import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import singUp from "../assets/image/singnin.png";
import singIn from "../assets/image/signin.png";
import rightArrow from "../assets/image/arrow-right.png";
import GoogleIcon from "../assets/image/Google.png";
import GitIcon from "../assets/image/GitHub.png";
import logo from "../assets/image/logo.png";
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from "react-redux";
import { findUser, loginUser, registerUser, resetUserState, sendRegistrationEmail, setUserField, userLogout } from "../../features/userSlicer";
import Swal from "sweetalert2";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import loadingGif from '../../../loading.gif';
import ButtonSkeleton from "../../features/buttonSkeleton";
import { setStep } from "../../features/bookingSlicer";

const googleAuthSignInPassword = process.env.REACT_APP_OAUTH_STATIC_PASSWORD;

function Header({ userRole, userFullName }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleCloseSignUp = () => { setShowSignUp(false) };
  const handleShowSignUp = () => { setShowSignUp(true); setShowSignIn(false); dispatch(resetUserState()) };

  const handleCloseSignIn = () => { setShowSignIn(false) };
  const handleShowSignIn = () => { setShowSignIn(true); setShowSignUp(false); dispatch(resetUserState()) };

  ///////////////////////////////////////////

  const [showSignUpMobile, setShowSignUpMobile] = useState(false);
  const [showSignInMobile, setShowSignInMobile] = useState(false);

  const handleCloseSignUpMobile = () => setShowSignUpMobile(false);
  const handleShowSignUpMobile = () => setShowSignUpMobile(true);

  const handleCloseSignInMobile = () => setShowSignInMobile(false);
  const handleShowSignInMobile = () => setShowSignInMobile(true);

  ////////////////////////////////////////////////////////////

  const handleNavigate = (destination) => {
    handleCloseSignUpMobile()

    handleCloseSignInMobile()

    handleCloseSignUp()

    handleCloseSignIn()


    navigate(destination);

  };

  // Referral System Logic
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);
    const referralCode = urlParams.get('referralCode');
    if (referralCode && !localStorage.getItem('referralCode')) {
      localStorage.setItem('referralCode', referralCode);
    }
  }, []);

  const referralCode = localStorage.getItem('referralCode');
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    referralCode: referralCode,
    status: 0,
    role:"user"
  });
  const onChange = (element) => {
    setUser({ ...user, [element.target.name]: element.target.value });
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth-token");


  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Check if the password length is exactly 6 characters
    if (user.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Password Length',
        text: 'Password must be 6 or more characters long!'
      });
      return; // Exit the function if password length is invalid
    }

    // If password length is valid, proceed to set user field
    // dispatch(setUserField(user));
    await dispatch(registerUser(user)).then((result) => {
      if (!result.error) {
        dispatch(sendRegistrationEmail({email:user.email})).then(()=>{
            setShowSignUp(false);
        });
        // navigate('/');
      } else {
        setShowSignUp(false);
        return;
      }
    });
    
  }

  /////////////////////// SignIn Handling ////////////////////////
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);

  //   useEffect(() => {
  //     if (isLoggedIn) {
  //       navigate('/user/dashboard');
  //     }
  // }, [isLoggedIn]);


  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ email: user.email, password: user.password, navigate: navigate }));
      setShowSignIn(false);
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error("Error logging in:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        )
        await dispatch(loginUser({ email: res.data.email, password: googleAuthSignInPassword }));
        setShowSignIn(false);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Please try again!`
        });
      }
    }

    // onSuccess:(tokenResponse) => console.log(tokenResponse)
  })

  const Signup = useGoogleLogin({

    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        )

        // const result = await dispatch(findUser(res.data.email));
        // if (!result.error) {
          dispatch(registerUser({ fullName: res.data.name, referralCode: referralCode, email: res.data.email, password: googleAuthSignInPassword, status: 1, role:'user' }));
          setShowSignUp(false);
        //   navigate('/signin');
        // } else {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Error',
        //     text: `User Already Exist!`
        //   });
        //   return;
        // }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Please try again or use manual registration!`
        });
      }
    }

  })

  const handleDashboardClick = () => {
    let dashboardUrl = "/";
    if (userRole === "provider") {
      dashboardUrl = "/provider/dashboard";
    } else if (userRole === "user") {
      dashboardUrl = "/user/dashboard";
    } else if (userRole === "employee") {
      dashboardUrl = "/employee/dashboard";
    } else if (userRole === "admin") {
      dashboardUrl = "/admin/dashboard";
    }
    window.location.href = dashboardUrl;
  };

  const handleLogoutClick = () => {
    dispatch(userLogout());
  };



  return (
    <>
      <Helmet>
        <title>Zorova</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/media.css" />
        <link rel="stylesheet" href="/assets/css/form.css" />
        <link rel="stylesheet" href="/assets/animation/animation.css" />


        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;600;700;800;900&family=Prompt:wght@200;400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;600;700;800;900&family=Prompt:wght@200;400;500;600;700;800;900&family=Roboto+Slab:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'></script>
      </Helmet>

      <div className="hero-container nav_main">
        <div className="header">
          <ul>
            <Link className="text-light mx-2" to={"/business"}>
              <li>Business</li>
            </Link>
            <Link className="text-light mx-2" to={"/membership"}>
              <li>Membership</li>
            </Link>
            <Link className="text-light mx-2" to={"/become-a-provider"}>
              <li>Become A Provider</li>
            </Link>
          </ul>
          <ul>
            <li>
              {!auth ? (
                <>
                  <Button variant="" className="text-light" onClick={handleShowSignUp}>
                    Sign Up
                  </Button>
                  <Button variant="" className="text-light" onClick={handleShowSignIn}>
                    Sign In
                  </Button>
                </>
              ) :

                <>
                  {/* <DropdownButton
                    id="dropdown-basic-button"
                    title={
                      loading ? (
                        <img src={loadingGif} alt="Loading..." style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                      ) : (
                        userFullName !== undefined ? `Welcome ${userFullName}` : ""
                      )
                    }
                    variant="link"
                    className="text-light"
                  >
                    <Dropdown.Item onClick={handleDashboardClick}>Dashboard</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogoutClick}>Logout</Dropdown.Item>
                  </DropdownButton> */}
                  <div className="dropdown ms-2">
                    <a
                      id="userSettings"
                      className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={(e) => e.preventDefault()}
                    >
                      {loading ? (
                        <img src={loadingGif} alt="Loading..." style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                      ) : (
                        userFullName !== undefined ? `Welcome ${userFullName}` : ""
                      )}
                    </a>
                    <div className="dropdown-menu dropdown-menu-end shadow-sm">
                      <div
                        className="dropdown-item d-flex align-items-center  text-dark"
                        style={{cursor: 'pointer'}}
                        onClick={handleDashboardClick}
                      >
                        <i className="bi bi-gear fs-4 me-2" />
                        Dashboard
                      </div>
                      <div className="d-grid p-3 py-2">
                        <div onClick={handleLogoutClick} className="btn btn-primary btn-sm">
                          Logout
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                // <>

                //   <Button
                //     variant=""
                //     className="text-light"
                //     onClick={() => {
                //       const role = userRole;
                //       let dashboardUrl = "/";

                //       if (role === "provider") {
                //         dashboardUrl = "/provider/dashboard";
                //       } else if (role === "user") {
                //         dashboardUrl = "/user/dashboard";
                //       } else if (role === "employee") {
                //         dashboardUrl = "/employee/dashboard";
                //       } else if (role === "admin") {
                //         dashboardUrl = "/admin/dashboard";
                //       }
                //       window.location.href = dashboardUrl;
                //     }}
                //   >
                //     {loading ? <img src={loadingGif} alt="Loading..." style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : userFullName !== undefined ? `Welcome ${userFullName}, ` : ""}
                //   </Button>
                //   <Button
                //     variant=""
                //     className="text-light"
                //     onClick={() => dispatch(userLogout())} >
                //     Logout
                //   </Button>
                // </>
              }



              <Modal size="lg" show={showSignUp} onHide={handleCloseSignUp}>
                <Modal.Body className="p-0">
                  <div className="hero-container">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="sing_img">
                          <img src={singUp} alt="signupImg" />
                        </div>
                      </div>
                      <div className="col-lg-6  col-md-6 col-sm-6">
                        <div className="sing_detail p-3 ps-0">
                          <Form onSubmit={handleSignUpSubmit}>
                            <h4 className="sign_title py-3 pt-5">
                              Welcome to Zorova
                            </h4>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Full Name</Form.Label>
                              <Form.Control
                                className="mb-2"
                                type="text"
                                placeholder=""
                                name="fullName"
                                required
                                onChange={onChange}
                              />
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                className="mb-2"
                                type="email"
                                placeholder=""
                                name="email"
                                required
                                onChange={onChange}
                              />
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                className="mb-2"
                                type="password"
                                placeholder=""
                                name="password"
                                required
                                onChange={onChange}
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Check
                                type="checkbox"
                                label="Accept the rules"
                                required
                              />
                            </Form.Group>

                            <Button className="sign_but" type="submit">
                              {/* <Link className="text-light" to={'/signin'}> */}
                              {loading ? <img src={loadingGif} alt="Loading..." style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : "Create An Account"}
                              {loading ? "Create An Account" : null}
                              {/* </Link> */}

                              {/* <img src={rightArrow} alt="rightArrow"/> */}
                            </Button>

                          </Form>
                          <div class="s_main">
                            <p>
                              Already have an account? <span onClick={handleShowSignIn}> Log in </span>
                            </p>
                            <h5>OR</h5>
                          </div>
                          <div class="s_but">
                            <div class="go_but mt-3">
                              <img src={GoogleIcon} alt="GoogleIcon" />
                              <button class="btn" onClick={() => Signup()} >
                                Sign up with Google
                              </button>
                            </div>
                            {/* <div class="go_but mt-3">
                              <img src={GitIcon} alt="GitIcon" />
                              <button class="btn  " type="submit">
                                Sign up with GitHub
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </li>
            <li>



              <Modal size="lg" show={showSignIn} onHide={handleCloseSignIn}>
                <Modal.Body className="p-0">
                  <div className="hero-container">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="sing_img">
                          <img src={singIn} alt="signupImg" />
                        </div>
                      </div>
                      <div className="col-lg-6  col-md-6 col-sm-6">
                        <div className="sing_detail p-3 ps-0">
                          <Form onSubmit={handleSignInSubmit}>
                            <h4 className="sign_title py-3 pt-5">
                              Hello Again
                            </h4>
                            <p className="sign_para">
                              Wellcome back you've been missed!
                            </p>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                className="mb-2"
                                type="email"
                                placeholder=""
                                name="email"
                                onChange={onChange}
                                required
                              />
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                className="mb-2"
                                type="password"
                                placeholder=""
                                name="password"
                                onChange={onChange}
                                required
                              />
                            </Form.Group>

                            <Form.Group
                              className="mb-2 d-flex"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Check type="checkbox" label="Remember me " />

                            </Form.Group>
                            <Form.Group
                              className="mb-2 d-flex justify-content-end flex-end"
                              controlId="formBasicCheckbox"
                            >
                              <Form.Label className="forgot ml-1">
                                <Link to={"/password-forget"} onClick={() => handleNavigate('/password-forget')}>Forgot password?</Link>
                              </Form.Label>
                            </Form.Group>

                            <Button className="sign_but" type="submit">
                              {loading ? <img src={loadingGif} alt="Loading..." style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : "Sign In"}
                              {loading ? "SignIn" : null}

                            </Button>
                          </Form>
                          <div class="s_main">
                            <p>
                              Not a member yet?<span onClick={handleShowSignUp}> Register Now</span>
                            </p>
                            <h5>OR</h5>
                          </div>
                          <div class="s_but">
                            <div class="go_but mt-3">
                              <img src={GoogleIcon} alt="GoogleIcon" />
                              <button class="btn  " onClick={() => login()} >
                                Sign In with Google
                              </button>
                            </div>
                            {/* <div class="go_but mt-3">
                              <img src={GitIcon} alt="GitIcon" />
                              <button class="btn  " type="submit">
                                Sign up with GitHub
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </li>
            <Link className="text-light me-2" to={"/contact"}>
              <li>Contact</li>
            </Link>
          </ul>
        </div>
      </div>
      <div class="hero-container">
        <div class="header main_header">
          <div class="head_set">
            <div class="logo">
              <Link to={"/"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <ul>
              <Link className="text-dark fw-bold px-3" to={"/massage"}>
                <li>MASSAGE</li>
              </Link>
              <Link className="text-dark fw-bold px-3" to={"/stretch"}>
                <li>STRETCH</li>
              </Link>
              <Link className="text-dark fw-bold px-3" to={"/fitness"}>
                <li>FITNESS AND WEIGHT LOSS PROGRAM</li>
              </Link>

            </ul>
          </div>
          {userRole == "user" ?
            <div class="boking_but">
              <Link to={"/booking"}>
                <button>Book An Appointment</button>
              </Link>
            </div>
            : null}

          <div class=" side_but">
            <button
              class="btn bars_but"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            >
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
            </button>

            <div
              class="offcanvas offcanvas-end"
              tabindex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div class="offcanvas-header">
                <div id="offcanvasRightLabel"></div>
                <button
                  type="button"
                  class="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <div class="side_bar">
                  <ul>
                    <Link className="text-dark fw-bold " to={"/massage"}>
                      <li>MASSAGE</li>
                    </Link>
                    <Link className="text-dark fw-bold " to={"/stretch"}>
                      <li>STRETCH</li>
                    </Link>
                    <Link className="text-dark fw-bold " to={"/fitness"}>
                      <li>FITNESS AND WEIGHT LOSS PROGRAM</li>
                    </Link>
                    <Link className="text-dark fw-bold " to={"/business"}>
                      <li>BUSINESS</li>
                    </Link>
                    <Link className="text-dark fw-bold " to={"/membership"}>
                      <li>MEMBERSHIP</li>
                    </Link>
                    <Link className="text-dark fw-bold " to={"/become-a-provider"}>
                      <li>BECOME A PROVIDER</li>
                    </Link>
                    <li>
                      <Button
                        variant=""
                        className="text-dark fw-bold p-0"
                        onClick={handleShowSignUpMobile}
                      >
                        Sign Up
                      </Button>

                      <Modal size="lg" show={showSignUpMobile} onHide={handleCloseSignUpMobile}>
                        <Modal.Body className="p-0">
                          <div className="hero-container">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="sing_img">
                                  <img src={singUp} alt="signupImg" />
                                </div>
                              </div>
                              <div className="col-lg-6  col-md-6 col-sm-6">
                                <div className="sing_detail p-3 ps-0">
                                  <Form>
                                    <h4 className="sign_title py-3 pt-5">
                                      Welcome to Zorova
                                    </h4>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="formBasicEmail"
                                    >
                                      <Form.Label>Full Name</Form.Label>
                                      <Form.Control
                                        className="mb-2"
                                        type="text"
                                        placeholder=""
                                      />
                                      <Form.Label>Email address</Form.Label>
                                      <Form.Control
                                        className="mb-2"
                                        type="email"
                                        placeholder=""
                                      />
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        className="mb-2"
                                        type="password"
                                        placeholder=""
                                      />
                                    </Form.Group>

                                    <Form.Group
                                      className="mb-3"
                                      controlId="formBasicCheckbox"
                                    >
                                      <Form.Check
                                        type="checkbox"
                                        label="Accept the rules"
                                      />
                                    </Form.Group>
                                    <Button className="sign_but" type="submit">
                                      <Link className="text-light" to={'/signin'}>
                                        Create An Account
                                      </Link>
                                    </Button>
                                  </Form>
                                  <div class="s_main">
                                    <p>
                                      Already have an account?{" "}
                                      <span> Log in</span>
                                    </p>
                                    <h5>OR</h5>
                                  </div>
                                  <div class="s_but">
                                    <div class="go_but mt-3">
                                      <img src={GoogleIcon} alt="GoogleIcon" />
                                      <button class="btn  " type="submit">
                                        Sign up with Google
                                      </button>
                                    </div>
                                    {/* <div class="go_but mt-3">
                                      <img src={GitIcon} alt="GitIcon" />
                                      <button class="btn  " type="submit">
                                        Sign up with GitHub
                                      </button>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </li>
                    <li>
                      <Button
                        variant=""
                        className="text-dark fw-bold p-0"
                        onClick={handleShowSignInMobile}
                      >
                        Sign In
                      </Button>

                      <Modal size="lg" show={showSignInMobile} onHide={handleCloseSignInMobile}>
                        <Modal.Body className="p-0">
                          <div className="hero-container">
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-6">
                                <div className="sing_img">
                                  <img src={singIn} alt="signupImg" />
                                </div>
                              </div>
                              <div className="col-lg-6  col-md-6 col-sm-6">
                                <div className="sing_detail p-3 ps-0">
                                  <Form>
                                    <h4 className="sign_title py-3 pt-5">
                                      Hello Again
                                    </h4>
                                    <p className="sign_para">
                                      Wellcome back you've been missed!
                                    </p>
                                    <Form.Group
                                      className="mb-3"
                                      controlId="formBasicEmail"
                                    >
                                      <Form.Label>Email address</Form.Label>
                                      <Form.Control
                                        className="mb-2"
                                        type="email"
                                        placeholder=""
                                      />
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        className="mb-2"
                                        type="password"
                                        placeholder=""
                                      />
                                    </Form.Group>

                                    <Form.Group
                                      className="mb-3 d-flex"
                                      controlId="formBasicCheckbox"
                                    >
                                      <Form.Check
                                        type="checkbox"
                                        label="Remember me "
                                      />

                                    </Form.Group>
                                    <Form.Group
                                      className="mb-2 d-flex justify-content-end flex-end"
                                      controlId="formBasicCheckbox"
                                    >
                                      <Form.Label className="forgot ml-1">
                                        <Link to={"/password-forget"} onClick={() => handleNavigate('/password-forget')}>Forgot password?</Link>
                                      </Form.Label>
                                    </Form.Group>
                                    <Button className="sign_but" type="submit">
                                      Sign In
                                      {/* <img src={rightArrow} alt="rightArrow"/> */}
                                    </Button>
                                  </Form>
                                  <div class="s_main">
                                    <p>
                                      Not a member yet?
                                      <span> Register Now</span>
                                    </p>
                                    <h5>OR</h5>
                                  </div>
                                  <div class="s_but">
                                    <div class="go_but mt-3">
                                      <img src={GoogleIcon} alt="GoogleIcon" />
                                      <button class="btn  " type="submit">
                                        Sign up with Google
                                      </button>
                                    </div>
                                    {/* <div class="go_but mt-3">
                                      <img src={GitIcon} alt="GitIcon" />
                                      <button class="btn  " type="submit">
                                        Sign up with GitHub
                                      </button>
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </li>
                    <Link className="text-dark fw-bold me-2" to={"/contact"}>
                      <li>CONTACT</li>
                    </Link>
                  </ul>
                  {userRole == "user" ?
                    <div class="boking_butt" onClick={() => { dispatch(setStep(0)) }}>
                      <Link to={'/booking'}>
                        <button>Book An Appointment  </button>

                      </Link>
                    </div>
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
