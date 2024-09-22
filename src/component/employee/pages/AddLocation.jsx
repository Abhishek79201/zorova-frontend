import React, { useEffect, useState } from 'react'
import "./services.css"
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { createLocations, deleteLocations, getLocations, updateLocations } from '../../features/siteSettingsSlicer';
import Swal from 'sweetalert2';



export default function AddLocations() {

    const locationsStateData = useSelector((state) => state.siteSettings.locations);
    const [locations, setLocations] = useState({ _id: null, state: "", city: "", area: "" });
    const loading=useSelector((state)=>state.siteSettings.loading); 


    const [trigger, setTrigger] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations()).then((result) => {
            if(!result.error){
                setLocationData(result.payload);
            }
        });
        setTrigger(false);
    }, [trigger]);


    const onChange = (element) => {
        setLocations({ ...locations, [element.target.name]: element.target.value });
    }

    const [locationData, setLocationData] = useState(locationsStateData ? locationsStateData:[]);

    const columns = [
        { name: 'State', selector: row => row.state, sortable: true, },
        { name: 'City', selector: row => row.city, sortable: true, },
        { name: 'Area', selector: row => row.area, sortable: true, },
        {
            name: 'Actions',
            cell: row => (
                <div style={{ width: '165px', overflow: 'auto' }}>
                    <button className="btn btn-sm btn-primary" onClick={() => { showSelectedLocation(row._id) }} >Edit</button>
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

    const filteredData = locationData.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleLocationSubmit = (e) => {
        e.preventDefault();
        dispatch(createLocations(locations)).then((result) => {
            setLocationData(result.payload.locations);
            setTrigger(true);
        });
    }

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: 'Delete Confirmation',
            text: 'Are you sure you want to Delete this Location?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        });

        if (swalResult.isConfirmed) {
            dispatch(deleteLocations(id)).then((result) => {
                setLocationData(result.payload.locations);
                setTrigger(true);
            });
        } else {
            return;
        }

    }


    const showSelectedLocation = (id) => {
        const foundLocation = locationsStateData.find(item => item._id === id);
        setLocations(foundLocation);
    }


    const updateLocation = () => {
        dispatch(updateLocations(locations)).then((result) => {
            setLocationData(result.payload.locations);
            setTrigger(true);
        });
    }

    return (
        <div className="container-fluid">
            <div className="main-content container">
                <div className="page-header">
                    <div>
                        <span className="h2">Add Location</span>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="card shadow">
                            <div className="card-header bg-white">
                                Location
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleLocationSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="country-state">State</label>
                                        <div className="input-group is-invalid">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white">
                                                    <i className="material-icons f-16">location_searching</i>
                                                </span>
                                            </div>
                                            <select className="form-control border-left-0" id="country-state" required name='state' value={locations.state} onChange={onChange} > 
                                                <option value="">Select state</option>
                                                <option value="AN">Andaman and Nicobar Islands</option>
                                                <option value="AP">Andhra Pradesh</option>
                                                <option value="AR">Arunachal Pradesh</option>
                                                <option value="AS">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="CH">Chandigarh</option>
                                                <option value="CT">Chhattisgarh</option>
                                                <option value="DN">Dadra and Nagar Haveli</option>
                                                <option value="DD">Daman and Diu</option>
                                                <option value="DL">Delhi</option>
                                                <option value="GA">Goa</option>
                                                <option value="GJ">Gujarat</option>
                                                <option value="HR">Haryana</option>
                                                <option value="HP">Himachal Pradesh</option>
                                                <option value="JK">Jammu and Kashmir</option>
                                                <option value="JH">Jharkhand</option>
                                                <option value="KA">Karnataka</option>
                                                <option value="KL">Kerala</option>
                                                <option value="LA">Ladakh</option>
                                                <option value="LD">Lakshadweep</option>
                                                <option value="MP">Madhya Pradesh</option>
                                                <option value="MH">Maharashtra</option>
                                                <option value="MN">Manipur</option>
                                                <option value="ML">Meghalaya</option>
                                                <option value="MZ">Mizoram</option>
                                                <option value="NL">Nagaland</option>
                                                <option value="OR">Odisha</option>
                                                <option value="PY">Puducherry</option>
                                                <option value="PB">Punjab</option>
                                                <option value="RJ">Rajasthan</option>
                                                <option value="SK">Sikkim</option>
                                                <option value="TN">Tamil Nadu</option>
                                                <option value="TG">Telangana</option>
                                                <option value="TR">Tripura</option>
                                                <option value="UP">Uttar Pradesh</option>
                                                <option value="UT">Uttarakhand</option>
                                                <option value="WB">West Bengal</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="city">City</label>
                                        <div className="input-group is-invalid">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white">
                                                    <i className="material-icons f-16">location_city</i>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control border-left-0" id="city" name='city' required onChange={onChange} value={locations.city} />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="area">Area</label>
                                        <div className="input-group is-invalid">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white">
                                                    <i className="material-icons f-16">location_on</i>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control border-left-0" id="area" name='area' required onChange={onChange} value={locations.area} />
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <a disabled={locations._id ? false : true} className="btn btn-secondary mx-2" onClick={updateLocation}>
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
                                    <div className="input-group mb-3 w-25" style={{ float: 'right' }}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search"
                                            aria-label="Search"
                                            aria-describedby="searchButton"
                                            value={searchText}
                                            onChange={handleSearch}
                                        />
                                        <button className="btn btn-danger" type="button" id="searchButton" onClick={handleResetSearch}>X</button>
                                    </div>
                                    {loading ? "laoding...":
                                    <DataTable
                                        columns={columns}
                                        data={filteredData}
                                        pagination
                                        striped
                                        highlightOnHover
                                    />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
