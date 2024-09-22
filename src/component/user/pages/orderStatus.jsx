import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProviderReviews, getAssignedOrders } from '../../features/providerSlicer';
import { addCustomerReviews, getAppointments, toggleStatus } from '../../features/customerSlicer';
import Swal from 'sweetalert2';
import moment from 'moment';
import { sendSosRequest } from '../../features/sosSlicer';
import UserSidebar from '../includes/sidebar';
import { Modal, Button } from 'react-bootstrap';
import "./trackStatus.css";

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

function OrderDetail({ user }) {
  const [countdownTime, setCountdownTime] = useState(3); // 1 hour in seconds
  const [showSOSButton, setShowSOSButton] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const assignedOrders = useSelector((state) => state.customer.Customers);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const { appointmentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredAssignedOrders = assignedOrders.filter(obj => obj._id == appointmentId);
  const [showReviewModal, setShowReviewModal] = useState(false);


  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const handleStarClick = (value, index, providerId) => {

    setRatings(value)

    // dispatch(addCustomerReviews({ providerId: providerId, appointmentId: index, ratingToProvider: value, }));
  };

  useEffect(() => {
    dispatch(getAppointments()).then((result) => {
      if (!result.error) {
        const filteredAssignedOrders1 = result.payload.filter(obj => obj._id == appointmentId);
        if (filteredAssignedOrders[0]?.status=="Started" ) {
          const start_time = new Date(filteredAssignedOrders1[0]?.start_time);
          const current_time = Date.now();
          const time = Math.round((current_time - start_time) / (1000 * 60));
          setTotalTime(filteredAssignedOrders1[0]?.serviceData[0].duration * 60);
          if (time <= filteredAssignedOrders1[0]?.serviceData[0].duration) {
            setCountdownTime((filteredAssignedOrders1[0]?.serviceData[0].duration - time) * 60);
          } else {
            setCountdownTime(0);
          }
        } else {
          setTotalTime(filteredAssignedOrders1[0]?.serviceData[0].duration * 60);
          setCountdownTime(filteredAssignedOrders1[0]?.serviceData[0].duration * 60);
        }

      }
    });
    setTriggerFetch(false);
  }, [triggerFetch]);


  const handleFinish = (data) => {
    console.log(data);
    dispatch(addCustomerReviews(data)).then((result) => {
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
    <div className="main-container">
      <UserSidebar user={user} />
      <div className='app-container'>
        <div className="app-hero-header mb-4"></div>
        <div className="app-body">

          <div className='bg-light w-100'>
            <div className="custom-modal-dialog modal-dialog-centered w-100 full-width-modal">
              <div className="custom-modal-content">
                <div className="custom-modal-header">
                  <h4 className="custom-modal-title mx-auto text-dark">Order Status <span className={'badge border bg-info'}>{filteredAssignedOrders[0]?.status}</span><br />{"FLX-" + filteredAssignedOrders[0]?._id.slice(-5).toUpperCase()}</h4>

                  <h4>
                    Appointment Date: {moment(filteredAssignedOrders[0]?.timestamp).format("YYYY-MM-DD")}
                    <br />
                    Time:  {filteredAssignedOrders[0]?.serviceData[0].start_time} - {filteredAssignedOrders[0]?.serviceData[0].end_time}
                  </h4>
                </div>

                <div className="custom-modal-body">
                  <div className="custom-progress-track">
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped bg-success"
                        role="progressbar"
                        style={{ width: `${(totalTime - countdownTime) / totalTime * 100}%`, background: '#5E17EB !important' }}
                        aria-valuenow={(totalTime - countdownTime) / totalTime * 100}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        {(Math.floor(countdownTime / 3600)).toString().padStart(2, '0')}:{(Math.floor((countdownTime % 3600) / 60)).toString().padStart(2, '0')}:{(countdownTime % 60).toString().padStart(2, '0')}
                        {/* {formatTime(remainingTime)} */}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-9">
                      <div className="custom-details d-table">
                        <div className="d-table-row">
                          <div className="d-table-cell text-dark h5">
                            Type
                          </div>
                          <div className="d-table-cell text-info h5">
                            {filteredAssignedOrders[0]?.serviceData[0]?.serviceType}
                          </div>
                        </div>
                        <div className="d-table-row">
                          <div className="d-table-cell text-dark h5">
                            Person Appointed
                          </div>
                          <div className="d-table-cell text-dark h5">
                            {filteredAssignedOrders[0]?.providerData.length > 0 ? filteredAssignedOrders[0]?.providerData[0]?.fullName : "--"}
                          </div>
                        </div>
                        <div className="d-table-row">
                          <div className="d-table-cell text-dark h5">
                            Bodygaurd Appointed
                          </div>
                          <div className="d-table-cell text-dark h5">
                            {filteredAssignedOrders[0]?.bodyguardData?.length > 0 ? filteredAssignedOrders[0]?.bodyguardData[0]?.fullName : "--"}
                          </div>
                        </div>
                      </div>
                    </div>
                    {filteredAssignedOrders[0]?.status=="Started" ? 
                     <div className="col-3">
                     <div className="d-table-row " style={{ cursor: "pointer" }} onClick={() => sosRequest(appointmentId)} >
                       <a title="SOS - Only in Case of Emergency or Any Kind of Issue"><i class="h1 bi bi-exclamation-octagon-fill text-danger"></i></a>
                     </div>
                     <div className="d-table-row">
                       <button disabled={countdownTime <= 1 ? false : true} title="Completed" className='border-0 bg-white' onClick={() => toggleReviewModal()} ><i className="h1 bi bi-check-circle-fill text-success"></i></button>
                     </div>
                   </div>
                   :null}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showReviewModal && (
          <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            {/* Modal content */}
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Review</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleReviewModal}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {/* Star rating component */}
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
                  </div>
                  {/* Add your form or content for the review here */}
                  <textarea placeholder="Enter your review/comment..." className="form-control" value={comment} onChange={(e) => { setComment(e.target.value) }} ></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={toggleReviewModal}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => { handleFinish({ appointmentId: appointmentId, providerId: filteredAssignedOrders[0]?.provider_id, ratingToProvider: ratings, commentToProvider: comment }) }}>Finish</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="card"></div>
        <div className="card"></div>
      </div>
    </div>
  );

}

export default OrderDetail;