import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import '../../../chart.css';
import { VectorMap } from 'react-jvectormap';
import { getAllOrders, getChartData, getStatistics } from '../../features/adminSlicer';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LineColumnAreaChart = () => {
    const dispatch = useDispatch();
    const chartStateData = useSelector((state) => state.admin.chart);

    useEffect(() => {
        dispatch(getChartData());
    }, []);

    const series = [{
        name: 'Revenue',
        data: chartStateData?.data?.revenueEarned || []
    }, {
        name: 'Services',
        data: chartStateData?.data?.counts || []
    }];

    const options = {
        chart: {
            height: 290,
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        colors: ['#556ee6', '#f46a6a'], // Example colors, replace with your theme colors
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: chartStateData?.data?.dates || []
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
        legend: {
            itemMargin: {
                vertical: 20
            },
        }
    };

    return (
        <Chart options={options} series={series} type="area" height={290} />
    );
}

const IndiaMap = () => {
    const handleClick = (e, countryCode) => {
        console.log(countryCode);
    };

    const gdpData = {
        IN_OD: 158.97,
        IN_MH: 314.42,
        IN_BR: 287.37
    };

    return (
        <VectorMap
            map={'in_mill'}
            backgroundColor="transparent"
            zoomOnScroll={true}
            containerStyle={{
                width: '100%',
                height: '520px'
            }}
            onRegionClick={handleClick} // gets the country code
            containerClassName="map"
            regionStyle={{
                initial: {
                    fill: "#e65729",
                    "fill-opacity": 0.9,
                    stroke: "none",
                    "stroke-width": 0,
                    "stroke-opacity": 0
                },
                hover: {
                    "fill-opacity": 0.8,
                    cursor: 'pointer'
                },
                selected: {
                    fill: '#2938bc' // color for the clicked state
                },
                selectedHover: {}
            }}
            regionsSelectable={true}
            series={{
                regions: [{
                    values: gdpData, // can be replaced with dynamic data
                    scale: ['#C8EEFF', '#0071A4'],
                    normalizeFunction: 'polynomial'
                }]
            }}
            markers={[
                { latLng: [26, 85], name: "Muzafarpur" },
                { latLng: [25, 84], name: "Bihar" },
                { latLng: [24, 85], name: "Sheohar" },

            ]}
            markerStyle={{
                initial: {
                    fill: "#ffffff",
                    stroke: "#3659cd",
                    "fill-opacity": 1,
                    "stroke-width": 10,
                    "stroke-opacity": 0.4,
                    r: 15,
                },
                hover: {
                    fill: "#ffffff",
                    stroke: "#e13d4b",
                    "fill-opacity": 0.8,
                    "stroke-width": 10,
                    "stroke-opacity": 0.4,
                    r: 15,
                    cursor: "pointer",
                },
            }}
        />
    );
}

const WorldMapMarkers = () => {
    const options = {
        chart: {
            id: 'location-map',
            zoom: {
                enabled: false
            }
        },
        markers: {
            size: [30],
            colors: ['#F44336'],
            latitude: [28.7041],  // Latitude for New Delhi
            longitude: [77.1025]  // Longitude for New Delhi
        }
    };
    const series = [{
        name: 'Locations',
        data: [
            { x: 'New Delhi', y: 1 }
        ]
    }];

    return (
        <Chart options={options} series={series} type="scatter" height="350" />
    );
};



const Dashboard = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const stateOrders = useSelector((state) => state.admin.orders);
    const stateStats = useSelector((state) => state.admin.stats);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const loading = useSelector((state) => state.admin.loading);
    const chartStateData = useSelector((state) => state.admin.chart);
    const [chartData, setChartData] = useState(chartStateData || {});
    const [dataByDate, setDataByDate] = useState(false);

    useEffect(() => {
        dispatch(getChartData()).then((res) => {
            if (!res.error) {
                setChartData(res.payload);
            }
        });
    }, []);

    const series = [{
        name: 'Revenue',
        data: chartData?.data?.revenueEarned || []
    }, {
        name: 'Services',
        data: chartData?.data?.counts || []
    }];

    const options = {
        chart: {
            height: 290,
            type: 'area',
            toolbar: {
                show: false,
            }
        },
        colors: ['#556ee6', '#f46a6a'], // Example colors, replace with your theme colors
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: chartData?.data?.dates || []
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy'
            },
        },
        legend: {
            itemMargin: {
                vertical: 20
            },
        }
    };


    // Fetch records when the component mounts
    useEffect(() => {
        dispatch(getAllOrders());
        dispatch(getStatistics());
        setTriggerFetch(false);
    }, [triggerFetch]);


    // Example state for active buttons and selected dates
    const [activeButton, setActiveButton] = useState('');
    const [dates, setDates] = useState({ from: '', to: '' });

    // Handling date changes
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setDates((prevDates) => ({
            ...prevDates,
            [name]: value,
        }));
    };
    // Dummy data for demonstration. You would fetch or calculate these values in a real app.
    const cardData = [
        { title: "Total Orders", value: `${dataByDate ? chartData?.allOrders : stateStats?.allOrders}`, icon: "trending_up" },
        { title: "Total Services", value: `${dataByDate ? chartData?.services : stateStats?.services}`, icon: "monetization_on" },
        { title: "Total Revenue", value: `${dataByDate ? Math.round(chartData?.data?.revenueEarned?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) : stateStats?.totalRevenue}`, icon: "insert_chart" },
        { title: "Total Profit", value: `${dataByDate ? Math.round(chartData?.data?.profit?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) : stateStats?.totalRevenue - stateStats?.expenses}`, icon: "multiline_chart" },
        { title: "Total Expenses", value: `${dataByDate ? Math.round(chartData?.data?.expensesPartA?.reduce((accumulator, currentValue) => accumulator + currentValue, 0) + chartData?.data?.expensesPartB?.reduce((accumulator, currentValue) => accumulator + currentValue, 0)) : stateStats?.expenses}`, icon: "bubble_chart" },
        { title: "Total Users", value: `${dataByDate ? chartData?.allUsers : stateStats?.allUsers}`, icon: "person" },
        { title: "New Orders", value: `${dataByDate ? chartData?.newOrders : stateStats?.newOrders}`, icon: "receipt" },
    ];

    // Dummy data for the service demand table.
    const serviceDemandData = [
        { serviceType: "Natural Massage", popularity: 55 },
        { serviceType: "Medical Massage", popularity: 100 },
        { serviceType: "Fitness Program", popularity: 80 },
        { serviceType: "Stretching", popularity: 57 },
    ];

    const getChartDataByDate = (dates) => {
        if (dates.startDate == "" || dates.endDate == "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Both Start and End Dates are required`
            });
        } else {
            dispatch(getChartData(dates)).then((res) => {
                if (!res.error) {
                    setChartData(res.payload);
                    setDataByDate(true);
                }
            });
        }
    }

    const setEvent = (period) => {
        if (period == "Today") {
            dispatch(getChartData({ startDate: moment(new Date()).format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })).then((res) => {
                if (!res.error) {
                    setChartData(res.payload);
                    setDataByDate(true);
                    setActiveButton("Today");
                }
            });
        } else if (period == "Yesterday") {
            dispatch(getChartData({ startDate: moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD"), endDate: moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD") })).then((res) => {
                if (!res.error) {
                    setChartData(res.payload);
                    setDataByDate(true);
                    setActiveButton("Yesterday");
                }
            });
        } else if (period == "7 days") {
            dispatch(getChartData({ startDate: moment(new Date()).subtract(7, 'days').format("YYYY-MM-DD"), endDate: moment(new Date()).format("YYYY-MM-DD") })).then((res) => {
                if (!res.error) {
                    setChartData(res.payload);
                    setDataByDate(true);
                    setActiveButton("7 days");
                }
            });
        }
    }

    return (
        <div className="main-content container">
            <div className="page-header">
                <div className="app-actions">
                    {/* {['Today', 'Yesterday', '7 days'].map((period) => ( */}
                    <button type="button" className={`btn ${activeButton === "Today" ? 'active' : ''}`} onClick={() => setEvent("Today")}>
                        Today
                    </button>
                    <button type="button" className={`btn ${activeButton === "Yesterday" ? 'active' : ''}`} onClick={() => setEvent("Yesterday")}>
                        Yesterday
                    </button>
                    <button type="button" className={`btn ${activeButton === "7 days" ? 'active' : ''}`} onClick={() => setEvent("7 days")}>
                        7 days
                    </button>
                    {/* ))} */}
                    <div className="row ml-4">
                        <div className="span12">
                            <form className="form-inline" id="sandbox-container">
                                <label htmlFor="cid" className="ml-1 mx-1">From</label>
                                <input type="date" id="cid" name="from" className="span2 input-append date form-control" placeholder="dd/mm/yyyy" value={dates.from} onChange={handleDateChange} />
                                <label htmlFor="cod" className="ml-1 mx-1">To</label>
                                <input type="date" id="cod" name="to" className="span2 input-append date form-control" placeholder="dd/mm/yyyy" value={dates.to} onChange={handleDateChange} />
                                <button type="button" className="btn btn-primary" onClick={() => getChartDataByDate({ startDate: dates.from, endDate: dates.to })} >Update</button>
                            </form>
                        </div>
                    </div>
                    {/* Date Range and Buttons */}
                    {/* Omitted for brevity */}
                </div>
            </div>


            <div className="row">
                {cardData.map((card, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-3">
                        <div className="card shadow">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">{card.title}</h5>
                                        {loading || !card.value ? <Skeleton /> : <span className="h1 font-weight-bold mb-0">{card?.value}</span>}
                                    </div>
                                    <div className="col-auto col">
                                        <button className="btn btn-transparent-primary btn-lg btn-circle">
                                            <i className="material-icons">{card.icon}</i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
                {/* Line chart and Map chart come here */}
                <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Total Services</h3>
                            <div id="line-column-area-chart"></div>
                            {/* <LineColumnAreaChart /> */}
                            <div className='chart-container'>
                                <Chart options={options} series={series} type="area" height={290} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-12 col-lg-4">
                    <div className="card shadow">
                        <div className="card-header">Services Demand</div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Service Type</th>
                                            <th>Popularity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataByDate == true ? chartData?.serviceDemand && chartData?.serviceDemand.map((service, index) => (
                                            <tr key={index}>
                                                <td>{service._id} / {service.count}</td>
                                                <td>
                                                    <div className="progress">
                                                        <div className={`progress-bar bg-${index % 2 === 0 ? 'primary' : 'danger'}`} role="progressbar" style={{ width: `${service.count}%` }} aria-valuenow={service.popularity} aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                            stateStats?.serviceDemand && stateStats?.serviceDemand.map((service, index) => (
                                                <tr key={index}>
                                                    <td>{service._id}</td>
                                                    <td>
                                                        <div className="progress">
                                                            <div className={`progress-bar bg-${index % 2 === 0 ? 'primary' : 'danger'}`} role="progressbar" style={{ width: `${service.count}%` }} aria-valuenow={service.popularity} aria-valuemin="0" aria-valuemax="100"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header">
                            <div className="d-flex align-items-end flex-wrap">
                                <div className="">
                                    <h4 className="card-title">Top Area By Income</h4>
                                    <h5 className="fw-light mt-2 mb-0 lh-1">
                                        Million US Dollars
                                    </h5>
                                </div>

                            </div>
                        </div>
                        <div className="card-body">
                            <div className="border border-dark rounded-3">
                                <div className="row">
                                    <div className="col-xxl-8 col-md-12">
                                        <div className="table-responsive">
                                            <table className="table align-middle custom-table m-0">
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>Area</th>
                                                        <th>Users</th>
                                                        <th>Transactions</th>
                                                        <th>Total Revenue</th>
                                                        <th>Conversion</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ? <Skeleton count={5} /> : 
                                                   dataByDate ?
                                                    chartData?.aggregatedData &&
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <h2 className="my-3">{chartData?.aggregatedData?.users}</h2>
                                                            </td>
                                                            <td>
                                                                <h2 className="my-3">{chartData?.aggregatedData?.transactions}</h2>
                                                            </td>
                                                            <td>
                                                                <h2 className="my-3"> {chartData?.aggregatedData?.revenue}</h2>
                                                            </td>


                                                            <td>
                                                                <h2 className="my-3 text-primary">{Math.round(((chartData?.aggregatedData?.transactions) / chartData?.aggregatedData?.users) * 100)}%</h2>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                        :
                                                        stateStats?.aggregatedData &&
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                <h2 className="my-3">{stateStats?.aggregatedData?.users}</h2>
                                                            </td>
                                                            <td>
                                                                <h2 className="my-3">{stateStats?.aggregatedData?.transactions}</h2>
                                                            </td>
                                                            <td>
                                                                <h2 className="my-3"> {stateStats?.aggregatedData?.revenue}</h2>
                                                            </td>


                                                            <td>
                                                                <h2 className="my-3 text-primary">{Math.round(((stateStats?.aggregatedData?.transactions) / stateStats?.aggregatedData?.users) * 100)}%</h2>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    }
                                                    {loading ? <Skeleton count={5} /> :
                                                        dataByDate == true ?
                                                            chartData?.citiesData && chartData?.citiesData?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{item?.city}</td>
                                                                    <td>{item?.users}</td>
                                                                    <td>{item?.transactions}</td>
                                                                    <td>{item?.revenue}</td>
                                                                    <td>{((item?.transactions) / item?.users) * 100}%</td>
                                                                    <td></td>
                                                                </tr>
                                                            )) :
                                                            stateStats?.citiesData && stateStats?.citiesData?.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{item?.city}</td>
                                                                    <td>{item?.users}</td>
                                                                    <td>{item?.transactions}</td>
                                                                    <td>{item?.revenue}</td>
                                                                    <td>{((item?.transactions) / item?.users) * 100}%</td>
                                                                    <td></td>
                                                                </tr>
                                                            ))
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-xxl-4 col-md-12">
                                        <IndiaMap />                                \
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Total Services</h3>
                            <IndiaMap />
                        </div>
                    </div>
                </div> */}

                <div className="col-lg-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Today's Orders</h4>
                            <div className="table-responsive">
                                <table className="table table-borderless table-centered table-nowrap mb-0">
                                    <thead className="thead-light rounded">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer Name</th>
                                            <th>Service Type</th>
                                            <th>Order Date</th>
                                            <th>Total</th>
                                            <th>Payment Status</th>
                                            <th>Order Status</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stateOrders?.slice(0, 5).map((item, index) => (
                                            <tr key={index}>
                                                <td><a href="#" className="text-body font-weight-bold"># {item._id.slice(-5).toUpperCase()}</a></td>
                                                <td>{item.customerData[0]?.fullName}</td>
                                                <td>{item.serviceData ? item.serviceData[0]?.serviceType : "Fitness"}</td>
                                                <td>{moment(item.timestamp).format("YYYY-MM-DD")}</td>
                                                <td><i className="bi bi-currency-rupee"></i>{item.cost}</td>
                                                <td><span className="badge badge-transparent-success p-2">{item.paidStatus}</span></td>
                                                <td>
                                                    {item.status == "Pending" ?
                                                        <span className="badge badge-warning">{item.status}</span>
                                                        : item.status == "Finished" ?
                                                            <span className="badge badge-info">{item.status}</span>
                                                            : item.status == "Started" ?
                                                                <span className="badge badge-success">{item.status}</span>
                                                                :
                                                                <span className="badge badge-primary">{item.status}</span>
                                                    }
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary" size="sm"
                                                    onClick={()=>navigate(`/admin/view-invoice/${item._id}`)}
                                                    >
                                                        view
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* Repeat <tr>...</tr> for each row needed */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Placeholder for Top Area By Income */}
                {/* You would include similar JSX structure here */}

                {/* Today's Orders Table */}
                {/* Similar approach as the Services Demand table */}
                {/* Omitted for brevity */}

            </div>
        </div>
    );
};

export default Dashboard;
