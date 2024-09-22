import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserData } from '../../features/userSlicer';
import Swal from 'sweetalert2';
import loadingGif from '../../../loading.gif';
import avatar from '../includes/avatar.png';

const backend_url = process.env.REACT_APP_BASE_URL;
export default function Settings({ user }) {

  // const userStateData = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);

  const [updatedUser, setUpdatedUser] = useState({ avatar: user.avatar || "", fullName: user.fullName || "", email: user.email || "", phone: user.phone || "", dob: user.dob || "", addressLine1: user.addressLine1 || "", currentPassword: "", newPassword: "", confirmNewPassword: "" });

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserData());
  // }, [])

  // Update the user state whenever userStateData changes
  useEffect(() => {
    setUpdatedUser(prevUser => ({
      ...prevUser,
      avatar: user.avatar || "",
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
      addressLine1: user.addressLine1 || ""
    }));
  }, [user]);

  const onChange = (element) => {
    setUpdatedUser({ ...updatedUser, [element.target.name]: element.target.value });
  }

  const handleReset = () => {
    setUpdatedUser(prevUser => ({
      ...prevUser,
      avatar: user.avatar || "",
      fullName: user.fullName || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
      addressLine1: user.addressLine1 || "",
      currentPassword: "", newPassword: "", confirmNewPassword: ""

    }));
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (updatedUser.newPassword !== updatedUser.confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `New Password and Confim New Password are not equal!`
      });
    } else {
      const formData = new FormData(e.target);
      console.log(formData);
      // const result = await dispatch(addCandidateProfile(formData));
      dispatch(updateUserData(formData));
    }

  }
  return (
    <div className="container-fluid">
      {/* App container starts */}
      <div className="col-12">

        <div className="card mb-3">

          <div className="card-header">
            <h4 className="card-title">Settings</h4>
          </div>


          <div className="row gx-3">
            <div className="col-xxl-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="custom-tabs-container">
                    <ul className="nav nav-tabs" id="customTab2" role="tablist">
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="tab-oneA"
                          data-bs-toggle="tab"
                          href="#oneA"
                          role="tab"
                          aria-controls="oneA"
                          aria-selected="true"
                        >
                          General
                        </a>
                      </li>
                      {/* {"{"}
                        {"{"}--{" "}
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link"
                            id="tab-twoA"
                            data-bs-toggle="tab"
                            href="#twoA"
                            role="tab"
                            aria-controls="twoA"
                            aria-selected="false"
                          >
                            Settings
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link"
                            id="tab-threeA"
                            data-bs-toggle="tab"
                            href="#threeA"
                            role="tab"
                            aria-controls="threeA"
                            aria-selected="false"
                          >
                            Credit Cards
                          </a>
                        </li>{" "}
                        --{"}"}
                        {"}"} */}
                    </ul>
                    <div className="tab-content">
                      <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <div
                          className="tab-pane fade show active"
                          id="oneA"
                          role="tabpanel"
                        >
                          {/* Row start */}
                          <div className="row gx-3 justify-content-between">
                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
                              <div className="card mb-3">
                                <div className="card-header">
                                  <h5 className="card-title">Personal Details</h5>
                                  <img
                                    src={updatedUser?.avatar ? `${backend_url}/images/${updatedUser?.avatar}` : avatar}
                                    className="rounded-2 img-3x"
                                    alt="Employee"
                                  />
                                  <p>{"FLX-" + user?._id.slice(-5).toUpperCase()}</p>
                                </div>
                                <div className="card-body">
                                  {/* Row start */}
                                  <div className="row gx-3">
                                    <div className="col-6">
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label
                                          htmlFor="fullName"
                                          className="form-label"
                                        >
                                          Profile Image
                                        </label>
                                        <input
                                          type="file"
                                          className="form-control"
                                          id="profilePhoto"
                                          name='avatar'
                                          placeholder="profile Photo"
                                          onChange={onChange}
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="fullName"
                                          className="form-label"
                                        >
                                          Full Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="fullName"
                                          name='fullName'
                                          value={updatedUser?.fullName}
                                          onChange={onChange}
                                          placeholder="Full Name"
                                        />
                                      </div>
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label
                                          htmlFor="contactNumber"
                                          className="form-label"
                                        >
                                          Contact
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="contactNumber"
                                          name='phone'
                                          value={updatedUser?.phone}
                                          onChange={onChange}
                                          placeholder="Contact"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label
                                          htmlFor="emailId"
                                          className="form-label"
                                        >
                                          Email
                                        </label>
                                        <input
                                          type="email"
                                          className="form-control"
                                          id="emailId"
                                          name='email'
                                          value={updatedUser?.email}
                                          placeholder="Email ID"
                                          disabled
                                        />
                                      </div>
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label
                                          htmlFor="birthDay"
                                          className="form-label"
                                        >
                                          Birthday
                                        </label>
                                        <div className="input-group">
                                          <input
                                            type="date"
                                            className="form-control datepicker-opens-left"
                                            id="birthDay"
                                            name='dob'
                                            value={updatedUser.dob}
                                            onChange={onChange}
                                          />
                                          {/* <span className="input-group-text">
                                            <i className="bi bi-calendar4" />
                                          </span> */}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label className="form-label">Address</label>
                                        <textarea
                                          className="form-control"
                                          name='addressLine1'
                                          value={updatedUser?.addressLine1}
                                          onChange={onChange}
                                          rows={3}
                                          defaultValue={"Muzafarpur Bihar, India"}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/* Row end */}
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4 col-12">
                              <div className="card mb-3">
                                <div className="card-header">
                                  <h5 className="card-title">Reset Password</h5>
                                </div>
                                <div className="card-body">
                                  <div className="row gx-3">
                                    <div className="col-12">
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label
                                          htmlFor="currentPassword"
                                          className="form-label"
                                        >
                                          Current Password
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="currentPassword"
                                          onChange={onChange}
                                          value={updatedUser?.currentPassword}
                                          name='currentPassword'
                                          placeholder="Enter Current Password"
                                        />
                                      </div>
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label
                                          htmlFor="newPassword"
                                          className="form-label"
                                        >
                                          New Password
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="newPassword"
                                          name='newPassword'
                                          onChange={onChange}
                                          value={updatedUser?.newPassword}
                                          placeholder="Enter New Password"
                                        />
                                      </div>
                                      {/* Form Field Start */}
                                      <div className="mb-3">
                                        <label
                                          htmlFor="confirmNewPassword"
                                          className="form-label"
                                        >
                                          Confirm New Password
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="confirmNewPassword"
                                          name='confirmNewPassword'
                                          value={updatedUser?.confirmNewPassword}
                                          onChange={onChange}
                                          placeholder="Confirm New Password"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Row end */}
                          <div className="d-flex gap-2 justify-content-end">
                            <span
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={handleReset}
                            >
                              Reset
                            </span>
                            <button type="submit" className="btn btn-success" >
                              {loading ? <img src={loadingGif} alt="Loading..." style={{ width: '20px', height: '20px', marginRight: '8px' }} /> : "Update"}
                              {loading ? "Update" : null}
                            </button>
                          </div>
                        </div>
                      </form>
                      <div className="tab-pane fade" id="twoA" role="tabpanel">
                        {/* Row start */}
                        <div className="row gx-3">
                          <div className="col-sm-6 xol-12">
                            {/* Card start */}
                            <div className="card">
                              <div className="card-body">
                                <ul className="list-group">
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Show desktop notifications
                                    <div className="form-check form-switch m-0">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="switchOne"
                                      />
                                    </div>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Show email notifications
                                    <div className="form-check form-switch m-0">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="switchTwo"
                                        defaultChecked=""
                                      />
                                    </div>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Show chat notifications
                                    <div className="form-check form-switch m-0">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="switchThree"
                                      />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* Card end */}
                          </div>
                          <div className="col-sm-6 xol-12">
                            {/* Card start */}
                            <div className="card">
                              <div className="card-body">
                                <ul className="list-group">
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Show purchase history
                                    <div className="form-check form-switch m-0">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="switchFour"
                                      />
                                    </div>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Show orders
                                    <div className="form-check form-switch m-0">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="switchFive"
                                      />
                                    </div>
                                  </li>
                                  <li className="list-group-item d-flex justify-content-between align-items-center">
                                    Show alerts
                                    <div className="form-check form-switch m-0">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        role="switch"
                                        id="switchSix"
                                      />
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {/* Card end */}
                          </div>
                        </div>
                        {/* Row end */}
                        <div className="d-flex gap-2 mt-4 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            Cancel
                          </button>
                          <button type="button" className="btn btn-success" >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="threeA" role="tabpanel">
                        {/* Row start */}
                        <div className="row gx-3">
                          <div className="col-12">
                            <div className="table-responsive">
                              <table className="table align-middle table-bordered m-0">
                                <thead>
                                  <tr>
                                    <th>Bank Name</th>
                                    <th>Card Number</th>
                                    <th>Card type</th>
                                    <th>Expiry Date</th>
                                    <th>Credit Balance</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Bank of America</td>
                                    <td>0000 0000 0000 0000</td>
                                    <td>Visa</td>
                                    <td>10/10/2025</td>
                                    <td>$100000</td>
                                    <td>
                                      <div className="form-check form-switch m-0">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id="cardActive"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Citi Group</td>
                                    <td>0000 0000 0000 0000</td>
                                    <td>Master</td>
                                    <td>02/24/2028</td>
                                    <td>$150000</td>
                                    <td>
                                      <div className="form-check form-switch m-0">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id="cardActive2"
                                          defaultChecked=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Capital One</td>
                                    <td>0000 0000 0000 0000</td>
                                    <td>Visa</td>
                                    <td>05/05/2025</td>
                                    <td>$50000</td>
                                    <td>
                                      <div className="form-check form-switch m-0">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id="cardActive3"
                                          defaultChecked=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Axix</td>
                                    <td>0000 0000 0000 0000</td>
                                    <td>Visa</td>
                                    <td>08/20/2027</td>
                                    <td>$100000</td>
                                    <td>
                                      <div className="form-check form-switch m-0">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id="cardActive4"
                                          defaultChecked=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>HDFC</td>
                                    <td>0000 0000 0000 0000</td>
                                    <td>Visa</td>
                                    <td>05/08/2029</td>
                                    <td>$90000</td>
                                    <td>
                                      <div className="form-check form-switch m-0">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id="cardActive5"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {/* Row end */}
                        <div className="d-flex gap-2 mt-4 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                          >
                            Cancel
                          </button>
                          <button type="button" className="btn btn-success" >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
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
