import React from "react";
import massage from "../assets/image/massage 02 1.png";
import massage1 from "../assets/image/massage 03 1.png";
import massage2 from "../assets/image/massage 04 1.png";
import { Link } from "react-router-dom";


function Massage() {
  return (
    <>
    
      <div class="hero-container">
        <div class="massage_banner">
          <div class="container pt-5 pb-5">
            <center class="massage_tital pt-3">
              <h1>
                Nurture Yourself – <span> Body</span>,<span>Mind</span>,and{" "}
                <span>Sōl</span> .
              </h1>
              <h3>
                Your Home, Your Workplace or Our Center - The Choice is Yours!"
              </h3>
            </center>
            <div class="row pt-5 pb-5">
              <div class="col-lg-5 col-md-8 col-sm-12">
                <div class="massage_text">
                  <p>
                    Massage isn't just about relaxation – it's a holistic
                    approach to nurturing the body, mind, and spirit
                  </p>
                  <Link to="/booking">
                    <button class="custom_but">Book An Appointment</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="massage_banner_bg">
          <div class="container">
            <p class="massage_banner_text">
              In the hustle and bustle of modern life, where stress, tension,
              and the demands of daily living take a toll on our well-being, the
              ancient system of Ayurveda offers a timeless solution: the art of
              Massage.
            </p>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="container">
          <div class="balance_box">
            <h1>Balancing Doshas</h1>
            <p>
              Ayurveda is based on the concept of doshas (Vata, Pitta, Kapha),
              and massage is tailored to balance these doshas. It helps restore
              equilibrium, promoting overall health
            </p>
            <div class="balance_list">
              <ul>
                <li>Stress Reduction</li>
                <li>Enhanced Flexibility</li>
                <li>Boosted Immunity</li>
                <li>Improved Digestion</li>
                <li>Mental Clarity</li>
              </ul>
              <ul>
                <li>
                  Improved Blood
                  <br />
                  Circulation
                </li>
                <li>Skin Health</li>
                <li>Pain Relief</li>
                <li>Preventive Care</li>
              </ul>
              <ul>
                <li>Detoxification</li>
                <li>Better Sleep Quality</li>
                <li>
                  Mind-Body
                  <br />
                  Connection
                </li>
                <li>Holistic Healing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container">
        <div class="massage_banner woman_mass"></div>
      </div>
      <div class="hero-container">
        <div
          class="massage_banner_bg massage_banner_bg1"
          
        >
          <div class="container">
            <p class="massage_banner_text massage_banner_text1 " >
              With an estimated 463 million adults living with diabetes
              worldwide as of 2019, the prevalence continues to rise. Massage
              therapy can offer valuable benefits to individuals with diabetes,
              Massage isn't just relaxation; it's an ally in your fight for
              balance. Experience improved insulin sensitivity Stress reduction
              for stable glucose levels Enhanced circulation Relief from
              neuropathic discomfort.
            </p>
          </div>
        </div>
      </div>
      <div class="hero-container pt-5 pb-5">
        <div class="balance_box trans_form">
          <h1>The Transformative Power of Massage across Ages</h1>
          <p>
            From the playful giggles of children to the seasoned wisdom of the
            elderly, massage has the remarkable ability to bring health and
            vitality to every stage of life
          </p>

          <div class="massage_banner men_bg"></div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 line_time">
              <section class="main-timeline-section">
                <div class="conference-center-line"></div>
                <div class="conference-timeline-content">
                  <div class="timeline-article timeline-article-top">
                    <div class="meta-date"></div>
                    <h4>For Children</h4>
                    <div class="content-box">
                      <p>
                        Promotes Growth Enhances Bonding Relieves Discomfort
                      </p>
                    </div>
                  </div>
                  <div class="timeline-article timeline-article-top">
                    <div class="meta-date"></div>
                    <h4 class="adole_text">
                      For Adolescents
                      <br />& Teens
                    </h4>
                    <div class="content-box">
                      <p>
                        Stress Relief Healthy Body Image Healthy Mind Muscle
                        Development
                      </p>
                    </div>
                  </div>
                  <div class="timeline-article timeline-article-top">
                    <div class="meta-date"></div>
                    <h4>For Adults</h4>
                    <div class="content-box">
                      <p>
                        Stress Reduction Pain Management Improved Sleep Quality
                      </p>
                    </div>
                  </div>

                  <div class="timeline-article timeline-article-top">
                    <div class="meta-date"></div>
                    <h4>For seniors</h4>

                    <div class="content-box">
                      <p>Joint Mobility Circulatory Health Mental Wellness:</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-container pt-5">
        <center>
          <h1 class="type_heading">Types of massages</h1>
        </center>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6  ps-0 pe-0">
            <div class="type_1detail">
              <h1>Medical Massage</h1>
              <p>
                Your well-being is our priority. Our medical massages are
                tailored to address specific health needs, working in harmony
                with your treatment plan. Trust our skilled therapists to
                provide focused care that supports your body's healing journey
              </p>
            </div>
          </div>
          <div class="col-lg-6 ps-0 pe-0">
            <div class="type_1img">
              <img src={massage} alt="massage" />
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 ps-0 pe-0">
            <div class="type_1img">
              <img src={massage1} alt="massage1" />
            </div>
          </div>
          <div class="col-lg-6  ps-0 pe-0">
            <div class="type_1detail">
              <h1>Natural Massage</h1>
              <p>
                Gentle as a whisper, our natural massages are a delicate dance
                of relaxation. Like a soft breeze on a summer day, these tender
                touches guide you to a realm of serenity. Let stress dissolve
                and your body find harmony, as our skilled therapists bring you
                the gift of pure tranquility
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6  ps-0 pe-0">
            <div class="type_1detail">
              <h1>Deep Massage</h1>
              <p>
                Plunge into profound relaxation with our deep massage
                experience. Let skilled hands target tension and knots,
                unlocking a renewed sense of well-being. Feel the stresses of
                life melt away as you emerge refreshed and revitalized
              </p>
            </div>
          </div>
          <div class="col-lg-6 ps-0 pe-0">
            <div class="type_1img">
              <img src={massage2} alt="massage2" />
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

export default Massage;
