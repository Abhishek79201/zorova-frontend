import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { createServicePricing, deleteServicePricing, getLocations, getServicePricing, updateServicePricing } from '../../features/siteSettingsSlicer';
import Swal from 'sweetalert2';
import loadingGif from '../../../loading1.gif';
import DataTables from 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css';



const ServicesPricing = () => {

    const pricesStateData = useSelector((state) => state.siteSettings.prices);
    const locationsStateData = useSelector((state) => state.siteSettings.locations);
    const states = locationsStateData.map(item => item.state);
    const uniqueStatesArray = Array.from(new Set(states));
    const loading = useSelector((state) => state.siteSettings.loading);

    const [trigger, setTrigger] = useState(false);
    const [prices, setPrices] = useState({ _id: null, category: "", subCategory: "", price: 0,state:"", city: "", serviceName: "", duration: 45, discount: 0, transportation: 0, GST: 0, otherExpense: 0 });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLocations());
        dispatch(getServicePricing()).then((result) => {
            if (!result.error) {
                setFranchiseData(result.payload);
            }
        });
        setTrigger(false);
    }, [trigger]);

    useEffect(()=>{
        new DataTables('#data-table', {
       });
   },[]);

    const onChange = (element) => {
        setPrices({ ...prices, [element.target.name]: element.target.value });
    }

    const [franchiseData, setFranchiseData] = useState(pricesStateData ? pricesStateData : []);

    const columns = [
        { name: 'Service Name', selector: row => row.serviceName, sortable: true, },
        { name: 'Area', selector: row => row.city, sortable: true, },
        { name: 'Category', selector: row => row.category, sortable: true, },
        { name: 'Duration', selector: row => row.duration, sortable: true, },
        { name: 'Price', selector: row => row.price, sortable: true, style: { padding: 0, margin: 0 } },
        {
            name: 'Actions',
            cell: row => (
                <div style={{ width: '165px', overflow: 'auto' }}>
                    <button className="btn btn-sm btn-primary" onClick={() => { showSelectedService(row._id) }} >Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => { handleDelete(row._id) }}>Delete</button>
                </div>
            ),
        },
    ];

    const handlePriceSubmit = (e) => {
        e.preventDefault();
        dispatch(createServicePricing(prices)).then((result) => {
            setFranchiseData(result.payload.prices);
            setTrigger(true);
        });
    }

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: 'Delete Confirmation',
            text: 'Are you sure you want to Delete this Service?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        });

        if (swalResult.isConfirmed) {
            dispatch(deleteServicePricing(id)).then((result) => {
                setFranchiseData(result.payload.prices);
                setTrigger(true);
            });
        } else {
            return;
        }

    }

    const showSelectedService = (id) => {
        const foundPrice = pricesStateData.find(price => price._id === id);
        setPrices(foundPrice);
    }

    const updateService = () => {
        dispatch(updateServicePricing(prices)).then((result) => {
            setFranchiseData(result.payload.prices);
            setTrigger(true);
        });
    }

    const [searchText, setSearchText] = useState('');
    const handleSearch = e => {
        setSearchText(e.target.value.toLowerCase());

    };

    const handleResetSearch = () => {
        setSearchText('');
    };

    const filteredData = franchiseData?.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );


    return (
        <div className="main-content container">
            <div className="page-header">
                <div>
                    <span className="h2">Services and Pricing</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-4">
                    <div className="card shadow">
                        <div className="card-header bg-white">
                            Service and Pricing
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePriceSubmit}>
                                <div className="mb-3">
                                    <label>Service Category</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">layers</i>
                                            </span>
                                        </div>
                                        <select className="form-control border-left-0" name='category' value={prices.category} onChange={onChange}>
                                            <option value={""}>Choose Category</option>
                                            <option value={"Massage"}>Massage</option>
                                            <option value={"Stretch"}>Stretch</option>
                                            <option value={"Fitness & Weight Loss"}>Fitness &amp; Weight Loss</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Service Sub Category</label>

                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">layers</i>
                                            </span>
                                        </div>
                                        {prices.category == "Massage" ?
                                            <select className="form-control border-left-0" name='subCategory' value={prices.subCategory} onChange={onChange} >
                                                <option value={""}>Choose Sub Category</option>
                                                <option value={"Chair Massage"}>Chair Massage</option>
                                                <option value={"Natural Massage"}>Natural Massage</option>
                                                <option value={"Medical Massage"}>Medical Massage</option>
                                                <option value={"Deep Massage"}>Deep Massage</option>
                                            </select>
                                            : prices.category == "Stretch" ?
                                                <select className="form-control border-left-0" name='subCategory' value={prices.subCategory} onChange={onChange} >
                                                    <option value={""}>Choose Sub Category</option>
                                                    <option value={"Light Stretching"}>Light Stretching</option>
                                                    <option value={"Deep Stretching"}>Deep Stretching</option>
                                                </select> : <select className="form-control border-left-0" name='subCategory' value={prices.subCategory} onChange={onChange} >
                                                    <option value={null}>No Sub Category</option>
                                                </select>
                                        }

                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Service State</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">location_on</i>
                                            </span>
                                        </div>
                                        <select className="form-control border-left-0" name='state' value={prices.state} onChange={onChange}>
                                            <option value={""}>Choose State</option>
                                            {uniqueStatesArray.map((item, index) => (
                                                <option key={index} value={item}>{item}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Service City</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">location_on</i>
                                            </span>
                                        </div>
                                        <select className="form-control border-left-0" name='city' value={prices.city} onChange={onChange}>
                                            <option value={""}>Choose City</option>
                                            {locationsStateData.filter(item=>item.state==prices.state).map((item, index) => (
                                                <option key={index} value={item.city}>{item.city}</option>
                                            ))}

                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Service Name</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">chat</i>
                                            </span>
                                        </div>
                                        <input type="text" className="form-control border-left-0" required name='serviceName' value={prices.serviceName} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Duration (In Minutes)</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">access_time</i>
                                            </span>
                                        </div>
                                        <input type="number" className="form-control border-left-0" required name='duration' value={prices.duration} onChange={onChange} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Price</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">attach_money</i>
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control border-left-0"
                                            aria-describedby="validatedInputGroupPrepend"
                                            required
                                            name='price'
                                            value={prices.price}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label>Transportation</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">attach_money</i>
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control border-left-0"
                                            aria-describedby="validatedInputGroupPrepend"
                                            required
                                            name='transportation'
                                            value={prices.transportation}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>GST</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">attach_money</i>
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control border-left-0"
                                            aria-describedby="validatedInputGroupPrepend"
                                            required
                                            name='GST'
                                            value={prices.GST}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label>Other Total Exp.</label>
                                    <div className="input-group is-invalid">
                                        <div className="input-group-prepend">
                                            <span
                                                className="input-group-text bg-white"
                                                id="validatedInputGroupPrepend"
                                            >
                                                <i className="material-icons f-16">attach_money</i>
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            className="form-control border-left-0"
                                            aria-describedby="validatedInputGroupPrepend"
                                            required
                                            name='otherExpense'
                                            value={prices.otherExpense}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                                <a disabled={prices._id ? false : true} className="btn btn-secondary mx-2" onClick={updateService}>
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
                                            <th>Service Name</th>
                                            <th>Area</th>
                                            <th>Category</th>
                                            <th>Duration</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {loading ?
                                        <img src={loadingGif} alt="loading" style={{ width: '50px', height: '50px', marginRight: '8px' }} />
                                        :
                                        <tbody>
                                            {franchiseData?.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{data.serviceName}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.subCategory}</td>
                                                    <td>{data.duration}</td>
                                                    <td>{data.price}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-primary" onClick={() => { showSelectedService(data._id) }} >Edit</button>
                                                        <button className="btn btn-sm btn-danger" onClick={() => { handleDelete(data._id) }}>Delete</button>
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

export default ServicesPricing;
