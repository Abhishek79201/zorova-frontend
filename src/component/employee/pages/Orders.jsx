import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignProvider, getActiveProviders, getAssignedOrders, getBodyguards } from "../../features/employeeSlicer";
import moment from "moment";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import "./Datatables.css"

export default function Orders() {

  const dispatch = useDispatch();
  const assignedOrders = useSelector((state) => state.employee.assignedOrders);
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
    dispatch(getAssignedOrders());
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


  const columns = [
    { name: 'Sr #', selector: (row, index) => (index + 1).toString(), sortable: true, },
    { name: 'Order Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true, },
    { name: 'Customer Name', selector: row => row.customerData[0]?.fullName, sortable: true, style: { padding: 0, margin: 0 } },
    { name: 'Assigned Provider', selector: row => row.providerData[0]?.fullName, sortable: true, },
    { name: 'Service Type', selector: row => row.serviceData[0]?.serviceType, sortable: true, },
    { name: 'Duration', selector: row => row.service == "Fitness" ? '-' : `${row.serviceData[0]?.duration} m`, sortable: true, },
    { name: 'City', selector: row => row.service == "Fitness" ? '-' : `${row.serviceData[0]?.city}`, sortable: true, },
    { name: 'State', selector: row => row.service == "Fitness" ? '-' : `${row.serviceData[0]?.state}`, sortable: true, },
    { name: 'Address', selector: row => row.service == "Fitness" ? '-' : `${row.serviceData[0]?.addressLine1}`, sortable: true, },
    { name: 'Total People', selector: row => row.service == "Fitness" ? '-' : row.serviceData[0]?.peoples, sortable: true, },
    { name: 'Massage For', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.gender : row.serviceData[0]?.gender, sortable: true, },
    { name: 'Phone', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.phone : row.serviceData[0]?.phone, sortable: true, },
    { name: 'Gross Amount', selector: row => row.serviceData[0]?.cost, sortable: true, },
    { name: 'Transportation', selector: row => row.serviceData[0]?.transportation, sortable: true, },
    { name: 'Discount', selector: row => row.serviceData[0]?.discount, sortable: true, },
    { name: 'GST', selector: row => row.serviceData[0]?.GST, sortable: true, },
    { name: 'Net Amount', selector: row => row.serviceData[0]?.netAmount, sortable: true, },
    {
      name: 'Status',
      cell: row => (
        row?.status == "Started" ?
          <span className="w-100 btn btn-success">
            {row?.status}
          </span> :
          row?.status == "Rejected" ?
            <span className="w-100 btn btn-danger">
              {row?.status}
            </span> : row?.status == "Pending" ?
              <span className="w-100 h-50 btn btn-primary d-flex justify-content-center align-items-center">
                {row?.status}
              </span> : row?.status == "Assigned" ?
                <span className="w-100 h-50 btn btn-secondary d-flex justify-content-center align-items-center">
                  {row?.status}
                </span> : row?.status == "Canceled" ?
                  <span className="w-100 h-50 btn btn-danger d-flex justify-content-center align-items-center">
                    {row?.status}
                  </span> :
                  <span className="p-0 btn btn-primary d-flex justify-content-center align-items-center">
                    {row?.status}
                  </span>
      ),
    },
    {
      name: 'Invoice', selector: row =>
        <a
          className="btn btn-info btn-sm"
          href={`/employee/view-invoice/${row?._id}`}
        >
          <i className="bi bi-eye" />
        </a>
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
            <h4 className="card-title">Total Orders</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="border-dark rounded-3 ">
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
