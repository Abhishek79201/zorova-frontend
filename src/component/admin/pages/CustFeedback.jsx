import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../../features/adminSlicer';
import { Link } from 'react-router-dom';
import loadingGif from '../../../loading1.gif';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTables from 'datatables.net';

const CustomerFeedback = () => {

    const dispatch = useDispatch();
    const [triggerFetch, setTriggerFetch] = useState(false);
    const loading = useSelector((state) => state.admin.loading);


    useEffect(() => {
        dispatch(getAllOrders());
        setTriggerFetch(false);
    }, [triggerFetch]);

    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);
    

    const stateOrders = useSelector((state) => state.admin.orders);
    const filteredOrders = stateOrders.filter((item) => item.status == "Finished");


    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Customer Feedback</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 ">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id="data-table" className="table table-hover w-100">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Client Name</th>
                                            <th>Provider Name</th>
                                            <th>Comment</th>
                                            <th>Service Type</th>
                                            <th>Phone</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                    <tbody>
                                        {loading ? "loading..." :

                                            filteredOrders.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.serviceData ? data.serviceData[0]?.fullName : ''}</td>
                                                    <td>{data.providerData ? data.providerData[0]?.fullName : ''}</td>
                                                    <td>{data.commentToProvider}</td>
                                                    <td>{data.service} - {data.serviceData[0]?.serviceType}</td>
                                                    <td>{data.serviceData[0]?.phone}</td>
                                                    <td>
                                                        {data.ratingToProvider && data.ratingToProvider != 0 ? (
                                                            <div className="star-rating">
                                                                {[1, 2, 3, 4, 5].map((value, index) => (
                                                                    <span
                                                                        key={value}
                                                                        className={`star ${data?.ratingToProvider <= index ? '' : 'text-info'}`}
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
                                                    {/* <td><button className="btn btn-sm btn-primary">View</button></td> */}
                                                </tr>
                                            ))

                                        }
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

export default CustomerFeedback;
