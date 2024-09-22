import React, { useEffect, useState } from 'react'
import UserSidebar from '../includes/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomerReviews, getAppointments, getCustomerReviews, toggleStatus } from '../../features/customerSlicer';
import moment from 'moment';
import Swal from 'sweetalert2';
import loadingGif from '../../../loading.gif';
import { cancelService } from '../../features/bookingSlicer';
import { useNavigate } from 'react-router-dom';





export default function UserOrders({ user }) {
  const navigate=useNavigate();
  const appoinments = useSelector((state) => state.customer.Customers);
  // const reviews = useSelector((state) => state.customer.Reviews);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment]=useState("");
  const [appointmentId, setAppointmentId]=useState("");
  const [providerId, setProviderId]=useState("");
  const loading = useSelector((state) => state.user.loading);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // console.log(reviews);
  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal);
  };

  const showModal = (appointmentId, providerId) => {
    setShowReviewModal(!showReviewModal);
    setAppointmentId(appointmentId);
    setProviderId(providerId);
  };

  // useEffect(() => {
  //   if (reviews && reviews.length > 0) {
  //     const initialRatings = {};
  //     reviews.forEach(review => {
  //       initialRatings[review.appointmentId] = review.ratingToProvider;
  //     });
  //     setRatings(initialRatings);
  //   }
  // }, [reviews]);

  // useEffect(() => {
  //   // Initialize DataTable
  //   const dataTable = $("#data-table").DataTable({
  //     select: {
  //       style: 'multi',
  //     },


  //   });

  //   // Ensure that DataTable is destroyed when the component is unmounted
  //   return () => {
  //     dataTable.destroy();
  //   };
  // }, []); 





  const handleStarClick = (value,index, providerId) => {
    
   setRatings(value)
    
    // dispatch(addCustomerReviews({ providerId: providerId, appointmentId: index, ratingToProvider: value, }));
  };

  const handleReview = (data) => {
    dispatch(addCustomerReviews(data)).then((result) => {
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
          }
    });
  }
  const pendingOrders = appoinments.filter(item => item.status === 'Pending').length;
  const completedOrders = appoinments.filter(item => item.status === 'Completed' || item.status === 'Finished').length;
  const dispatch = useDispatch();

  // Fetch records when the component mounts
  useEffect(() => {
    dispatch(getAppointments());
    // dispatch(getCustomerReviews());
    setTriggerFetch(false);
  }, [dispatch, triggerFetch]);

  const handleStatus = (id, msg, status) => {
    Swal.fire({
      title: `Warning`,
      text: `${msg}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff', // Bootstrap's primary color
      cancelButtonColor: '#dc3545', // Bootstrap's danger color
      confirmButtonText: '<i class="fa fa-check"></i> Yes!',
      cancelButtonText: 'Cancel',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-danger mx-2 px-4 py-2 rounded text-white',
        cancelButton: 'btn btn-secondary mx-2 px-4 py-2 rounded'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(toggleStatus({id: id, status: status})).then((result)=>{
          if(!result.error){
              Swal.fire({
                  icon: 'success',
                  title: 'Success',
                  text: `Order Status Updated`
                });
                setTriggerFetch(true);
          }else{
              Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: `${result.error.message}`
                });
                setTriggerFetch(true);
          }
      });
      };
    });
  };


  

  const handleCancelService = async (id) => {
    // Use SweetAlert to confirm cancellation
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel the service. Do you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    });

    // If user confirms, dispatch the cancelService action
    if (result.isConfirmed) {
      try {
        // Dispatch the cancelService action with the serviceId
        dispatch(cancelService(id));

        // Show success message with SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Service Canceled!',
          text: 'The service has been successfully canceled.',
        });

        // Additional actions after cancellation if needed
      } catch (error) {
        // Handle errors, and show an error message with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while canceling the service.',
        });
      }
    }
  };


  return (
    <div className="main-container">
      <UserSidebar user={user} />
      {/* App container starts */}
      <div className="app-container">
        {/* App hero header starts */}
        <div className="app-hero-header mb-4"></div>
        {/* App Hero header ends */}
        {/* App body starts */}
        <div className="app-body">
          {/* Row start */}
          <div className="row gx-3">
            <div className="col-12">
              <div className="card mb-3 grd-primary">
                <div className="card-body bg-hexagon">
                  {/* Row start */}
                  <div className="row g-4">
                    <div className="px-0 border-end col-xl-3 col-lg-6 col-sm-6">
                      <div className="text-center text-white">
                        <p className="m-0 small">Total Orders</p>
                        <h3 className="my-2">{appoinments.length}</h3>

                      </div>
                    </div>
                    <div className="px-0 border-end col-xl-3 col-lg-6 col-sm-6">
                      <div className="text-center text-white">
                        <p className="m-0 small">New Order</p>
                        <h3 className="my-2">{pendingOrders}</h3>

                      </div>
                    </div>
                    <div className="px-0 border-end col-xl-3 col-lg-6 col-sm-6">
                      <div className="text-center text-white">
                        <p className="m-0 small">Pending Order</p>
                        <h3 className="my-2">{pendingOrders}</h3>

                      </div>
                    </div>
                    <div className="px-0 col-xl-3 col-lg-6 col-sm-6">
                      <div className="text-center text-white">
                        <p className="m-0 small">Completed</p>
                        <h3 className="my-2">{completedOrders}</h3>

                      </div>
                    </div>
                  </div>
                  {/* Row end */}
                </div>
              </div>
            </div>
          </div>
          {/* Row end */}
          {/* Row start */}
          <div className="row gx-3">
            <div className="col-xxl-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="table-responsive">
                    <table id="data-table" className="table align-middle table-hover m-0">
                      <thead>
                        <tr>
                          <th scope="col">Service</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Start Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Person Appointed</th>
                          <th scope="col">Review</th>
                          <th scope="col" />
                        </tr>
                      </thead>
                      {loading ? "loading..." : (
                        <tbody>
                          {appoinments.map((item, index) => {
                            const review ="";
                            return (
                              <tr className="grd-primary-light">
                                <td> {item.service}</td>
                                <td>INR {item.cost}</td>
                                <td>
                                  {item.service === "Fitness"
                                    ? "--:--:--"
                                    : moment(item.serviceData[0].date).format('DD-MM-YYYY') + ' ' + item.serviceData[0].start_time
                                  }
                                </td>
                                <td style={{ cursor: 'pointer' }} onClick={() => handleStatus(item._id, item.status == "Canceled" ? "Are you sure you want to make appointment!" : "Are you sure you want to Cancel Appointment!", "Canceled")} >
                                  <span className={`badge border ${item.status === "Canceled" ? 'bg-danger' :
                                    item.status === "Completed" ? 'bg-success' : 'bg-info'
                                    }`}>
                                    {item.status}
                                  </span>
                                </td>
                                <td>
                                  <b>{item.providerData[0] ? item.providerData[0].fullName : "Soon Appointed..."}</b>
                                </td>
                                <td>
                                  {item.ratingToCustomer && item.ratingToCustomer!=0 ? (
                                    <div className="star-rating">
                                      {[1, 2, 3, 4, 5].map((value, index) => (
                                        <span
                                          key={value}
                                          className={`star ${item?.ratingToCustomer <= index ? '' : 'text-info'}`}
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

                                  <a
                                    className="btn btn-success btn-sm"
                                    href={`/user/view-invoice?id=${item._id}`}
                                  >
                                    <i className="bi bi-eye" /> View
                                  </a>
                                  <a className="btn btn-info btn-sm" href="#" onClick={()=>{showModal(item?._id, item?.providerData[0]._id)}}>
                                    <i class="bi bi-layout-text-sidebar-reverse"></i> Add Review
                                  </a>

                                  <a className="btn btn-danger btn-sm" href="#" onClick={()=>handleCancelService(item._id)}>
                                    <i className="bi bi-x-circle" /> Cancel
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      )}

                    </table>
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
                                  style={{cursor:"pointer"}}
                                    key={value}
                                    className={`h2 star ${ratings >= value ? 'text-warning' : ''}`}
                                    onClick={() => handleStarClick(value)}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>

                              {/* Add your form or content for the review here */}
                              <textarea placeholder="Enter your review/comment..." className="form-control" value={comment} onChange={(e)=>{setComment(e.target.value)}} ></textarea>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={toggleReviewModal}>Close</button>
                              <button type="button" className="btn btn-primary" onClick={()=>{handleReview({ appointmentId:appointmentId, providerId:providerId, ratingToProvider:ratings, commentToProvider:comment })}}>Submit Review</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Row end */}
        </div>
        {/* App body ends */}
        {/* App footer start */}
        <div className="app-footer">
          <span>© Flexiva 2023</span>
        </div>
        {/* App footer end */}
      </div>
      {/* App container ends */}
    </div>

  )
}
