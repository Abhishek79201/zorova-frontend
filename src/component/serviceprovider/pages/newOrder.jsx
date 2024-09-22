import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProviderReviews, getAssignedOrders, sendOtp, verifyOtp } from '../../features/providerSlicer';
import { toggleStatus } from '../../features/customerSlicer';
import Swal from 'sweetalert2';
import moment from 'moment';
import { sendSosRequest } from '../../features/sosSlicer';
let disableButton = true;
let finishButtonDisable = true;
function StarRating({ onChange }) {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div id="starRating">
      {stars.map(rating => (
        <span key={rating} onClick={() => onChange(rating)} className={`star ${rating <= onChange ? 'active' : ''}`} data-rating={rating}>
          ★
        </span>
      ))}
      <input type="hidden" name="rating" id="rating" />
    </div>
  );
}

function CashPaymentModal() {
  return (
    <div className="modal" id="cashPaymentModal" tabIndex="-1" role="dialog" aria-labelledby="cashPaymentModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cashPaymentModalLabel">Receive Cash Payment</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form id="cashPaymentForm">
              <div className="form-group">
                <label htmlFor="cashAmount">Enter Cash Amount:</label>
                <input type="number" className="form-control" id="cashAmount" required />
              </div>
            </form>

            <form id="reviewForm">
              <div className="form-group">
                <label htmlFor="reviewText">Give a Review:</label>
                <textarea className="form-control" id="reviewText" rows="4"></textarea>
              </div>
              <StarRating onChange={(rating) => $("#rating").val(rating)} />
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary" id="finishButton">Finish</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const CountdownTimer = ({ dateStr, timeStr }) => {

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (dateStr && timeStr) {
      const combinedDateTimeStr = dateStr.split('T')[0] + ' ' + timeStr;
      const targetDate = new Date(combinedDateTimeStr);

      const updateTimer = () => {
        const currentTime = Date.now();
        const timeDifferenceInSeconds = Math.floor((targetDate - currentTime) / 1000);

        if (timeDifferenceInSeconds <= 0) {
          clearInterval(timerId);
          setTimeLeft("Countdown finished!");
          disableButton = false;
        } else {
          const hours = Math.floor(timeDifferenceInSeconds / 3600);
          const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
          const seconds = timeDifferenceInSeconds % 60;

          const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          setTimeLeft(`${formattedTime}`);
        }
      };

      // Update the timer every second
      const timerId = setInterval(updateTimer, 1000);

      // Cleanup the timer on component unmount
      return () => clearInterval(timerId);
    }


  }, [dateStr, timeStr]);

  return <div className="countdown d-none" id="countdown">{timeLeft}</div>;
};

function NewOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const [countdownTime, setCountdownTime] = useState(0);
  const [showSOSButton, setShowSOSButton] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState();
  const assignedOrders = useSelector((state) => state.provider.assignedOrders);
  const filteredAssignedOrders = assignedOrders.filter(obj => obj._id == appointmentId);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const sosLoading = useSelector((state) => state.sos.loading);
  const providerLoading = useSelector((state) => state.provider.loading);
  const customerLoading = useSelector((state) => state.customer.loading);


  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleStarClick = (value, index, providerId) => {

    setRatings(value)

    // dispatch(addCustomerReviews({ providerId: providerId, appointmentId: index, ratingToProvider: value, }));
  };

  useEffect(() => {
    dispatch(getAssignedOrders()).then((result) => {
      if (!result.error) {
        const filteredAssignedOrders1 = result.payload.filter(obj => obj._id == appointmentId);
        const start_time = new Date(filteredAssignedOrders1[0]?.start_time);
        const current_time = new Date(); // Get the current time in the local time zone
        console.log(start_time);
        console.log(current_time);
        const time = Math.round((current_time - start_time) / (1000 * 60));
        console.log(time);
        if (time >= 0 && time <= filteredAssignedOrders1[0]?.serviceData[0].duration) {
          setCountdownTime((filteredAssignedOrders1[0]?.serviceData[0].duration - time) * 60);
        } else {
          setCountdownTime(0);
        }
      }
    });
    setTriggerFetch(false);
  }, [triggerFetch]);

  const updateStarRating = (rating) => {
    const stars = [...document.getElementsByClassName('star')];
    stars.forEach((star) => {
      const starRatingValue = parseInt(star.getAttribute('data-rating'));
      if (starRatingValue <= rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  };

  const handleStatusChange = async (id, status) => {
    const swalResult = await Swal.fire({
      title: 'Status Confirmation',
      text: `Are you sure you want to make Order ${status}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${status}`
    });

    if (swalResult.isConfirmed) {
      dispatch(toggleStatus({ id: id, status: status })).then((result) => {
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `Order Status Updated`
          });
          setTriggerFetch(true);
          if (status == "Started") {
            setCountdownTime(filteredAssignedOrders[0]?.serviceData[0].duration * 60);
            return;
          } else if (status == "Finished") {
            navigate("/provider/assigned-orders");
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${result.error.message}`
          });
          setTriggerFetch(true);
        }
      });
    } else {
      // User clicked Cancel or closed the dialog
      return null;
    }
  }

  const handleFinish = (data) => {
    console.log(data);
    dispatch(addProviderReviews(data)).then((result) => {
      if (!result.error) {
        dispatch(toggleStatus({ id: data.appointmentId, status: "Finished" })).then((result) => {
          if (!result.error) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: `Order Finished Successfully`
            });
            navigate("/provider/assigned-orders");
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: `${result.error.message}`
            });
          }
        });
      }
    });
  }

  const sosRequest = async (appointmentId) => {
    const swalResult = await Swal.fire({
      title: 'SOS Request',
      text: `Are you sure you want to make SOS Request?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes`
    });

    if (swalResult.isConfirmed) {
      dispatch(sendSosRequest(appointmentId)).then((result) => {
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: `SOS Request Sent Successfully`
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${result.error.message}`
          });
        }
      });
    } else {
      return null;
    }
  }


  // const startCountdown = () => {
  //   let intervalId = setInterval(() => {
  //     setCountdownTime((prevTime) => prevTime - 1);
  //   }, 1000);

  //   setTimeout(() => {
  //     setShowSOSButton(true);
  //     clearInterval(intervalId);
  //   }, countdownTime * 1000);
  // };

  useEffect(() => {
    if (filteredAssignedOrders[0]?.status == "Started") {
      const intervalId = setInterval(() => {
        if (countdownTime > 0) {
          setCountdownTime((prevTime) => prevTime - 1);
        } else {
          setShowSOSButton(true);
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }
  }, [countdownTime, filteredAssignedOrders]);

  return (
    <div className="col-12">
      <div className="card mb-3">
        <div className="card-header">
          <h4 className="card-title" >Order Detail</h4>
        </div>
        <div className="card-body">
          <div className="container text-center mt-1">
            <h2 className="text-info">{filteredAssignedOrders[0]?.serviceData[0]?.serviceType}</h2>
          </div>

          <div className="container text-center">
            <h2>Client Details</h2>
            <p>
              Client Name: {filteredAssignedOrders[0]?.customerData[0].fullName}

              Client Address: {filteredAssignedOrders[0]?.customerData[0].addressLine1}

              Phone Number: {filteredAssignedOrders[0]?.customerData[0].phone} <br />
              Start Time:  {moment(filteredAssignedOrders[0]?.serviceData[0].date).format('DD-MM-YYYY')} - {filteredAssignedOrders[0]?.serviceData[0].start_time}
            </p>
            <div>
              <h2>Payment: {filteredAssignedOrders[0]?.cost}</h2>
            </div>
          </div>



          <div className="container countdown-container">
            <h2 className="countdown-title">Time Remaining</h2>
            <CountdownTimer dateStr={filteredAssignedOrders[0]?.serviceData[0]?.date} timeStr={filteredAssignedOrders[0]?.serviceData[0]?.start_time} />
            <div className="countdown" id="countdown">{(Math.floor(countdownTime / 3600)).toString().padStart(2, '0')}:{(Math.floor((countdownTime % 3600) / 60)).toString().padStart(2, '0')}:{(countdownTime % 60).toString().padStart(2, '0')}</div>
          </div>

          <div className="container start-now-button-container">
            {
              filteredAssignedOrders[0]?.status == "Started" ?
                <button className="btn btn-success btn-lg" disabled={countdownTime <= 1 ? false : true} data-toggle="modal" data-target="#cashPaymentModal" onClick={() => toggleReviewModal()}>Finish</button> :
                otpSent ?
                  <div className='flex gap'>
                    <input type="text" className='w-25 border border-dark' onChange={(event) => setOtp(event.target.value)} />
                    <button className="btn btn-primary btn-lg" disabled={disableButton} id="startNowButton" onClick={() => { dispatch(verifyOtp({ appointmentId: filteredAssignedOrders[0]?._id, otp: otp })).then((result) => { if (!result.error) { setTriggerFetch(true) } }); }} >{providerLoading ? "loading..." : "Verify & Start Now"}</button>
                  </div>
                  :
                  <button className="btn btn-primary btn-lg" disabled={disableButton} id="startNowButton"
                    onClick={() => { dispatch(sendOtp({ appointmentId: filteredAssignedOrders[0]?._id })).then((result) => { if (!result.error) { setOtpSent(true) } }); }}
                  >{providerLoading ? "laoding..." : "Send OTP"}</button>
            }
          </div>
          {filteredAssignedOrders[0]?.status == "Started" ?
            <div className="container " id="" >
              <button className="btn btn-danger btn-lg" id="sosButton" onClick={() => { sosRequest(appointmentId) }} > {sosLoading ? "Loading..." : "Need Help?"}</button>
            </div> : null
          }
          <CashPaymentModal />
        </div>
      </div>
      {showReviewModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          {/* Modal content */}
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cashPaymentModalLabel">Give a Review:</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => toggleReviewModal()} >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <form id="reviewForm">
                  <div className="form-group">
                    <label htmlFor="reviewText">Comment:</label>
                    <textarea className="form-control" id="reviewText" rows="4" value={comment} onChange={(e) => { setComment(e.target.value) }}></textarea>
                  </div>
                  <div className="star-rating">
                    {/* {console.log("Ratingg:",ratings)} */}
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        style={{ cursor: "pointer" }}
                        key={value}
                        className={`h2 star ${ratings >= value ? 'text-warning' : ''}`}
                        onClick={() => handleStarClick(value)}
                      >
                        ★
                      </span>
                    ))}
                  </div>                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => toggleReviewModal()}>Cancel</button>
                <button type="button" className="btn btn-primary" id="finishButton" onClick={() => { handleFinish({ customerId: filteredAssignedOrders[0]?.customerData[0]._id, appointmentId: filteredAssignedOrders[0]?._id, ratingToCustomer: ratings, commentToCustomer: comment }) }} > {providerLoading || customerLoading ? "Loading.." : "Finish"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewOrder;