import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartners, updatePartner } from '../../features/adminSlicer';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import loadingGif from '../../../loading1.gif';

export default function RequestedFranchise() {

    const dispatch = useDispatch();
    const [modelData, setModalData] = useState();
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [reason, setReason] = useState('');
    const partnersStateData = useSelector((state) => state.admin.partners.filter((item) => item.status == "Pending"));
    const loading=useSelector((state)=>state.admin.loading);

    useEffect(() => {
        dispatch(getPartners());
        setTriggerFetch(false);
    }, [triggerFetch]);

    useEffect(() => {
        // if (stateClients.length > 0) {
        new DataTable('#data-table', {
            // config options...
        });
    }, []);

    const handleStatus = async (id, status) => {
        const swalResult = await Swal.fire({
            title: 'Status Confirmation',
            text: `Are you sure you want to ${status} partner?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${status}`
        });

        if (swalResult.isConfirmed) {
            dispatch(updatePartner({ id, status, reason })).then((result) => {
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
        handleStatus(selectedId, "Reject");
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

    const franchiseData = [
        {
            fullname: 'John Doe',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            info: 'New Franchise',
            location: 'Muzafarpur',
        },
        {
            fullname: 'Tig Nixon',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            info: 'New Franchise',
            location: 'Seohar',
        },
        {
            fullname: 'Taeg ixon',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            info: 'New Franchise',
            location: 'Seohar',
        }
    ];

    const franchiseDetails = {
        'Full Name': 'Alex Nixon',
        'Date of Birth': '01-01-1985',
        'Contact': '+913-148-60985',
        'Email': 'izaid@gmail.com',
        'Business Info': 'Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac ',
        'Current Business': 'dapibus ac facilisis in, egestas eget quam. Morbi ',
        'Business Experience': '15',
        'Proposed Location for Franchise': 'Cras mattis consectetur purus sit amet fermentum.',
        'Business Plan Summary': 'Cras mattis consectetur purus sit amet fermentum.',
        'Financial Information': 'Cras mattis consectetur purus sit amet fermentum. ',
    };

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Franchise Requests</span>
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
                                            <th>Sr. #</th>
                                            <th>Full Name</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Business Info</th>
                                            <th>Proposed Location</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {partnersStateData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.fullName}</td>
                                                    <td>{data.contact}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.businessInfo}</td>
                                                    <td>{data.proposedLocation}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#scrollingModalDemo2" onClick={() => { handleModalData(data) }}>View</button>
                                                        <button className="btn btn-sm btn-warning" onClick={() => { handleStatus(data._id, "Approve") }} >Approve</button>
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
            <div className="modal fade" id="scrollingModalDemo2" data-keyboard="false" tabIndex="-1" aria-labelledby="scrollingModalDemo2Label" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="scrollingModalDemo2Label">Franchise Request</h4>
                            <button type="button" className="btn btn-light btn-circle dismiss" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true" className="material-icons">close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="table-responsive">
                                    <table className="table table-striped ">
                                        <tbody>
                                            {modelData ? Object.entries(modelData).map(([label, value]) => (
                                                <tr key={label}>
                                                    <td className="h6">{label}</td>
                                                    <td style={{ width: '240px !important' }}>{value}</td>
                                                </tr>
                                            )) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
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
