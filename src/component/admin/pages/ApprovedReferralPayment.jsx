import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { getAllReferrals, updatePaymentStatus } from '../../features/referralSlicer';
import loadingGif from '../../../loading1.gif';

export default function ApprovedReferralPayments() {

    const dispatch = useDispatch();
    const [triggerFetch, setTriggerFetch] = useState(false);
    const allReferralsStateData = useSelector((state) => state.referral.allreferrals.filter((item) => item.status == "Approved"));
    const loading=useSelector((state)=>state.admin.loading);


    useEffect(() => {
        dispatch(getAllReferrals());
        setTriggerFetch(false);
    }, [triggerFetch]);

    useEffect(() => {
        // if (stateClients.length > 0) {
            new DataTable('#data-table', {
                // config options...
            });
    }, []);


    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Payment Requests</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id="data-table" className="table table-hover w-100">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Referral Id</th>
                                            <th>Full Name</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Requested Amount</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                    <tbody>
                                        {allReferralsStateData.map((data, index) => (
                                            <tr key={index}>
                                                 <td># {data.referralData[0]?._id.slice(-5).toUpperCase()}</td>
                                                <td>{data.referralData[0]?.fullName}</td>
                                                <td>{data.referralData[0]?.phone}</td>
                                                <td>{data.referralData[0]?.email}</td>
                                                <td>{data.amount}</td>

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
}
