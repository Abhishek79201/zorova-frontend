import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignProvider, getActiveProviders, getNewOrders, getBodyguards } from "../../features/employeeSlicer";
import moment from "moment";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import "./Datatables.css"



export default function NewOrders() {

  const dispatch = useDispatch();
  const newOrders = useSelector((state) => state.employee.newOrders);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const loading = useSelector((state) => state.employee.loading);
  const [appointmentId, setAppointmentId] = useState();
  const [gender, setGender] = useState();
  const [assignmentData, setAssignmentData] = useState({ providerId: "", bodyguardId: "" });
  const getStateActiveProviders = useSelector((state) => state.employee.activeProviders);
  const getStateBodyguards = useSelector((state) => state.employee.bodyGuards);

  const onChange = (element) => {
    setAssignmentData({ ...assignmentData, [element.target.name]: element.target.value });
  }


  // Fetch records when the component mounts
  useEffect(() => {
    dispatch(getNewOrders());
    dispatch(getActiveProviders());
    dispatch(getBodyguards());

    // dispatch(getCustomerReviews());
    setTriggerFetch(false);
  }, [dispatch, triggerFetch]);

  const handleAssignment = (e) => {
    e.preventDefault();

    if (appointmentId != "" && assignmentData.providerId != "") {
      if (assignmentData.bodyguardId == "") {
        dispatch(assignProvider({ appointmentId: appointmentId, providerId: assignmentData.providerId }));
      } else {
        dispatch(assignProvider({ appointmentId: appointmentId, providerId: assignmentData.providerId, bodyguardId: assignmentData.bodyguardId }));

      }
    }
  };

  const DataTablecustomStyles = {
    rows: {
      style: {
        minHeight: '10px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '0px', // override the cell padding for head cells
        paddingRight: '0px',
      },
    },
    cells: {
      style: {
        paddingLeft: '5px', // override the cell padding for data cells
        paddingRight: '5px',
      },
    },
  };

  const columns = [
    { name: 'Sr #', selector: (row, index) => (index + 1).toString(), sortable: true, },
    { name: 'Order Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true, },
    { name: 'Customer Name', selector: row => row.customerData[0]?.fullName, sortable: true, style: { padding: 0, margin: 0 } },
    { name: 'Service Type', selector: row => row.service == "Fitness" ? 'Fitness' : row.serviceData[0]?.serviceType, sortable: true, },
    { name: 'Duration', selector: row => row.service == "Fitness" ? '-' : `${row.serviceData[0]?.duration} m`, sortable: true, },
    { name: 'Total People', selector: row => row.service == "Fitness" ? '-' : row.serviceData[0]?.peoples, sortable: true, },
    { name: 'Massage For', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.gender : row.serviceData[0]?.gender, sortable: true, },
    { name: 'Phone', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.phone : row.serviceData[0]?.phone, sortable: true, },
    { name: 'Address', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.addressLine1 : row.serviceData[0].addressLine1, sortable: true, },
    { name: 'Gross Amount', selector: row => row.cost, sortable: true, },
    {
      name: 'Actions',
      cell: row => (
        <div className="row m-0 d-flex">
          <button
            className="btn btn-info btn-sm"
            data-bs-toggle="modal"
            data-bs-target={`#exampleModalLg-${row._id}`}
          >
            <i className="bi bi-eye" />
            View Detail
          </button>
          {/* Modal Detail */}
          <div
            className="modal fade"
            id={`exampleModalLg-${row._id}`}
            tabIndex={-1}
            aria-labelledby="exampleModalLgLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title h3"
                    id="exampleModalLgLabel"
                  >
                    Order Detail{" "}
                    <span className="btn btn-success badge badge-pill badge-success">
                      Paid
                    </span>
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="table-responsive">
                      <table className="table table-striped ">
                        <tbody>
                          {row?.service == 'Fitness' ? (
                            Object.entries(
                              {
                                "Order #": "FLX-" + row._id.slice(-5).toUpperCase(),
                                "Full Name": row.fitnessData[0]?.fullName != "" ? row.fitnessData[0]?.fullName : "N/A",
                                "Email": row.fitnessData[0]?.email != "" ? row.fitnessData[0]?.email : "N/A",
                                "Gender": row.fitnessData[0]?.gender != "" ? row.fitnessData[0]?.gender : "N/A",
                                "Address": row.fitnessData[0]?.addressLine1 != "" ? row.fitnessData[0]?.addressLine1 : "N/A",
                                "Phone": row.fitnessData[0]?.phone != "" ? row.fitnessData[0]?.phone : "N/A",
                                "Age": row.fitnessData[0]?.age != "" ? row.fitnessData[0]?.age : "N/A",
                                "Weight": row.fitnessData[0]?.weight != "" ? row.fitnessData[0]?.weight : "N/A",
                                "Height": row.fitnessData[0]?.height != "" ? row.fitnessData[0]?.height : "N/A",
                                "Do you have any existing medical conditions or health concerns?": row.fitnessData[0]?.medicalConditionYesDetail != "" ? row.fitnessData[0]?.medicalConditionYesDetail : "No",
                                "Are you currently taking any medications?": row.fitnessData[0]?.medication ? row.fitnessData[0]?.medication : "No",
                                "Please briefly describe your fitness or weight loss goals:": row.fitnessData[0]?.fitnessWeightLossGoalDesc != "" ? row.fitnessData[0]?.fitnessWeightLossGoalDesc : "N/A",
                                "Have you participated in any fitness or exercise programs before?": row.fitnessData[0]?.prevExerExp == true ? "true" : "false",
                                "Do you have any allergies, food sensitivities, or dietary restrictions we should be aware of?":
                                  row.fitnessData[0]?.allergy != "" ? row.fitnessData[0]?.allergy : "N/A",
                                "Have you undergone any surgeries or medical procedures in the past?":
                                  row.fitnessData[0]?.surgery == true ? "true" : "false",
                                "Are you currently experiencing any pain or discomfort, particularly in the joints or muscles?":
                                  row.fitnessData[0]?.painDiscomfort != "" ? row.fitnessData[0]?.painDiscomfort : "N/A",
                                "Do you have a history of chronic medical conditions such as diabetes, hypertension, heart disease, or respiratory conditions?":
                                  row.fitnessData[0]?.chronicMedicalConditions != "" ? row.fitnessData[0]?.chronicMedicalConditions : "N/A",
                                "Are you currently under the care of a healthcare provider or specialist for any medical condition?":
                                  row.fitnessData[0]?.healthcare == true ? "true" : "false",
                                "Are you taking any dietary supplements, vitamins, or herbal remedies?": row.fitnessData[0]?.dietarySuppliments == true ? "true" : "false",
                                "Are you currently using any mobility aids or assistive devices, such as crutches, braces, or a wheelchair?":
                                  row.fitnessData[0]?.mobilityAids != "" ? row.fitnessData[0]?.mobilityAids : "N/A",
                                "Do you smoke or use tobacco products?": row.fitnessData[0]?.smoking == true ? "true" : "false",
                                "Do you consume alcoholic beverages?": row.fitnessData[0]?.alcohol == true ? "true" : "false",
                                "How would you describe your current fitness level?": row.fitnessData[0]?.fitnessLevel != "" ? row.fitnessData[0]?.fitnessLevel : "N/A",
                                "Have you previously worked with a fitness trainer or participated in any exercise program":
                                  row.fitnessData[0]?.previousJoining == true ? "true" : "false",
                                "Are there any specific fitness goals you would like to achieve through our program, such as weight loss, muscle gain, improved flexibility, or increased cardiovascular fitness?":
                                  row.fitnessData[0]?.fitnessGoal != "" ? row.fitnessData[0]?.fitnessGoal : "N/A",
                                "What is your typical daily dietary intake like? Are you following any specific diet plan or eating regimen?":
                                  row.fitnessData[0]?.dailyDietaryIntake != "" ? row.fitnessData[0]?.dailyDietaryIntake : "N/A",
                                "Do you have any dietary preferences or restrictions, such as vegetarian, vegan, gluten-free, or other dietary choices?":
                                  row.fitnessData[0]?.dietryPreferenceRestriction != "" ? row.fitnessData[0]?.dietryPreferenceRestriction : "N/A",
                                "Is there any other health-related information you believe is important for us to know in order to provide you with the best fitness and weight loss program experience?":
                                  row.fitnessData[0]?.otherInfo != "" ? row.fitnessData[0]?.otherInfo : "N/A",
                                " Terms Acknowledged": "Accepted",
                              }
                            ).map(
                              ([label, value]) => (
                                <tr key={label}>
                                  <td className="h6">{label}</td>
                                  <td>{value}</td>
                                </tr>
                              )
                            )) : (Object.entries(
                              {
                                "Order #": "FLX-" + row._id.slice(-5).toUpperCase(),
                                "Started At": `${moment(row.serviceData[0]?.date).format('YYYY-MM-DD')} ${row.serviceData[0]?.start_time}`,
                                "Finished At": `${moment(row.serviceData[0]?.date).format('YYYY-MM-DD')} ${row.serviceData[0]?.end_time}`,
                                "Full Name": `${row.customerData[0]?.fullName}`,
                                "Address": `${row.serviceData[0]?.addressLine1}`,
                                "Phone": `${row.serviceData[0]?.phone}`,
                                "Date & Time": `${moment(row.timestamp).format('YYYY-MM-DD HH:MM')}`,
                                "Service Type": `${row.serviceData[0]?.serviceType}`,
                                "Duration": `${row.serviceData[0]?.duration} m`,
                                "Total People": `${row.serviceData[0]?.peoples}`,
                                "Massage For": `${row.serviceData[0]?.gender}`,
                                "Medical Condition": `${row.serviceData[0]?.medicalYesCondition ? row.serviceData[0]?.medicalYesCondition : "No"}`,
                              }
                            ).map(
                              ([label, value]) => (
                                <tr key={label}>
                                  <td className="h6">{label}</td>
                                  <td>{value}</td>
                                </tr>
                              )
                            ))
                          }

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModalCenter"
            onClick={() => { setAppointmentId(row._id); setGender(row.service == "Fitness" ? row.fitnessData[0]?.gender : row.serviceData[0]?.gender) }}
          >
            <i className="bi bi-pencil" />
            Assign Provider
          </button>
        </div>
      ),
    },
  ];

  const [searchText, setSearchText] = useState('');
  const handleSearch = e => {
    setSearchText(e.target.value.toLowerCase());

  };

  const handleResetSearch = () => {
    setSearchText('');
  };

  const filteredData = newOrders?.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );


  return (
    <div className="container-fluid">
      <div className="col-12">
        <div className="card mb-3">
          <div className="card-header">
            <h4 className="card-title">New Orders (Not Assigned)</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="border-dark rounded-3 ">

                <div
                  className="modal fade"
                  id="exampleModalCenter"
                  tabIndex={-1}
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="exampleModalCenterTitle"
                        >
                          Assign Provider
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleAssignment} >
                          {/*                        
                        <div className="card mb-4">
                          <div className="card-header bg-primary text-white">
                            Order Details
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">User: John Doe</h5>
                            <p className="card-text">Order ID: 123456</p>
                            <p className="card-text">
                              Massage Type: Swedish Massage
                            </p>
                            <p className="card-text">
                              Location: 123 Main St, City
                            </p>
                          </div>
                        </div> */}
                          <div className="card mb-4">
                            <div className="card-header">Select Provider</div>
                            <div className="card-body">
                              {/* Provider Selection */}
                              <div className="card mb-4">
                                <div className="card-header bg-primary text-white">
                                  Select Provider
                                </div>
                                <div className="card-body">
                                  {/* <form /> */}
                                  <div className="form-group">
                                    <label htmlFor="providerSelect">
                                      Choose Provider:
                                    </label>
                                    <select
                                      className="form-control"
                                      id="providerSelect"
                                      name="providerId"
                                      required
                                      value={assignmentData?.providerId}
                                      onChange={onChange}
                                    >
                                      <option value="">
                                        Select Provider
                                      </option>
                                      {getStateActiveProviders
                                        .filter(item => item.gender === gender)
                                        .map((item, index) => (
                                          <option key={index} value={item._id}>
                                            {item.fullName}
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              {/* Bodyguard Selection */}
                              {gender != "male" && gender != "Male" ? (
                                <div className="card mb-4">
                                  <div className="card-header bg-primary text-white">
                                    Select Bodyguard
                                  </div>
                                  <div className="card-body">
                                    {/* <form /> */}
                                    <div className="form-group">
                                      <label htmlFor="bodyguardSelect">
                                        Choose Bodyguard: {gender}
                                      </label>
                                      <select
                                        className="form-control"
                                        id="bodyguardSelect"
                                        name="bodyguardId"
                                        value={assignmentData.bodyguardId}
                                        onChange={onChange}
                                      >
                                        <option value="">
                                          Select Bodyguard
                                        </option>
                                        {getStateBodyguards?.map((item, index) => (
                                          <option value={item._id}>
                                            {item.fullName}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="modal-footer">
                            <a
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </a>
                            <button type="submit" className="btn btn-primary">
                              Assign
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">

                  <div className="input-group mb-3 w-25" style={{ float: 'right' }}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="searchButton"
                      value={searchText}
                      onChange={handleSearch}
                    />
                    <button className="btn btn-danger" type="button" id="searchButton" onClick={handleResetSearch}>X</button>
                  </div>
                  {loading ? "Loading...":
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    customStyles={DataTablecustomStyles}
                    paginationTotalRows={filteredData?.length}
                    noHeader
                    striped
                    highlightOnHover

                  />
                   }
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
