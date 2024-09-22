import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProviderReviews, getAssignedOrders } from '../../features/providerSlicer';
import { toggleStatus } from '../../features/customerSlicer';
import Swal from 'sweetalert2';
import moment from 'moment';

export default function Review() {

  const assignedOrders = useSelector((state) => state.provider.assignedOrders);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const [ appointmentId, setAppointmentId ] = useState("");
  const [customerId, setCustomerId]=useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const filteredData = assignedOrders.filter(item => item.rating > 0 ||  item.commentToProvider !== "");
  const loading = useSelector((state) => state.provider.loading);




  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };
  const showModal = (appointmentId, customerId) => {
    setShowReviewModal(!showReviewModal);
    setAppointmentId(appointmentId);
    setCustomerId(customerId);
  };
  const handleStarClick = (value, index, providerId) => {

    setRatings(value)

    // dispatch(addCustomerReviews({ providerId: providerId, appointmentId: index, ratingToProvider: value, }));
  };

  useEffect(() => {
    dispatch(getAssignedOrders());
    setTriggerFetch(false);
  }, [triggerFetch]);

  const handleSubmitReview = (data) => {
    console.log(data);
    dispatch(addProviderReviews(data)).then((result) => {
      // if (!result.error) {
      //   dispatch(toggleStatus({ id: data.appointmentId, status: "Finished" })).then((result) => {
      if (!result.error) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Review Given Successfully`
        });
        setShowReviewModal(!showReviewModal);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${result.error.message}`
        });
        setShowReviewModal(!showReviewModal);
      }
      // });
      // }
    });
  }

  return (
    <div className="container-fluid">
      <div className="col-12">
        <div className="card mb-3">
          <div className="card-header">
            <h4 className="card-title">My Rating</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="border-dark rounded-3">
                <table
                  id="data-table"
                  className="table align-middle table-striped table-hover m-0"
                >
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Customer ID</th>
                      <th>Order ID</th>
                      <th>Name</th>
                      <th>Comment</th>
                      <th>Service Type</th>
                      <th>Phone</th>
                      <th>Address</th>
                      <th>Rating</th>
                      <th>Customer Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? "loading...":  filteredData?.map((item, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>#{item.customerData[0]._id.slice(-5).toUpperCase()}</td>
                        <td>#{"FLX-" + item._id.slice(-5).toUpperCase()}</td>
                        <td>
                          <a href="#" className="text-red">
                            {item.customerData[0].fullName}
                          </a>
                        </td>
                        <td>{item.commentToProvider}</td>
                        <td className="h6">{item.service == "Fitness" ? "Fitness" : item.serviceData[0].serviceType}</td>
                        <td>{item.customerData[0].phone}</td>
                        <td>{item.customerData[0].addressLine1}</td>
                        <td>
                          {item.ratingToProvider && item.ratingToProvider != 0 ? (
                            <div className="star-rating">
                              {[1, 2, 3, 4, 5].map((value, index) => (
                                <span
                                  key={value}
                                  className={`star ${item?.ratingToProvider <= index ? '' : 'text-info'}`}
                                // onClick={() => handleStarClick(item._id, value, item.providerData[0]._id)}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          ) : (
                            <div className="star-rating">
                              {[1, 2, 3, 4, 5].map((value) => (
                                <span key={value}>★</span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td>
                          <a className="btn btn-info btn-sm" onClick={()=>{showModal(item._id, item.customerData[0]._id)}}>
                            <i className="bi bi-pencil" />
                            Add Comment
                          </a>
                        </td>
                      </tr>
                    ))}

                    {/* <tr>
                      <td>2</td>
                      <td>#00002</td>
                      <td>#00001</td>
                      <td>
                        <a href="#" className="text-red">
                          Nathan
                        </a>
                      </td>
                      <td>Outstanding Experience</td>
                      <td className="h6">Natural Massage</td>
                      <td>+918-119-88790</td>
                      <td>H 152/d, Bihar</td>
                      <td>
                        <div id="starRating" className="star-rating">
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={1}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={2}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={3}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={4}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={5}
                          >
                            ★
                          </span>
                        </div>
                      </td>
                      <td>
                        <a className="btn btn-info btn-sm" href="#">
                          <i className="bi bi-pencil" />
                          Add Comment
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>#00003</td>
                      <td>#00001</td>
                      <td>
                        <a href="#" className="text-red">
                          Kelly
                        </a>
                      </td>
                      <td>Outstanding Experience</td>
                      <td className="h6">Medical Massage</td>
                      <td>+915-117-88763</td>
                      <td>H 152/d, Bihar</td>
                      <td>
                        {" "}
                        <div id="starRating" className="star-rating">
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={1}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={2}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={3}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={4}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={5}
                          >
                            ★
                          </span>
                        </div>
                      </td>
                      <td>
                        <a className="btn btn-info btn-sm" href="#">
                          <i className="bi bi-pencil" />
                          Add Comment
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>#00005</td>
                      <td>#00001</td>
                      <td>
                        <a href="#" className="text-red">
                          Kevin
                        </a>
                      </td>
                      <td>Outstanding Experience</td>
                      <td className="h6">Fitness Program</td>
                      <td>+915-667-99808</td>
                      <td>H 152/d, Bihar</td>
                      <td>
                        {" "}
                        <div id="starRating" className="star-rating">
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={1}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={2}
                          >
                            ★
                          </span>
                          <span
                            style={{ color: "goldenrod" }}
                            className="star"
                            data-rating={3}
                          >
                            ★
                          </span>
                        </div>
                      </td>
                      <td>
                        <a className="btn btn-info btn-sm" href="#">
                          <i className="bi bi-pencil" />
                          Add Comment
                        </a>
                      </td>
                    </tr> */}
                  </tbody>
                </table>
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
                  <h5 className="modal-title">Add Review - {appointmentId}</h5>
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
                  <button type="button" className="btn btn-primary" id="finishButton" onClick={() => { handleSubmitReview({ customerId: customerId, appointmentId: appointmentId, ratingToCustomer: ratings, commentToCustomer: comment }) }} >Finish</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  )
}
