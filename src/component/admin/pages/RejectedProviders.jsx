import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProviders } from '../../features/providerSlicer';
import loadingGif from '../../../loading1.gif';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTables from 'datatables.net';

const RejectedProviders = () => {
    const stateProviders=useSelector(state=>state.provider.provider);
    const loading =useSelector(state=>state.provider.laoding);
    const [providers, setProviders] = useState(stateProviders?.filter(provider => provider.status?.toLowerCase() === "rejected") || []);
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getAllProviders()).then((result)=>{
            if(!result.error){
                setProviders(result.payload?.filter(provider => provider.status?.toLowerCase() === "rejected"));
            }
        });
    },[]);

    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Approved Service Provider</span>
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
                                            <th>Sr #</th>
                                            <th>Full Name</th>
                                            <th>Contact</th>
                                            <th>Email</th>
                                            <th>Gender</th>
                                            <th>Speciality</th>
                                            <th>Year of Experience</th>
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
                                                <td>{provider.userData[0].phone}</td>
                                                <td>{provider.userData[0].email}</td>
                                                <td>{provider.userData[0].gender}</td>
                                                <td>{provider.areasOfSpecialization.map((type,index)=>(<>{type} - </>))}</td>
                                                <td>{provider.yearsOfExperience}</td>
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

export default RejectedProviders;
