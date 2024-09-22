import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignProvider, getActiveProviders, getAssignedOrders, getBodyguards, getNewOrders, statData } from "../../features/employeeSlicer";
import moment from "moment";
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import ApexCharts from 'apexcharts';


export default function EmployeeDashboard() {

  const dispatch = useDispatch();
  const assignedOrders = useSelector((state) => state.employee.assignedOrders);
  const newOrders = useSelector((state) => state.employee.newOrders);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [chartTriggerFetch, setChartTriggerFetch] = useState(false);
  const loading = useSelector((state) => state.employee.loading);
  const [assignmentData, setAssignmentData] = useState({ providerId: "", bodyguardId: "" });
  const getStateActiveProviders = useSelector((state) => state.employee.activeProviders);
  const rejectedOrders = assignedOrders.filter(obj => obj.status == "Rejected");
  const [selectedDate, setSelectedDate] = useState(moment(new Date(), 'YYYY-MM-DD').toDate());
  const chartData = useSelector((state) => state.employee.stats);
  const [data, setData] = useState(chartData);

  useEffect(()=>{
    dispatch(statData(selectedDate)).then((result) => {
      if (!result.error) {
        setData(result.payload);
      }
    });
  },[chartTriggerFetch]);

  useEffect(() => {
    setChartTriggerFetch(false);
    // Helper function to align data based on dates

    // Helper function to generate an array of dates for the past 7 days
    const generatePastWeekDates = () => {
      const dates = [];
      const currentDate = moment(selectedDate, 'YYYY-MM-DD').toDate(); // Convert to native Date object

      for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - i);

        // Ensure single-digit day and month values have leading zeros
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');

        const formattedDate = `${day}-${month}-${date.getFullYear()}`;
        dates.push(formattedDate);
      }

      return dates;
    };



    // Helper function to align data based on dates
    const alignDataByDate = (servicesData, newUsersData, dates) => {
      const alignedData = [];

      dates?.forEach((date) => {
        const correspondingServiceItem = servicesData?.find(
          (serviceItem) => serviceItem.date === date
        );
        const correspondingUserItem = newUsersData?.find(
          (userItem) => userItem.date === date
        );

        alignedData.push({
          date: date,
          services: correspondingServiceItem ? correspondingServiceItem.services : 0,
          newUsers: correspondingUserItem ? correspondingUserItem.newUsers : 0,
        });
      });

      return alignedData;
    };

    // Generate an array of past week dates
    const weekDates = generatePastWeekDates();

    // console.log(appoin);
    // Extracting services and new users into separate arrays
    const servicesArray = data?.appointments?.map(appointment => appointment);
    const newUsersArray = data?.users?.map(user => user);
    console.log(servicesArray)
    // Align the data based on dates
    const alignedData = alignDataByDate(servicesArray, newUsersArray, weekDates);
    console.log(newUsersArray);
    const options = {
      chart: {
        height: 153,
        width: "100%",
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15px",
          startingShape: "flat",
          endingShape: "flat",
          dataLabels: {
            position: "top",
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              width: "100%", // Adjust the width for smaller screens
            },
          },
        },
      ],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      series: [
        {
          name: "New Client",
          data: alignedData.map(item => item.newUsers),
        },
        {
          name: "Services",
          data: alignedData.map(item => item.services),
        },
      ],
      legend: {
        show: false,
      },
      xaxis: {
        categories: alignedData.map(item => item.date),
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      grid: {
        borderColor: "#b7c6d8",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      colors: ["#A780F4", "#a5acc3", "#dfe2ed"],
    };



    const chart = new ApexCharts(document.querySelector("#customersData"), options);
    chart.render();
    setTriggerFetch(false);
    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  
  }, [selectedDate, data, chartTriggerFetch ]);




  // Fetch records when the component mounts
  useEffect(() => {
    dispatch(getAssignedOrders());
    dispatch(getNewOrders());
    dispatch(getActiveProviders());
    // dispatch(getCustomerReviews());
    setTriggerFetch(false);
  }, [dispatch, triggerFetch]);



  const columns = [
    { name: 'Order Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true, },
    { name: 'Customer', selector: row => row.customerData[0]?.fullName, sortable: true, style: { padding: 0, margin: 0 } },
    { name: 'Provider', selector: row => row.providerData[0]?.fullName, sortable: true, },
    { name: 'Massage Type', selector: row => row.serviceData[0]?.serviceType, sortable: true, },
    { name: 'Date', selector: row => row.service == "Fitness" ? '-' : `${row.timestamp} m`, sortable: true, },
    { name: 'Price', selector: row => row.serviceData[0]?.cost, sortable: true, },
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
                  {"Assign"}
                </span> : row?.status == "Canceled" ?
                  <span className="w-100 h-50 btn btn-danger d-flex justify-content-center align-items-center">
                    {row?.status}
                  </span> :
                  <span className="w-100 h-50 btn btn-primary d-flex justify-content-center align-items-center">
                    {row?.status}
                  </span>
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

  const filteredData = assignedOrders?.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="container-fluid">
      {newOrders?.length > 0 ?
        <div className="card mb-2">
          <ol className="breadcrumb d-none d-lg-flex ms-3">
            <li className="breadcrumb-item">
              <i className="bi bi-bell lh-2" />
              <a href="/employee/new-order" className="text-decoration-none">You have <span className="badge bg-danger">{newOrders?.length}</span> New Order</a>
            </li>
          </ol>
        </div>
        : null}
      {/* {rejectedOrders?.length > 0 ?  */}
      {rejectedOrders.length > 0 && rejectedOrders?.map((item, index) => (
        <div className="card mb-4">
          <ol className="breadcrumb d-lg-flex ms-3">
            <li className="breadcrumb-item">
              <i className="bi bi-bell lh-2" />
              <span className="badge bg-danger">X</span><a href="/employee/assigned-orders" className="text-decoration-none">{item.providerData[0].fullName} Rejected the Request for Order # flx-{item._id.slice(-5).toUpperCase()}
                <span className="badge btn bg-success"> Assign New Provider</span>
                {/* {'{'}{'{'}-- <span className="badge btn bg-danger">Reject</span> */}
              </a>
            </li>
          </ol>
        </div>
      ))}

      {/* Row start */}
      <div className="row">
        <div className="col-xl-4 col-lg-6 col-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex flex-row justify-content-between">
                <div>
                  <h5 className="mb-4 fw-normal">New Order</h5>
                  <h1 className="fw-bold m-0 display-6">{newOrders?.length}</h1>
                </div>
                <div className="d-flex justify-content-between flex-column">
                  <div className="growth-block mb-4 danger rounded-5">
                    <i className="bi bi-caret-down-fill" />
                    <span>{loading ? "laoding...": data?.profit>100 ? 0:100 - data?.profit}%</span>
                  </div>
                  <Link to="/employee/new-order" className="text-primary text-decoration-none d-flex align-items-center">Details <i className="bi bi-caret-right-fill fs-4" /></Link>
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
                  <h1 className="fw-bold m-0 display-6">{newOrders?.length + assignedOrders?.length}</h1>
                </div>
                <div className="d-flex justify-content-between flex-column">
                  <div className="growth-block mb-4 info rounded-5">
                    <i className="bi bi-caret-up-fill" />
                    <span>{loading || !data ? "laoding...":data?.profit}%</span>
                  </div>
                  <Link to="/employee/orders" className="text-primary text-decoration-none d-flex align-items-center">Details <i className="bi bi-caret-right-fill fs-4" /></Link>
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
                  <h5 className="mb-4 fw-normal">Available Providers</h5>
                  <h1 className="fw-bold m-0 display-6">{getStateActiveProviders?.length}</h1>
                </div>
                <div className="d-flex justify-content-between flex-column">
                  {/* {'{'}{'{'}-- <div className="growth-block mb-4 success rounded-5">
                <i className="bi bi-caret-down-fill" />
                <span>30%</span>
              </div> --{'}'}{'}'} */}
                  <a href="javascript:void(0)" className="text-primary text-decoration-none d-flex align-items-center">Details <i className="bi bi-caret-right-fill fs-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Row end */}
      {/* Row start */}
      <div className="row">
        <div className="col-xl-6 col-12">
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="card-title">Recent Orders</h4>
            </div>
            <div className="card-body">
              <div className="border border-dark rounded-3">
                <div className="table-responsive">
                  <table className="table align-middle custom-table m-0">
                    <thead>
                      <tr>
                        <th>OrderId</th>
                        <th>Customer Name</th>
                        <th>provider</th>
                        <th>Massage Type</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? "laoding...": filteredData?.slice(0, 5).map((row, index) => (
                        <tr key={index}>
                          <td>{row._id.slice(-5).toUpperCase()}</td>
                          <td>{row.customerData[0]?.fullName}</td>
                          <td>{row.providerData[0]?.fullName}</td>
                          <td>
                           {row.serviceData[0]?.serviceType}
                          </td>
                          <td>{moment(row.timestamp).format("YYYY:MM:DD") }</td>
                          <td>${row.serviceData[0]?.cost}</td>
                          <td>
                            <button className="btn btn-outline-success btn-sm">
                             { row?.status == "Started" ?
                              <span >
                                {row?.status}
                              </span> :
                              row?.status == "Rejected" ?
                              <span >
                                {row?.status}
                              </span> : row?.status == "Pending" ?
                              <span >
                                {row?.status}
                              </span> : row?.status == "Assigned" ?
                              <span >
                                {row?.status}
                              </span> : row?.status == "Canceled" ?
                              <span >
                                {row?.status}
                              </span> :
                              <span >
                                {row?.status}
                              </span>
                            }
                            </button>
                          </td>
                        </tr>
                      ))}

                      {/* <tr>
                    <td>123</td>
                    <td>Some Name</td>
                    <td>Some Provider</td>
                    <td>
                      <a href="#" className="btn-link">Natural Massage</a>
                    </td>
                    <td>24/02/2023</td>
                    <td>$29</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
                        Processing
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>123</td>
                    <td>Some Name</td>
                    <td>Some Provider</td>
                    <td>
                      <a href="#" className="btn-link">Natural Massage</a>
                    </td>
                    <td>24/02/2023</td>
                    <td>$29</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
                        Processing
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>123</td>
                    <td>Some Name</td>
                    <td>Some Provider</td>
                    <td>
                      <a href="#" className="btn-link">Medical Massage</a>
                    </td>
                    <td>26/02/2023</td>
                    <td>$48</td>
                    <td>
                      <button className="btn btn-outline-success btn-sm">
                        Completed
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>123</td>
                    <td>Some Name</td>
                    <td>Some Provider</td>
                    <td>
                      <a href="#" className="btn-link">Stretch</a>
                    </td>
                    <td>29/03/2023</td>
                    <td>$65</td>
                    <td>
                      <button className="btn btn-outline-danger btn-sm">
                        Processing
                      </button>
                    </td>
                  </tr> */}
                    </tbody>
                  </table>
                  {/* <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    paginationTotalRows={filteredData?.length}


                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-12">
          <div className="card mb-4">
            <div className="card-header">
              <h4 className="card-title">Customers Data</h4>
              <input type="date" value={moment(selectedDate).format('YYYY-MM-DD')} onChange={(e) => { setSelectedDate(e.target.value); setChartTriggerFetch(true); }} />
            </div>
            <div className="card-body">
              <div className="d-flex gap-4 justify-content-center flex-row">
                <div className="stats-block bg-primary">
                  <i className="bi bi-bag-plus" />
                  <span>New Client</span>
                </div>
                <div className="stats-block bg-dark">
                  <i className="bi bi-cart3" />
                  <span>Services</span>
                </div>
              </div>
              <div id="customersData" />
            </div>
          </div>
        </div>
      </div>
      {/* Row end */}
    </div>

  )
}
