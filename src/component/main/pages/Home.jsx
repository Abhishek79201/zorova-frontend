import React from "react";
import { Link, useNavigate } from "react-router-dom";
import mainBN1 from "../assets/image/bg-back.png";
import mainBN2 from "../assets/image/FEMALE 02 1.png";
import Vector from "../assets/image/Vector.png";
import Vector1 from "../assets/image/Vector1.png";
import Vector2 from "../assets/image/Vector2.png";
import MANMASSAGE from "../assets/image/MAN MASSAGE 1.png";
import FEMALE from "../assets/image/FEMALE.png";
import Swal from "sweetalert2";


function Home() {
  const session_url=localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const handleGetStarted = ()=>{
    if(!session_url){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Please Sign In First!`
      });
    }else{
      navigate('/booking');
    }
  }
  return (
    <>

      <div class="container">
        <div class="row pt-5 pb-5">
          <div class="col-lg-6 ">
            <div class="banner_text">
              <h1>
                Discover the Art of Living Well: Embrace a Balanced Approach to
                Wellness
              </h1>
              <p>
                Are you searching for a haven of relaxation, a sanctuary for
                rejuvenation, and a place to embark on your journey to better
                health? Look no further than Zorova. We are dedicated to
                providing you with a holistic approach to well-being that
                encompasses massage therapy, stretching, fitness and weight loss
                programs through naturopathy and modern technologies under one
                roof
              </p>
              <p 
              onClick={handleGetStarted}
              >
              <button class="custom_but">Get Started</button>
              </p>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="banner_img">
              <div class="bg_img">
                <center>
                  <img class="bg_banner" src={mainBN1} alt="mainBN1" />
                  <img class="bg_banner1" src={mainBN2} alt="mainBN2" />
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid emb_div">
        <div class="row pt-5 pb-5 ms-0 me-0">
          <div class="emb_text">
            <h3>
              Embrace the Ease of Pain Relief and Rehabilitation: Your Home,{" "}
              <br />
              Your Workplace or Our Center - The Choice is Yours!
            </h3>
          </div>
        </div>
      </div>
      <div class="container mini_div">
        <div class="row ms-0 me-0">
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="emb_mini">
              <img src={Vector} alt="Vector" />
              <h4>Massage</h4>
              <p>
                Embrace a Pain-Free You: Wave Goodbye to Aches and Pains with
                Exquisitely Crafted Massage Sessions!
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="emb_mini">
              <img src={Vector1} alt="Vector1" />
              <h4>STRETCH </h4>
              <p>
                Unlock Your Full Flexibility: Our Customized Stretch Sessions
                Focus on Your Unique Needs to Target Your Unique Tensions and
                Unleash Your Full Potential!
              </p>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 col-sm-12">
            <div class="emb_mini">
              <img src={Vector2} alt="Vector2" />
              <h5>Fitness and Weight Loss programs</h5>
              <p>
                Revitalize Your Lifestyle, Discover the Path to a Healthier You:
                Experience our expertly crafted fitness and weight loss journey!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row pt-5 ">
          <div class="col-lg-6 col-md-12 col-sm-12 p-0">
            <div class="men_img">
              <img src={MANMASSAGE} alt="MAN MASSAGE" />
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12 ">
            <div class="men_baner">
              <div class="men_text p-5">
                <h1>HEALTHY LIVING, BEAUTIFUL BEING</h1>
                <p>
                  where the pursuit of wellness and beauty intertwines for a
                  healthier and more vibrant you. Embrace the swasth (healthy)
                  and sundar (beautiful) version of yourself. With this program,
                  we are committed to guiding you on a transformative journey
                  towards optimal health and a stunning you. Our personalized
                  training provides you a comprehensive and results-driven
                  approach to wellness.{" "}
                </p>
                <Link to={'/join-program'}>
                  <button class="custom_but">Join Our Program</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid emb_div1">
        <div class="row pt-5 pb-5 ms-0 me-0">
          <div class="emb_text sec_text">
            <h3>
              If your daily routine includes wincing, we suggest a new one
            </h3>
            <h5>
              A routine of regular massage therapy can have real, long-lasting
              health benefits
            </h5>
          </div>
        </div>
      </div>
      <div class="container-fluid ps-0 pe-0">
        <div class="men_banner"></div>
      </div>
      <div class="container-fluid ps-0 pe-0">
        <div class="timeLine">
          <div class="timel_text">
            <h4>For Child</h4>
            <p>A strong foundation for a healthy lifestyle.</p>
          </div>
          <div class="line">
            <hr class="line_1" />
          </div>
          <div class="round">
            <div class="mini_round"></div>
          </div>
          <div class="timel_img"></div>
        </div>
        <div class="timeLine1">
          <div class="timel_img1"></div>

          <div class="round1">
            <div class="mini_round"></div>
          </div>
          <div class="line">
            <hr class="line_2" />
          </div>

          <div class="timel_text1">
            <h4>For Youth</h4>
            <p>
              relieving tension, promoting mental clarity, stay active,
              <br /> build resilience, and cultivate a strong body and mind.
            </p>
          </div>
        </div>
        <div class="timeLine">
          <div class="timel_text">
            <h4>For Adult</h4>
            <p>
              a much-needed escape from daily pressures, relieving muscle
              tension and restoring vitality
            </p>
          </div>
          <div class="line">
            <hr class="line_1" />
          </div>
          <div class="round">
            <div class="mini_round"></div>
          </div>
          <div class="timel_img timel_img2"></div>
        </div>
        <div class="timeLine1">
          <div class="timel_img1 timel_img3"></div>

          <div class="round1">
            <div class="mini_round"></div>
          </div>
          <div class="line">
            <hr class="line_2" />
          </div>

          <div class="timel_text1">
            <h4>For Old</h4>
            <p>
              alleviate muscle stiffness, joint discomfort, and enhance
              circulation, promoting mobility and improve balance, strength, and
              flexibility.
            </p>
          </div>
        </div>
      </div>
      <div class="container-fluid ps-0 pe-0 er_div">
        <div class="row pt-5 ">
          <div class="col-lg-7 col-md-12 col-sm-12 p-0">
            <div class="women_img">
              <img src={FEMALE} alt="FEMALE" />
            </div>
          </div>
          <div class="col-lg-5 col-md-12 col-sm-12 p-0 ">
            <div class="women_baner">
              <div class="women_text">
                <h2>Become a Member</h2>
                <h3 >
                  <span >"</span>Restore
                  Your Best. Rejuvenate
                  <br /> Your Best. Repeat.
                </h3>
                <p>
                  At Zorova, were dedicated to simplifying your well-being
                  journey. Become a valued member and open the door to a world
                  of exclusive benefts. Enjoy personalized massage sessions at
                  reduced rates, making monthly maintenance a delightful
                  experience{" "}
                </p>
                <Link to={'/become-a-member'} >
                  <button class="custom_but">Become A Member</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid ps-0 pe-0">
        <div class="review_div">
          <h1>Revive Your Spark</h1>
          <Link to={"/booking"}>
            <button class="custom_but">Book An Appointment</button>
          </Link>
        </div>
      </div>
      
    </>
  );
}

export default Home;
