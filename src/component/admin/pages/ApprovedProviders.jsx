import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProviders } from '../../features/providerSlicer';
import { REACT_APP_BASE_URL } from '../../../config';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTables from 'datatables.net';
import loadingGif from '../../../loading1.gif';
const base_url = REACT_APP_BASE_URL;


const ApprovedProviders = () => {
    const stateProviders = useSelector(state => state.provider.provider);
    const loading = useSelector(state => state.provider.laoding);
    const [modelData, setModalData] = useState();
    const [providers, setProviders] = useState(stateProviders?.filter(provider => provider.status?.toLowerCase() === "approved") || []);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllProviders()).then((result) => {
            if (!result.error) {
                setProviders(result.payload?.filter(provider => provider.status?.toLowerCase() === "approved"));
            }
        });
    }, []);
    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState({});

    const handleViewDetails = (provider) => {
        setSelectedProvider(provider);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
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

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Our Service Provider</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id="data-table" className="table table-hover">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Full Name</th>
                                            <th>Total Revenue</th>
                                            <th>Credited</th>
                                            <th>Pending</th>
                                            <th>Joining Date</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Speciality</th>
                                            <th>Year of Experience</th>
                                            <th>Order Accepted</th>
                                            <th>Order Rejected</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {providers.map((provider, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{provider.userData[0].fullName}</td>
                                                    <td>{provider.revenue}</td>
                                                    <td>{provider.credited}</td>
                                                    <td>{provider.pending}</td>
                                                    <td>{provider.joining}</td>
                                                    <td>{provider.userData[0].phone}</td>
                                                    <td>{provider.userData[0].email}</td>
                                                    <td>{provider.userData[0].gender}</td>
                                                    <td>{provider.areasOfSpecialization.map((type, index) => (<>{type} - </>))}</td>
                                                    <td>{provider.yearsOfExperience}</td>
                                                    <td>{provider.acceptedOrders}</td>
                                                    <td>{provider.rejectedOrders}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" data-toggle="modal" data-target="#scrollingModalDemo2" onClick={() => handleModalData(provider)}>View</button>
                                                        <button className="btn btn-sm btn-warning">Edit</button>
                                                        <button className="btn btn-sm btn-danger">Delete</button>
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

            {/* {modalVisible && (
                <div className="modal show" style={{ display: 'block' }} role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Service Provider Details</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Full Name:</strong> {selectedProvider.fullname}</p>
                                <p><strong>Email:</strong> {selectedProvider.email}</p>
                                <p><strong>Contact:</strong> {selectedProvider.contact}</p>
                                <p><strong>Speciality:</strong> {selectedProvider.speciality}</p>
                                <p><strong>Experience:</strong> {selectedProvider.experience} years</p>
                                <p><strong>Joining Date:</strong> {selectedProvider.joining}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
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

export default ApprovedProviders;
