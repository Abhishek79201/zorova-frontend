import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../features/adminSlicer';
import { Link } from 'react-router-dom';
import loadingGif from '../../../loading1.gif';
import DataTables from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';

const AllOrders = () => {

    const dispatch = useDispatch();
    const stateOrders = useSelector((state) => state.admin.orders);
    const [triggerFetch, setTriggerFetch] = useState(false);
    const loading = useSelector((state) => state.admin.loading);


    // Fetch records when the component mounts
    useEffect(() => {
        dispatch(getAllOrders());
        setTriggerFetch(false);
    }, [triggerFetch]);


    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);



    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">All Orders</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-hover w-100" id="data-table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Order Id</th>
                                            <th>Full Name</th>
                                            <th>Service Type</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Gross Amount</th>
                                            <th>Transportation</th>
                                            <th>GST</th>
                                            <th>Promotional Discount</th>
                                            <th>Net Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {stateOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td># {order._id.slice(-5).toUpperCase()}</td>
                                                    <td>{order.customerData[0]?.fullName}</td>
                                                    <td>{order.serviceData[0]?.serviceType}</td>
                                                    <td>{order.serviceData[0]?.phone}</td>
                                                    <td>{order.serviceData[0]?.addressLine1}</td>
                                                    <td>{order.serviceData[0]?.totalAmount}</td>
                                                    <td>{order.serviceData[0]?.transportation}</td>
                                                    <td>{order.serviceData[0]?.GST}</td>
                                                    <td>{order.serviceData[0]?.discount}</td>
                                                    <td>{order.serviceData[0]?.netAmount}</td>
                                                    <td>
                                                        <span className={`badge ${order.status === 'Completed' || 'Finished' ? 'badge-success' : 'badge-danger'}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td><a href={`/admin/view-invoice/${order._id}`} className="btn btn-sm btn-primary">View Invoice</a></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllOrders;
