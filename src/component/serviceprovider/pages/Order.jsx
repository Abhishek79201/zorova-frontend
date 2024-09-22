import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { getAssignedOrders, getOneProvider, requestProviderPayment } from "../../features/providerSlicer";
import { toggleStatus } from "../../features/customerSlicer";
import Swal from "sweetalert2";

export default function Order({ user }) {

  const dispatch = useDispatch();
  const providerData=useSelector((state)=>state.provider.oneProviderData);
  // const [providerData, setReferralData]= useState(user || {});
  const assignedOrders = useSelector((state) => state.provider.assignedOrders);
  const completedOrders = assignedOrders.filter(item => item.status == "Finished");
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


  const [triggerFetch, setTriggerFetch] = useState(false);
  const loading = useSelector((state) => state.provider.loading);
  const appointment_ids = assignedOrders?.filter(item => item._id && item.paymentToProviderStatus === "Pending").map(item => item._id);
  console.log(appointment_ids);


  useEffect(()=>{
    dispatch(getOneProvider());
    setTriggerFetch(false);
  },[triggerFetch])

  // Fetch records when the component mounts
  useEffect(() => {
    dispatch(getAssignedOrders());

    // dispatch(getCustomerReviews());
    setTriggerFetch(false);
  }, [dispatch, triggerFetch]);

  const handleRequestPayment = async () => {
    const swalResult = await Swal.fire({
      title: 'Status Confirmation',
      text: `Are you sure you want to Request Payment?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, Request`
    });

    if (swalResult.isConfirmed) {
      dispatch(requestProviderPayment({ ids: appointment_ids, amount: providerData?.pendingEarning })).then((result) => {
        if (!result.error) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Request Sent Successfully!'
          });
          setTriggerFetch(true);
        };
      });
    } else {
      return null;
    }
  }


  const columns = [
    { name: 'Order Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true, },
    { name: 'Customer Id', selector: row => "FLX-" + row.customerData[0]?._id.slice(-5).toUpperCase(), sortable: true, style: { padding: 0, margin: 0 } },
    { name: 'Name', selector: row => row.customerData[0]?.fullName, sortable: true, },
    // { name: 'Assigned Provider', selector: row => row.providerData[0]?.fullName, sortable: true, },
    { name: 'Service Type', selector: row => row.service == "Fitness" ? "Fitness" : row.serviceData[0].serviceType, sortable: true, },
    { name: 'Phone', selector: row => row.service == "Fitness" ? row.fitnessData[0]?.phone : row.serviceData[0]?.phone, sortable: true, },
    { name: 'Address', selector: row => row.service == "Fitness" ? '-' : `${row.serviceData[0]?.addressLine1} m`, sortable: true, },
    { name: 'Order Amount', selector: row => row.cost, sortable: true, },
    {
      name: 'Invoice', selector: row =>
        <a
          className="btn btn-info btn-sm"
          href={`/provider/view-invoice?id=${row?._id}`}
        >
          <i className="bi bi-eye" />
        </a>
    },
  ];

  const [searchText, setSearchText] = useState('');
  const handleSearch = e => {
    setSearchText(e.target.value.toLowerCase());

  };

  const handleResetSearch = () => {
    setSearchText('');
  };


  const filteredData = completedOrders?.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="container-fluid">
      <div className="col-12">
        {/* Row start */}
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="mb-4 fw-normal">Total Earning</h5>
                    <h1 className="fw-bold m-0 display-6">
                      <i className="bi bi-currency-rupee" />
                      {providerData?.requestedEarning + providerData?.pendingEarning}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="mb-4 fw-normal">Withdrawn</h5>
                    <h1 className="fw-bold m-0 display-6">
                      <i className="bi bi-currency-rupee" />
                      {0}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="mb-4 fw-normal">In Process (Pending)</h5>
                    <h1 className="fw-bold m-0 display-6">
                      <i className="bi bi-currency-rupee" />
                      {providerData?.pendingEarning}
                    </h1>
                    {providerData?.pendingEarning > 0 ?
                      < div className="d-flex justify-content-between flex-column" onClick={handleRequestPayment} >
                        <a
                          href="javascript:void(0)"
                          className="text-primary text-decoration-none d-flex align-items-center mt-0"
                        >
                          Request to withdraw Now <i className="bi bi-caret-right-fill fs-4" />
                        </a>
                      </div>
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-12">
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex flex-row justify-content-between">
                  <div>
                    <h5 className="mb-4 fw-normal">Requested to Withdraw</h5>
                    <h1 className="fw-bold m-0 display-6">
                      <i className="bi bi-currency-rupee" />
                      {providerData?.requestedEarning}
                    </h1>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Row end */}
        <div className="card mb-3">
          <div className="card-header">
            <h4 className="card-title">Earning</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <div className="border-dark rounded-3">
                {/* <table
              id="data-table"
              className="table align-middle table-striped table-hover m-0"
            >
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Service Type</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Order Amount</th>
                  <th>invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#00001</td>
                  <td>#00001</td>
                  <td>
                    <a href="#" className="text-red">
                      Alia
                    </a>
                  </td>
                  <td className="h6">Swedish Massage</td>
                  <td>+913-148-60985</td>
                  <td>H 152/d, Bihar</td>
                  <td>INR 4500</td>
                  <td>
                    <a
                      className="btn btn-info btn-sm"
                      href="/employee/view-invoice/1"
                    >
                      <i className="bi bi-eye" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>#00001</td>
                  <td>#00002</td>
                  <td>
                    <a href="#" className="text-red">
                      Nathan
                    </a>
                  </td>
                  <td className="h6">Natural Massage</td>
                  <td>+918-119-88790</td>
                  <td>H 152/d, Bihar</td>
                  <td>INR 3500</td>
                  <td>
                    <a
                      className="btn btn-info btn-sm"
                      href="/employee/view-invoice/1"
                    >
                      <i className="bi bi-eye" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>#00001</td>
                  <td>#00003</td>
                  <td>
                    <a href="#" className="text-red">
                      Kelly
                    </a>
                  </td>
                  <td className="h6">Medical Massage</td>
                  <td>+915-117-88763</td>
                  <td>H 152/d, Bihar</td>
                  <td>INR 2400</td>
                  <td>
                    <a
                      className="btn btn-info btn-sm"
                      href="/employee/view-invoice/1"
                    >
                      <i className="bi bi-eye" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>#00001</td>
                  <td>#00005</td>
                  <td>
                    <a href="#" className="text-red">
                      Kevin
                    </a>
                  </td>
                  <td className="h6">Fitness Program</td>
                  <td>+915-667-99808</td>
                  <td>H 152/d, Bihar</td>
                  <td>INR 5690</td>
                  <td>
                    <a
                      className="btn btn-info btn-sm"
                      href="/employee/view-invoice/1"
                    >
                      <i className="bi bi-eye" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table> */}
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

                {loading ? "loading..." :
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
    // </div >

  )
}
