import React, { useEffect, useState } from 'react'
import "./services.css"
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { createOffers, deleteOffers, getOffers, updateOffers } from '../../features/siteSettingsSlicer';
import Swal from 'sweetalert2';




export default function Offers() {

    const offersStateData = useSelector((state) => state.siteSettings.offers);
    const [offers, setOffers] = useState({ _id: null, voucherCode: "", title: "", discountType: "",amount:0 });
    const loading=useSelector((state)=>state.siteSettings.loading); 

    const [trigger, setTrigger] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOffers()).then((result) => {
            if(!result.error){
                setOfferData(result.payload);
            }
        });
        setTrigger(false);
    }, [trigger, dispatch]);


    const onChange = (element) => {
        setOffers({ ...offers, [element.target.name]: element.target.value });
    }

    const [offerData, setOfferData] = useState(offersStateData ? offersStateData:[]);


    const columns = [
        { name: 'Voucher Code', selector: row => row.voucherCode, sortable: true, },
        { name: 'Title', selector: row => row.title, sortable: true, },
        { name: 'Discount Type', selector: row => row.discountType, sortable: true, },
        { name: 'Amount', selector: row => row.amount, sortable: true, style: { padding: 0, margin: 0 } },
        {
            name: 'Actions',
            cell: row => (
                <div style={{ width: '165px', overflow: 'auto' }}>
                    <button className="btn btn-sm btn-primary" onClick={() => { showSelectedOffer(row._id) }}  >Edit</button>
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

    const filteredData = offerData?.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleOfferSubmit = (e) => {
        e.preventDefault();
        dispatch(createOffers(offers)).then((result) => {
            setOfferData(result.payload.offers);
            setTrigger(true);
        });
    }

    const handleDelete = async (id) => {
        const swalResult = await Swal.fire({
            title: 'Delete Confirmation',
            text: 'Are you sure you want to Delete this Offer?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete'
        });

        if (swalResult.isConfirmed) {
            dispatch(deleteOffers(id)).then((result) => {
                setOfferData(result.payload.offers);
                setTrigger(true);
            });
        } else {
            return;
        }

    }


    const showSelectedOffer = (id) => {
        const foundOffer= offersStateData.find(item => item._id === id);
        setOffers(foundOffer);
    }


    const updateOffer = () => {
        dispatch(updateOffers(offers)).then((result) => {
            setOfferData(result.payload.offers);
            setTrigger(true);
        });
    }

    return (
        <div className="container-fluid">
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
                                Offers for Site
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleOfferSubmit}>
                                    <div className="mb-3">
                                        <label>Voucher Code</label>
                                        <div className="input-group is-invalid">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                    <i className="material-icons f-16">local_offer</i>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control border-left-0" required name='voucherCode' value={offers.voucherCode} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Title</label>
                                        <div className="input-group is-invalid">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                    <i className="material-icons f-16">chat</i>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control border-left-0" required name='title' value={offers.title} onChange={onChange} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Discount Type</label>
                                        <div className="input-group is-invalid">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                    <i className="material-icons f-16">assistant</i>
                                                </span>
                                            </div>
                                            <select className="form-control border-left-0" name='discountType' value={offers.discountType} onChange={onChange} >
                                                <option value={""}>Choose One</option>
                                                <option value={"Percentage"}>Percentage</option>
                                                <option value={"Fixed"}>Fixed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label>Amount</label>
                                        <div className="input-group is-invalid">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-white" id="validatedInputGroupPrepend">
                                                    <i className="material-icons f-16">attach_money</i>
                                                </span>
                                            </div>
                                            <input type="number" className="form-control border-left-0" aria-describedby="validatedInputGroupPrepend" required name='amount' value={offers.amount} onChange={onChange} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <a disabled={offers._id ? false : true} className="btn btn-secondary mx-2" onClick={updateOffer}>
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
