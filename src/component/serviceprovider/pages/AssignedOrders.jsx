import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { getAssignedOrders } from "../../features/providerSlicer";
import { toggleStatus } from "../../features/customerSlicer";
import Swal from "sweetalert2";

var massageDetails = {
  "Order #": "FLX6458",
  "Started At": "25-10-2023 01-03-00",
  "Finished At": "25-10-2023 02-03-00",
  "Full Name": "Alia Williams",
  Address: "H 152/d, Bihar",
  Phone: "+913-148-60985",
  "Date & Time": "09-10-2023 05:00 pm",
  "Service Type": "Swedish Massage",
  Duration: "60 m",
  "Total People": "1",
  "Massage For": "Female",
  Duration: "6 m",
  "Medical Condition": "I am Pregnant (Selected)",
};


export default function AssignedOrders() {

  const dispatch = useDispatch();
  const Orders = useSelector((state) => state.provider.assignedOrders);
  const assignedOrders = Orders.filter(obj => obj.status == "Assigned" || obj.status == "Started" || obj.status == "Accepted" );

  const [triggerFetch, setTriggerFetch] = useState(false);
  const loading = useSelector((state) => state.provider.loading);



  // Fetch records when the component mounts
  useEffect(() => {
    dispatch(getAssignedOrders());

    // dispatch(getCustomerReviews());
    setTriggerFetch(false);
  }, [dispatch, triggerFetch]);


  const columns = [
    { name: 'Sr #', selector: (row, index) => (index + 1).toString(), sortable: true,},
    { name: 'Order Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true, },
    { name: 'Customer Name', selector: row => row.customerData[0]?.fullName, sortable: true, style: { padding: 0, margin: 0 } },
    // { name: 'Assigned Provider', selector: row => row.providerData[0]?.fullName, sortable: true, },
    { name: 'Service Type', selector: row => row.serviceData[0]?.serviceType, sortable: true, },
    { name: 'Duration', selector: row => row.service == "Fitness" ? '-' : `${row.serviceData[0]?.duration} m`, sortable: true, },
    { name: 'Total People', selector: row => row.service == "Fitness" ? '-' : row.serviceData[0]?.peoples, sortable: true, },
    { name: 'Massage For', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.gender : row.serviceData[0]?.gender, sortable: true, },
    { name: 'Phone', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.phone : row.serviceData[0]?.phone, sortable: true, },
    { name: 'Gross Amount', selector: row => row.cost, sortable: true, },
    {
      name: 'Actions',
      cell: row => (
        <div className="row m-1">
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
                                "Full Name": row.fitnessData[0]?.fullName,
                                "Email": row.fitnessData[0]?.email,
                                "Gender": row.fitnessData[0]?.gender,
                                "Address": row.fitnessData[0]?.addressLine1,
                                "Phone": row.fitnessData[0]?.phone,
                                "Age": row.fitnessData[0]?.age,
                                "Weight": row.fitnessData[0]?.height,
                                "Height": "00",
                                "Do you have any existing medical conditions or health concerns?": row.fitnessData[0]?.medicalConditionYesDetail ? row.fitnessData[0]?.medicalConditionYesDetail : "No",
                                "Are you currently taking any medications?": row.fitnessData[0]?.medication ? row.fitnessData[0]?.medication : "No",
                                "Please briefly describe your fitness or weight loss goals:": row.fitnessData[0]?.fitnessWeightLossGoalDesc,
                                "Have you participated in any fitness or exercise programs before?": row.fitnessData[0]?.prevExerExp == true,
                                "Do you have any allergies, food sensitivities, or dietary restrictions we should be aware of?":
                                  row.fitnessData[0]?.allergy,
                                "Have you undergone any surgeries or medical procedures in the past?":
                                  row.fitnessData[0]?.surgery,
                                "Are you currently experiencing any pain or discomfort, particularly in the joints or muscles?":
                                  row.fitnessData[0]?.painDiscomfort,
                                "Do you have a history of chronic medical conditions such as diabetes, hypertension, heart disease, or respiratory conditions?":
                                  row.fitnessData[0]?.chronicMedicalConditions,
                                "Are you currently under the care of a healthcare provider or specialist for any medical condition?":
                                  row.fitnessData[0]?.healthcare,
                                "Are you taking any dietary supplements, vitamins, or herbal remedies?": row.fitnessData[0]?.dietarySuppliments,
                                "Are you currently using any mobility aids or assistive devices, such as crutches, braces, or a wheelchair?":
                                  row.fitnessData[0]?.mobilityAids,
                                "Do you smoke or use tobacco products?": row.fitnessData[0]?.smoking,
                                "Do you consume alcoholic beverages?": row.fitnessData[0]?.smokingDetails,
                                "How would you describe your current fitness level?": row.fitnessData[0]?.fitnessLevel,
                                "Have you previously worked with a fitness trainer or participated in any exercise program":
                                  row.fitnessData[0]?.previousJoining,
                                "Are there any specific fitness goals you would like to achieve through our program, such as weight loss, muscle gain, improved flexibility, or increased cardiovascular fitness?":
                                  row.fitnessData[0]?.fitnessGoal,
                                "What is your typical daily dietary intake like? Are you following any specific diet plan or eating regimen?":
                                  row.fitnessData[0]?.dailyDietaryIntake,
                                "Do you have any dietary preferences or restrictions, such as vegetarian, vegan, gluten-free, or other dietary choices?":
                                  row.fitnessData[0]?.dietryPreferenceRestriction,
                                "Is there any other health-related information you believe is important for us to know in order to provide you with the best fitness and weight loss program experience?":
                                  row.fitnessData[0]?.otherInfo,
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
        </div>
      ),
    },
    {
        name: 'Status', selector: row => row?.status=="Assigned" ?<span className="d-flex gap-1" >
          <button className="btn btn-success w-100" onClick={() => { handleStatusChange(row._id,"Accepted") }} ><i className="bi bi-check-all p-0"></i></button>
          <button className="btn btn-danger w-100" onClick={() => { handleStatusChange(row._id,"Rejected") }} ><i  className="bi bi-x"></i></button>
        </span> : (row?.status=="Accepted" || row?.status=="Started") ? <a href={`/provider/new-order/${row?._id}`} className="btn btn-primary w-100">{row?.status}</a>
        :<a className="btn btn-primary w-100">{row?.status}</a>
         , sortable: true,
      },
  ];

  const [searchText, setSearchText] = useState('');
  const handleSearch = e => {
    setSearchText(e.target.value.toLowerCase());

  };

  const handleResetSearch = () => {
    setSearchText('');
  };

  const handleStatusChange=async( id, status)=>{
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
      } else {
        // User clicked Cancel or closed the dialog
        return null;
      }
  }

  const filteredData = assignedOrders?.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );


  return (
    <div className="container-fluid">
      <div className="col-12">
        <div className="card mb-3">
          <div className="card-header">
            <h4 className="card-title">Assigned Orders</h4>
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
                  {loading ? "loading...": 
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    paginationTotalRows={filteredData?.length}
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
