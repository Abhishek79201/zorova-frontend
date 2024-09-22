/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { useDispatch, useSelector } from 'react-redux';
import { StoreLocation, getAssignedOrders, statData, statusUpdate } from "../../features/providerSlicer";
import moment from 'moment';
import { Link } from 'react-router-dom';

const ProviderDashboard = ({ user }) => {
  const dispatch = useDispatch();
  const loading= useSelector((state)=>state.provider.loading);
  const [status, setStatus] = useState(() => {
    return user?.availability || 'UnAvailable';
  });
  const data= useSelector((state)=>state.provider.stats);
  const assignedOrders = useSelector((state) => state.provider.assignedOrders);
  const filteredAssignedOrders = assignedOrders.filter(obj => obj.status == "Assigned");
  const completedOrders = assignedOrders.filter(obj => obj.status == "Finished");
  const totalAcceptedOrders = assignedOrders.filter(obj => obj.status !== "Assigned" );

  // Retrieve previous latitude and longitude from localStorage or set to 0 if not found
  let previousLatitude = parseFloat(localStorage.getItem('previousLatitude')) || 0;
  let previousLongitude = parseFloat(localStorage.getItem('previousLongitude')) || 0;

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const totalPendingCost = completedOrders.reduce((accumulator, order) => {
    if (order.paymentToProviderStatus == "Pending") {
      return accumulator + order.cost;
    }
    return accumulator;
  }, 0);

  const totalAvailableCost = completedOrders.reduce((accumulator, order) => {
    if (order.paymentToProviderStatus == "Available") {
      return accumulator + order.cost;
    }
    return accumulator;
  }, 0);

  const totalWithdrawnCost = completedOrders.reduce((accumulator, order) => {
    if (order.paymentToProviderStatus == "Withdrawn") {
      return accumulator + order.cost;
    }
    return accumulator;
  }, 0);

  const successCallback = (position) => {
    const { latitude, longitude, altitude, heading, speed } = position.coords;
    let providerId = user._id;

    console.log("provider id: ", providerId);
    console.log("latitude: ", latitude);
    console.log("previousLatitude: ", previousLatitude);
    console.log("longitude: ", longitude);
    console.log("previousLongitude: ", previousLongitude);

    if (providerId) {
      dispatch(StoreLocation({ providerId, latitude, longitude, altitude, heading, speed }));
    }

    // if ((providerId && (latitude !== previousLatitude)) || (providerId && (longitude !== previousLongitude))) {
    //   console.log("21");
    //   dispatch(StoreLocation({ providerId, latitude, longitude, altitude, heading, speed }));
    //   localStorage.setItem('previousLatitude', latitude);
    //   localStorage.setItem('previousLongitude', longitude);
    //   setStatus('Available');
    // }
  };

  const errorCallback = (error) => {
    console.error('Error getting geolocation:', error);
    dispatch(statusUpdate('UnAvailable')).then((result) => {
      if (!result.error) {
        setStatus('UnAvailable');
      }
    })
  };

  useEffect(() => {
    dispatch(getAssignedOrders());
    dispatch(statData());
  }, [])

  useEffect(() => {
    let watchId;
    if (isGeolocationAvailable && isGeolocationEnabled) {
      watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, {
        enableHighAccuracy: false,
      });
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  useEffect(() => {
    // Dispatch status update to 'Available' when the component mounts
    dispatch(statusUpdate('Available')).then((result) => {
      if (!result.error) {
        setStatus('Available');
      }
    });
  
    // Check if the user has closed the tab
    const handleUnload = async () => {
      try {
        await dispatch(statusUpdate('UnAvailable'));
        setStatus('UnAvailable');
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
  
    window.addEventListener('beforeunload', handleUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);
  
  

  const handleStatusChange = () => {
    if (!isGeolocationEnabled) {
      alert("Please allow location to set your availability.");
    } else {
      const newStatus = status === 'Available' ? 'UnAvailable' : 'Available';
      dispatch(statusUpdate(newStatus)).then((result) => {
        if (!result.error) {
          setStatus(newStatus);
        }
      });
    }
  };
  return (
    <div className="container-fluid p-0">
      <div className="card mb-2">
        <ol className="breadcrumb d-lg-flex ms-3">
          <li className="breadcrumb-item">
            <i className="bi bi-check-circle lh-2"></i>
            <a href="#" className="text-decoration-none">Please Set Your Availability to receive Booking.</a>
            <div className="form-check form-switch">
              <input
                checked={status === 'Available'}
                onChange={handleStatusChange}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label htmlFor="flexSwitchCheckDefault" className={`form-check-label m-2 ${status === 'Available' ? 'text-success' : 'text-danger'}`}>{loading ? "load...": status}</label>
            </div>
            <small style={{ fontStyle: 'italic' }} className={`txtWarning ${status === 'Available' ? 'd-none' : 'text-danger'}`}></small>
          </li>
        </ol>
      </div>

      <div className="card mb-4">
        <ol className="breadcrumb d-lg-flex ms-3">
          {filteredAssignedOrders?.length > 0 ?
            <li className="breadcrumb-item">
              <i className="bi bi-bell lh-2"></i>
              <a href={`/provider/assigned-orders`} className="text-decoration-none">You have Been Assigned <span className="badge bg-danger">{filteredAssignedOrders.length}</span> New Orders
              </a>
            </li> : null
          }
          {/* <span className="badge btn bg-success">Accept</span><span className="mx-2 badge btn bg-danger">Reject</span> */}

        </ol>
      </div>
      {/* Row start */}
      <div className="row">
        <div className="col-xl-4 col-lg-6 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-4 fw-normal">New Order</h5>
                  <h1 className="fw-bold m-0 display-6">{filteredAssignedOrders?.length}</h1>
                </div>
                <div className="d-flex justify-content-between flex-column">
                  <div className="growth-block mb-4 danger rounded-5">
                    <i className="bi bi-caret-down-fill"></i>
                    <span>{loading ? "load...": 100-data?.profit}%</span>
                  </div>
                  <Link to="/provider/assigned-orders" className="text-primary text-decoration-none d-flex align-items-center">Details <i className="bi bi-caret-right-fill fs-4"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-4 fw-normal">Total Orders</h5>
                  <h1 className="fw-bold m-0 display-6">{assignedOrders?.length}</h1>
                </div>
                <div className="d-flex justify-content-between flex-column">
                  <div className="growth-block mb-4 info rounded-5">
                    <i className="bi bi-caret-up-fill"></i>
                    <span>{loading ? "load...": data?.profit ? data?.profit :0}%</span>
                  </div>
                  <Link to="/provider/total-orders" className="text-primary text-decoration-none d-flex align-items-center">Details <i className="bi bi-caret-right-fill fs-4"></i></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-4 fw-normal">Earning</h5>
                  <h1 className="fw-bold m-0 display-6">INR  {totalAvailableCost+totalPendingCost+totalWithdrawnCost}</h1>
                </div>
                {/* <div className="d-flex justify-content-between flex-column">
                  <div className="growth-block mb-4 success rounded-5">
                    <i className="bi bi-caret-down-fill"></i>
                    <span>30%</span>
                  </div>
                </div> */}
                <Link to="/provider/earnings" className="text-primary text-decoration-none d-flex align-items-center">Details <i className="bi bi-caret-right-fill fs-4"></i></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-4 fw-normal">Total Accepted</h5>
                  <h1 className="fw-bold m-0 display-6">{totalAcceptedOrders?.length}</h1>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-4 fw-normal">Total Rejected</h5>
                  <h1 className="fw-bold m-0 display-6">{user?.rejectedOrders ? user?.rejectedOrders : 0}</h1>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row end */}
      <div className="row">
        <div className="col-xl-12 col-12">
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="card-title">Recent Order Details</h4>
            </div>
            <div className="card-body">
              <div className="border border-dark rounded-3 overflow-auto">
                <table className="table align-middle custom-table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Order Id</th>
                      <th>Customer Name</th>
                      <th>Service Type</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? "loading...": assignedOrders?.slice(0, 5).map((item, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{"FLX-" + item._id.slice(-5).toUpperCase()}</td>
                        <td>{item.customerData[0].fullName}</td>
                        <td><a href="#" className="btn-link">{item.service == "Fitness" ? "Fitness" : item.serviceData[0].serviceType}</a></td>
                        <td>{ moment(item.timestamp).format("DD/MM/YYYY") }</td>
                        <td>{item.cost}</td>
                        <td>
                          <button className="btn btn-outline-danger btn-sm">{item?.status}</button>
                        </td>
                      </tr>
                    ))}

                    {/* <tr>
                      <td>2</td>
                      <td>0002</td>
                      <td>Name</td>
                      <td><a href="#" className="btn-link">Natural Massage</a></td>
                      <td>24/02/2023</td>
                      <td>29</td>
                      <td><button className="btn btn-outline-danger btn-sm">Processing</button></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>0003</td>
                      <td>Name</td>
                      <td><a href="#" className="btn-link">Natural Massage</a></td>
                      <td>24/02/2023</td>
                      <td>29</td>
                      <td><button className="btn btn-outline-danger btn-sm">Processing</button></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>0004</td>
                      <td>Name</td>
                      <td><a href="#" className="btn-link">Medical Massage</a></td>
                      <td>26/02/2023</td>
                      <td>48</td>
                      <td><button className="btn btn-outline-success btn-sm">Completed</button></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>0005</td>
                      <td>Name</td>
                      <td><a href="#" className="btn-link">Stretch</a></td>
                      <td>29/03/2023</td>
                      <td>65</td>
                      <td><button className="btn btn-outline-danger btn-sm">Processing</button></td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;