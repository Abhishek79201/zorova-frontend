import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProviders, providerStatusUpdateByAdmin } from '../../features/providerSlicer';
import Swal from 'sweetalert2';
import { REACT_APP_BASE_URL } from '../../../config';
import loadingGif from '../../../loading1.gif';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTables from 'datatables.net';
const base_url = REACT_APP_BASE_URL;


const PendingProviders = () => {
    const stateProviders = useSelector(state => state.provider.provider);
    const loading = useSelector(state => state.provider.laoding);
    const [modelData, setModalData] = useState();
    const [providers, setProviders] = useState(stateProviders?.filter(provider => provider.status?.toLowerCase() === "pending") || []);
    const dispatch = useDispatch();
    const [triggerFetch, setTriggerFetch] = useState(false);

    useEffect(() => {
        dispatch(getAllProviders());
        setTriggerFetch(false);
    }, [triggerFetch]);

    useEffect(()=>{
        if(stateProviders.length >0){
            new DataTables('#data-table', {
            });
        }
   },[stateProviders]);

    const handleApprove = async (id, status) => {
        const swalResult = await Swal.fire({
            title: 'Status Confirmation',
            text: `Are you sure you want to ${status == "Approved" ? "Approve" : "Disapprove"} user?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${status == "Approved" ? "Approve" : "Disapprove"}`
        });

        if (swalResult.isConfirmed) {
            dispatch(providerStatusUpdateByAdmin({ providerId: id, status })).then((result) => {
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

    const handleModalData = (data) => {
        setModalData({
            'Profile Photo': `${base_url}/images/${data.userData[0]?.avatar}`,
            'Full Name': `${data.userData[0]?.fullName}`,
            'Date of Birth': `${data.userData[0]?.dob}`,
            'Gender': `${data.userData[0]?.gender}`,
            'Email': `${data.userData[0]?.email}`,
            'Contact': `${data.userData[0]?.phone}`,
            'Certificate or License': `${base_url}/images/${data.certificate}`,
            'Year of Experience': `${data.yearsOfExperience}`,
            'Area of Specialization': `${data.addressLine2}`,
            'Services You Are Interested in Providing': `${data.services}`,
            'Locations Where You Prefer': `${data.areas}`,
            'Aadhar Card': `${base_url}/images/${data.aadharCard}`
        })
    }

    const handleDelete = (index) => {
        console.log('Deleting:', providers[index]);
        setProviders(currentProviders => currentProviders.filter((_, i) => i !== index));
        // You would also need to handle deletion in your backend or state management
    };

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Pending Service Provider</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id='data-table' className="table table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Full Name</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Speciality</th>
                                            <th>Year of Experience</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {stateProviders?.filter(provider => provider.status?.toLowerCase() === "pending").map((provider, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{provider.userData[0].fullName}</td>
                                                    <td>{provider.userData[0].phone}</td>
                                                    <td>{provider.userData[0].email}</td>
                                                    <td>{provider.userData[0].gender}</td>
                                                    <td>{provider.areasOfSpecialization.map((type, index) => (<>{type} - </>))}</td>
                                                    <td>{provider.yearsOfExperience}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#scrollingModalDemo2" onClick={() => handleModalData(provider)}>View</button>
                                                        <button className="btn btn-sm btn-warning" onClick={() => handleApprove(provider._id, "Approved")}>Approve</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(provider._id)}>Delete</button>
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
                            <h4 className="modal-title" id="scrollingModalDemo2Label">Service Provider</h4>
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
                                                    <td style={{ width: '240px !important' }}>{label == "Certificate or License" || label == "Aadhar Card" || label == "Profile Photo" ? <img src={value} alt="no image" height={100} width={200} /> : value}</td>
                                                </tr>
                                            )) : null}
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
};

export default PendingProviders;
