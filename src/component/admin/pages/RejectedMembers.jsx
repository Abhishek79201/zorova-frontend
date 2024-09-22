import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/jquery.dataTables.css';
import { getMembers } from '../../features/adminSlicer';
import loadingGif from '../../../loading1.gif';

const RejectedMembers = () => {


    const dispatch = useDispatch();
    const [modelData, setModalData] = useState();
    const [triggerFetch, setTriggerFetch] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [reason, setReason] = useState('');
    const membersStateData = useSelector((state) => state.admin.members.filter((item) => item.status == "Reject"));
    const loading=useSelector((state)=>state.admin.loading);


    useEffect(() => {
        dispatch(getMembers());
        setTriggerFetch(false);
    }, [triggerFetch]);

    useEffect(() => {
        // if (stateClients.length > 0) {
            new DataTable('#data-table', {
                // config options...
            });
    }, []);


    const handleModalData = (data) => {
        if (data.familyMembers && data.familyMembers.length > 0) {
            // Initialize an empty object to hold combined properties
            const combinedObject = {};

            // Iterate through the array and combine properties into the combined object
            // Iterate through the array and merge each object into the combined object
            data.familyMembers.forEach((member, index) => {
                combinedObject[`${index + 1} person name`] = member[`name${index + 1}`];
                combinedObject[`${index + 1} person DOB`] = member[`dob${index + 1}`];
                combinedObject[`${index + 1} person gender`] = member[`gender${index + 1}`];
            });



            const otherDataObject = {
                'Full Name': `${data.fullName}`,
                'Date of Birth': `${data.dob}`,
                'Gender': `${data.gender}`,
                'Email': `${data.email}`,
                'Contact': `${data.phone}`,
                'Alternate Contact': `${data.phone}`,
                'Address Line 1': `${data.addressLine1}`,
                'Address Line 2': `${data.addressLine2}`,
                'City': `${data.fullName}`,
                'State/Province/Region': `${data.state}`,
                'Zip/Postal Code': `${data.zipCode}`,
                'Membership Type': `${data.membershipType}`,
                'Cost': `${data.cost}`
            }
            console.log(combinedObject);
            setModalData({ ...otherDataObject, ...combinedObject });
        } else {
            setModalData({
                'Full Name': `${data.fullName}`,
                'Date of Birth': `${data.dob}`,
                'Gender': `${data.gender}`,
                'Email': `${data.email}`,
                'Contact': `${data.phone}`,
                'Alternate Contact': `${data.phone}`,
                'Address Line 1': `${data.addressLine1}`,
                'Address Line 2': `${data.addressLine2}`,
                'City': `${data.fullName}`,
                'State/Province/Region': `${data.state}`,
                'Zip/Postal Code': `${data.zipCode}`,
                'Membership Type': `${data.membershipType}`,
                'Cost': `${data.cost}`,
            })
        }

    }


    return (
        <>
            <div className="main-content container">
                <div className="page-header">
                    <div>
                        <span className="h2">Rejected Membership</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 ">
                        <div className="card shadow">
                            <div className="card-body ">
                                <div className="table-responsive">
                                    <table id="data-table" className="table table-hover w-100">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Sr #</th>
                                                <th>Full Name</th>
                                                <th>Contact</th>
                                                <th>Email</th>
                                                <th>Gender</th>
                                                <th>Membership Type</th>
                                                <th>Cost</th>
                                                <th>Status</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {membersStateData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.fullName}</td>
                                                    <td>{data.phone}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.gender}</td>
                                                    <td>{data.membershipType}</td>
                                                    <td>{data.cost}</td>
                                                    <td>{data.reasonToReject}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#scrollingModalDemo2" onClick={() => { handleModalData(data) }} >View</button>
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
        </>
    );
};

export default RejectedMembers;
