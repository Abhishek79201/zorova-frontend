import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllReferrals, updatePaymentStatus } from '../../features/referralSlicer';
import loadingGif from '../../../loading1.gif';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';

export default function RequestReferralPayment() {

    const dispatch = useDispatch();
    const [modelData, setModalData] = useState();
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [reason, setReason] = useState('');
    const allReferralsStateData = useSelector((state) => state.referral.allreferrals.filter((item) => item.status == "Pending"));
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
    const handleStatus = async (id, status, amount, appointment_ids) => {
        const swalResult = await Swal.fire({
            title: 'Status Confirmation',
            text: `Are you sure you want to ${status} payment?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${status}`
        });

        if (swalResult.isConfirmed) {
            dispatch(updatePaymentStatus({ id, status, reason, amount, appointment_ids })).then((result) => {
                if (!result.error) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Status Updated Successfully!'
                    });
                    setTriggerFetch(true);
                };
            });
        } else {
            return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleStatus(selectedId, "Rejected");
    }

    const handleModalData = (data) => {
        setModalData({
            'Full Name': `${data.fullName}`,
            'Date of Birth': `${data.dateOfBirth}`,
            'Contact': `${data.contact}`,
            'Email': `${data.email}`,
            'Business Info': `${data.businessInfo}`,
            'Current Business': `${data.businessExperience}`,
            'Business Experience': `${data.fullName}`,
            'Proposed Location for Franchise': `${data.proposedLocation}`,
            'Business Plan Summary': `${data.businessPlan}`,
            'Financial Information': `${data.financialInfo}`,
        });
    }


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
                                            <th>Action</th>
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
                                                <td>
                                                    <button className="btn btn-sm btn-warning" onClick={() => { handleStatus(data._id, "Approved", data.amount, data.appointment_ids) }} >Approve</button>
                                                    <button className="btn btn-sm btn-danger" data-toggle="modal" data-target="#scrollingModalDemo3" onClick={() => { setSelectedId(data._id) }}  >Reject</button>
                                                </td>

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

            <div className="modal fade" id="scrollingModalDemo3" data-keyboard="false" tabIndex="-1" aria-labelledby="scrollingModalDemo2Label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <form onSubmit={handleSubmit} className="modal-content" >
                        <div className="modal-header">
                            <h4 className="modal-title" id="scrollingModalDemo2Label">Give reason to reject fanchise request</h4>
                            <button type="button" className="btn btn-light btn-circle dismiss" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="material-icons">close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="table-responsive">
                                    <p>Request Id: {selectedId ? selectedId : null}</p>
                                    <textarea name="" id="" cols="37" rows="2" required onChange={(e) => setReason(e.target.value)} ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-danger" >Reject</button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
