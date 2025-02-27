import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { createPackages, deletePackages, getLocations, getPackages, updatePackages } from '../../features/siteSettingsSlicer';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import loadingGif from '../../../loading1.gif';
import DataTables from 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';


const MembershipPackage = () => {

    const packagesStateData = useSelector((state) => state.siteSettings.packages);
    const locationsStateData = useSelector((state) => state.siteSettings.locations);
    const [packages, setPackages] = useState({ _id: null, packageName: "", packageFor: "", city: "", price: 0 });
    const loading = useSelector((state) => state.siteSettings.loading);
    const [trigger, setTrigger] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations());
        dispatch(getPackages()).then((result) => {
            if (!result.error) {
                setMembershipData(result.payload);
            }
        });
        setTrigger(false);
    }, [trigger]);

    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);


    const onChange = (element) => {
        setPackages({ ...packages, [element.target.name]: element.target.value });
    }

    const [membershipData, setMembershipData] = useState(packagesStateData ? packagesStateData : []);

    const columns = [
        { name: 'Name', selector: row => row.packageName, sortable: true, },
        { name: 'Package For', selector: row => row.packageFor, sortable: true, },
        { name: 'City', selector: row => row.city, sortable: true, },
        { name: 'Price', selector: row => row.price, sortable: true, style: { padding: 0, margin: 0 } },
        {
            name: 'Actions',
            cell: row => (
                <div style={{ width: '165px', overflow: 'auto' }}>
                    <button className="btn btn-sm btn-primary" onClick={() => { showSelectedPackage(row._id) }}  >Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => { handleDelete(row._id) }} >Delete</button>
                </div>
            ),
        },
    ];



    const [searchText, setSearchText] = useState('');
    const handleSearch = e => {
        setSearchText(e.target.value.toLowerCase());

    };

    const handleResetSearch = () => {
        setSearchText('');
    };

    const filteredData = membershipData.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handlePackageSubmit = (e) => {
        e.preventDefault();
        dispatch(createPackages(packages)).then((result) => {
            setMembershipData(result.payload.packages);
            setTrigger(true);
        });
    }

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: 'Delete Confirmation',
            text: 'Are you sure you want to Delete this Package?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        });

        if (swalResult.isConfirmed) {
            dispatch(deletePackages(id)).then((result) => {
                setMembershipData(result.payload.packages);
                setTrigger(true);
            });
        } else {
            return;
        }

    }


    const showSelectedPackage = (id) => {
        const foundPackage = packagesStateData.find(item => item._id === id);
        setPackages(foundPackage);
    }


    const updatePackage = () => {
        dispatch(updatePackages(packages)).then((result) => {
            setMembershipData(result.payload.packages);
            setTrigger(true);
        });
    }

    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Membership Package</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="card shadow">
                        <div className="card-header bg-white">
                            Membership Package Price
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePackageSubmit}>
                                <div className="mb-3">
                                    <label>Package Name</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                <i className="material-icons f-16">chat</i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control border-left-0" required name='packageName' value={packages.packageName} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>City</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                <i className="material-icons f-16">location_on</i>
                                            </span>
                                        </div>
                                        <select className="form-control border-left-0" name='city' value={packages.city} onChange={onChange}>
                                            <option value={""}>Choose City</option>
                                            {locationsStateData.map((item, index) => (
                                                <option key={index} value={item.city}>{item.city}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Package For</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                <i className="material-icons f-16">access_time</i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control border-left-0" required name='packageFor' value={packages.packageFor} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Price</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                <i className="material-icons f-16">attach_money</i>
                                            </span>
                                        </div>
                                        <input type="number" className="form-control border-left-0" aria-describedby="validatedInputGroupPrepend" required name='price' value={packages.price} onChange={onChange} />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                                <a disabled={packages._id ? false : true} className="btn btn-secondary mx-2" onClick={updatePackage}>
                                    Update
                                </a>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-8">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table id="data-table" className="table table-hover w-100">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Name</th>
                                            <th>Package for</th>
                                            <th>City</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {membershipData.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{data.packageName}</td>
                                                    <td>{data.packageFor}</td>
                                                    <td>{data.city}</td>
                                                    <td>{data.price}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" onClick={() => { showSelectedPackage(data._id) }}  >Edit</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => { handleDelete(data._id) }} >Delete</button>
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
    );
};

export default MembershipPackage;
