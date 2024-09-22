import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartners, updatePartner } from '../../features/adminSlicer';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import loadingGif from '../../../loading1.gif';

export default function RejectedFranchise() {

    const dispatch=useDispatch();
    const [modelData, setModalData]=useState();
    const [triggerFetch,setTriggerFetch]=useState(false);
    const partnersStateData=useSelector((state)=>state.admin.partners.filter((item)=>item.status=="Reject"));
    const loading=useSelector((state)=>state.admin.loading);

    
    useEffect(()=>{
        dispatch(getPartners());
        setTriggerFetch(false);
    },[triggerFetch]);
    useEffect(() => {
        // if (stateClients.length > 0) {
            new DataTable('#data-table', {
                // config options...
            });
    }, []);

    const handleModalData = (data)=>{
        setModalData({
            'Full Name': `${data.fullName}`,
            'Date of Birth': `${data.dateOfBirth}`,
            'Contact': `${data.contact}`,
            'Email': `${data.email}`,
            'Business Info': `${data.businessInfo}`,
            'Current Business': `${data.businessExperience}`,
            'Business Experience':`${data.fullName}`,
            'Proposed Location for Franchise': `${data.proposedLocation}`,
            'Business Plan Summary': `${data.businessPlan}`,
            'Financial Information': `${data.financialInfo}`,
            'Reason To Reject':`${data.reasonToReject}`
        });
    }

    const franchiseData = [
        {
            fullname: 'John Doe',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            info: 'New Franchise',
            location: 'Muzafarpur',
            reason: 'Low Budget',
        },
        {
            fullname: 'Tig Nixon',
            contact: '+91231943621',
            Email: 'anyexample@ex.com',
            info: 'New Franchise',
            location: 'Seohar',
            reason: 'Low Budget',
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
                    <span className="h2">Rejected Franchise</span>
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
                                            <th>Rejection Reason</th>
                                            <th>Actions</th>
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
                                                <td>{data.reasonToReject}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#scrollingModalDemo2" onClick={()=>{handleModalData(data)}}>View</button>
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
                                    <table className="table table-striped">
                                        <tbody>
                                            {modelData ? Object.entries(modelData).map(([label, value]) => (
                                                <tr key={label}>
                                                    <td className="h6">{label}</td>
                                                    <td style={{ width: '240px !important' }}>{value}</td>
                                                </tr>
                                            )):null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
