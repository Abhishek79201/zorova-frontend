import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getLocations, getPackages } from "../../features/siteSettingsSlicer";
import Swal from "sweetalert2";
import moment from "moment";



function TestMember() {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);
    const packageStateData = useSelector((state) => state.siteSettings.packages);
    const uniqueStates = [...new Set(packageStateData?.map(item => item.city))];
    const [membership, setMembership] = useState({});
    console.log(membership);

    useEffect(() => {
        dispatch(getPackages());
        dispatch(getLocations());
    }, [])

    const Form = () => {
        if (step == 0) {
            return <Packages />;
        } else if (step == 1) {
            return <Contact />;
        } else if (step == 2) {
            return <FamilyInfo />
        } else if (step == 3) {
            return <Location />;
        }
        else if (step == 4) {
            return <Summary />;
        }
    };

    function Packages() {
        // return (
        //     <div className="form_body">
        //         <div className="pt-3">
        //             <div class="mem_form">
        //                 <h2 className="text-center">Select Membership Package</h2>
        //                 <p className="text-center">
        //                     Pricing for membership subscription in _________
        //                 </p>
        //                 <div class="container py-5">
        //                     <div class="row">
        //                         <form>
        //                             <div class="row">
        //                                 <div class="row">
        //                                     <div class="col-sm-6 my-2">
        //                                         <div class="price_mem">
        //                                             <div class="fit_pro">
        //                                                 <div class="">
        //                                                     <h6>Monthly Membership</h6>
        //                                                     <p>(Individual)</p>
        //                                                 </div>
        //                                                 <input
        //                                                     type="radio"
        //                                                     id="Fitness"
        //                                                     name="fav_language"
        //                                                     value=""
        //                                                 />
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div class="col-sm-6 my-2">
        //                                         <div class="fit_pro">
        //                                             <div class="">
        //                                                 <h6>Monthly Membership</h6>
        //                                                 <p>(Family)</p>
        //                                             </div>
        //                                             <input
        //                                                 type="radio"
        //                                                 id="Weightloss"
        //                                                 name="fav_language"
        //                                                 value=""
        //                                             />
        //                                         </div>
        //                                     </div>
        //                                     <div class="col-sm-6 my-2">
        //                                         <div class="price_mem">
        //                                             <div class="fit_pro">
        //                                                 <div class="">
        //                                                     <h6>Quarterly Membership </h6>
        //                                                     <p>(Individual)</p>
        //                                                 </div>
        //                                                 <input
        //                                                     type="radio"
        //                                                     id="Fitness"
        //                                                     name="fav_language"
        //                                                     value=""
        //                                                 />
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div class="col-sm-6 my-2">
        //                                         <div class="fit_pro">
        //                                             <div class="">
        //                                                 <h6>Quarterly Membership </h6>
        //                                                 <p>(Family)</p>
        //                                             </div>
        //                                             <input
        //                                                 type="radio"
        //                                                 id="Weightloss"
        //                                                 name="fav_language"
        //                                                 value=""
        //                                             />
        //                                         </div>
        //                                     </div>
        //                                 </div>


        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="footer_form">
        //                 <button
        //                     type="button"
        //                     onClick={() => setStep(step + 1)}
        //                 >
        //                     Next
        //                 </button>
        //             </div>
        //         </div>
        //     </div>
        // );
        const [showIndividual, setShowIndividual] = useState( membership.packageFor=="Individual" ? true : false);
        const [city, setCity] = useState( membership.city || "Seohar");
        const [membershipType, setMembershipType] = useState();
        const [cost, setCost] = useState();

        return (
            <div className="form_body">
                <div className="pt-3">
                    <div className="mem_form">
                        <h2 className="text-center">Select Membership Package</h2>
                        <div className="text-center d-flex justify-content-between">
                            <p>
                                Choose Location
                            </p>

                            <select
                                placeholder="Choose Location"
                                required
                                name="city"
                                className="w-50 mx-2"
                                value={city} onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="" selected disabled hidden>Choose Location</option>
                                {uniqueStates.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                                {/* <option value={"bihar"}>Bihar</option> */}
                            </select>
                        </div>
                        <div className="container ">
                            <div className="row py-3">
                                <form>
                                    <div className="row">
                                        <div className="col-sm-12 text-center mb-3 pb-3">
                                            <div className="btn-group border border-dark">
                                                <button
                                                    type="button"
                                                    className={`btn ${showIndividual ? 'btn-success' : ''}  mr-2`}
                                                    onClick={() => setShowIndividual(true)}
                                                >
                                                    Individual
                                                </button>
                                                <button
                                                    type="button"
                                                    className={`btn ${showIndividual ? '' : 'btn-success'} `}
                                                    onClick={() => setShowIndividual(false)}
                                                >
                                                    Family
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pricing6 py-2">
                                            <div className="container">
                                                {/* row */}
                                                <div className="row mt-4">
                                                    {/* column */}
                                                    {showIndividual ? packageStateData.filter((item) => item.city == city && item.packageFor == "Individual").map((item, index) => (
                                                        <div className="col-md-6" key={index} >
                                                            <div className="card card-shadow border-0 mb-4">
                                                                <div className="card-body p-4">
                                                                    <div className="d-flex align-items-center">
                                                                        <h5 className="font-weight-medium mb-0">{item.packageName}</h5>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-5 text-center">
                                                                            <div className="price-box my-3">
                                                                                <sup>₹</sup><span className="text-dark display-5">{item.price}</span>
                                                                                <a className={`${membership.membershipType && membership.packageFor && membership.membershipType==item.packageName && membership.packageFor == item.packageFor ? "bg-success": "bg-purple"} btn font-14 border-0 text-white p-3 btn-block mt-3 `}
                                                                                    onClick={() => {

                                                                                        setMembership({ ...membership, ...{ city: city, cost: item.price, membershipType: item.packageName, packageFor: item.packageFor } });
                                                                                        setStep(step + 1);
                                                                                    }
                                                                                    }
                                                                                >CHOOSE PLAN </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-7 align-self-center">
                                                                            <ul className="list-inline pl-3 font-14 font-weight-medium text-dark">
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.packageName}</span></li>
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.packageFor}</span></li>
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.city}</span></li>
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.price}</span></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )) : !showIndividual ? packageStateData.filter((item) => item.city == city && item.packageFor == "Family").map((item, index) => ((
                                                        <div className="col-md-6 " key={index}>
                                                            <div className="card card-shadow border-0 mb-4">
                                                                <div className="card-body p-4">
                                                                    <div className="d-flex align-items-center">
                                                                        <h5 className="font-weight-medium mb-0">{item.packageName}</h5>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-lg-5 text-center">
                                                                            <div className="price-box my-3">
                                                                                <sup>₹</sup><span className="text-dark display-5">{item.price}</span>
                                                                                <a className={`${membership.membershipType && membership.packageFor && membership.membershipType==item.packageName && membership.packageFor == item.packageFor ? "bg-success": "bg-purple"} btn font-14 border-0 text-white p-3 btn-block mt-3 `}
                                                                                    onClick={() => {

                                                                                        setMembership({ ...membership, ...{ city: city, cost: item.price, membershipType: item.packageName, packageFor: item.packageFor } });
                                                                                        setStep(step + 1);
                                                                                    }
                                                                                    }
                                                                                >CHOOSE PLAN </a>                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-7 align-self-center">
                                                                            <ul className="list-inline pl-3 font-14 font-weight-medium text-dark">
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.packageName}</span></li>
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.packageFor}</span></li>
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.city}</span></li>
                                                                                <li className="py-2"><i className="icon-check text-info mr-2"></i> <span>{item.price}</span></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <div className="footer_form">
                        <button type="button" onClick={() => setStep(step + 1)}>
                            Next
                        </button>
                    </div> */}
                </div>
            </div>
        );
    }

    const Contact = () => {
        const [emptyFields, setEmptyFields] = useState([]);
        const loggedInUser = useSelector((state) => state.user.data)
        const [massage, setMassage] = useState({ fullName: membership?.fullName || loggedInUser?.fullName, email: membership?.email || loggedInUser?.email, gender: membership?.gender || loggedInUser?.gender || "", dob: moment(membership?.dob).format("YYYY-MM-DD") || moment(loggedInUser?.dob).format("YYYY-MM-DD") || null, addressLine1: membership?.addressLine1 || loggedInUser?.addressLine1, phone: membership?.phone || loggedInUser?.phone, addressLine2: membership?.addressLine2 || loggedInUser?.addressLine2, zipCode: membership?.zipCode || "", country: membership?.country || "India" || "" });

        const onChange = (element) => {
            setMassage({ ...massage, [element.target.name]: element.target.value });
        }


        return (
            <>
                <div className="form_body">
                    <div className="header_form pt-3">
                        <h4>Personal Details</h4>
                    </div>
                    <form className="form_data"  >
                        <div className="container">
                            <div class="row py-5">
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={massage.fullName} name="fullName" onChange={onChange} style={{ borderColor: emptyFields.includes("fullName") ? "red" : "" }} type="text" placeholder="Full Name*" required />
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={massage.email} name="email" onChange={onChange} style={{ borderColor: emptyFields.includes("email") ? "red" : "" }} type="email" placeholder="Email*" required />
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={moment(massage.dob).format("YYYY-MM-DD")} name="dob" onChange={onChange} style={{ borderColor: emptyFields.includes("dob") ? "red" : "" }} type="date" placeholder="Date of Birth*" required />
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <select
                                        value={massage.gender} name="gender" onChange={onChange} placeholder="Gender*" required
                                        style={{ borderColor: emptyFields.includes("gender") ? "red" : "" }}
                                    >
                                        <option value="male">male</option>
                                        <option value="female">female</option>
                                    </select>
                                    {/* <input value={massage.gender} name="gender" onChange={onChange} type="gender" placeholder="Gender*" required /> */}
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={massage.phone} onChange={onChange} style={{ borderColor: emptyFields.includes("phone") ? "red" : "" }} type="text" name="phone" placeholder="Mobile # *" required />
                                </p>

                                <p class="col-lg-6 col-md-12 col-sm-12">
                                    <input value={massage.addressLine1} onChange={onChange} style={{ borderColor: emptyFields.includes("addressLine1") ? "red" : "" }} type="text" name="addressLine1" placeholder="Address line 1*" required />
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={massage.addressLine2} onChange={onChange} type="text" name="addressLine2" placeholder="Address line 2*" required />
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={membership.city} name="city" type="text" placeholder="City*" />
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={massage.zipCode} onChange={onChange} style={{ borderColor: emptyFields.includes("zipCode") ? "red" : "" }} name="zipCode" type="text" placeholder="Zip/Postal Code*" required />
                                </p>
                                <p class="col-lg-6 col-md-6 col-sm-12">
                                    <input value={"India"} onChange={onChange} disabled={true} name="country" type="text" placeholder="Country*" />
                                </p>

                            </div>
                        </div>
                    </form>
                </div>
                <div className="footer_form">
                    <button
                        onClick={() => {
                            setStep(step - 1);
                        }}
                    >
                        Previous -{membership.packageFor}
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            const requiredFields = ["country", "phone", "gender", "fullName", "email", "dob", "addressLine1", "zipCode"];
                            const empty = requiredFields.filter(field => !massage[field]);
                            setEmptyFields(empty);

                            if (empty.length === 0) {
                                setMembership({ ...membership, ...massage });
                                if (membership.packageFor == "Family") {
                                    setStep(step + 1);
                                } else {
                                    setStep(step + 2);
                                }
                                // setStep(step + 1);
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'error',
                                    text: 'Please fill all required fields!'
                                });
                            }

                        }}
                    >
                        Next
                    </button>
                </div>
            </>
        );
    };

    function FamilyInfo() {
        const [familyMembers, setFamilyMembers] = useState( membership.familyMembers || [
            { name: '', dob: '', gender: '' }
        ]);

        const addFamilyMemberField = () => {
            setFamilyMembers([...familyMembers, { name: '', dob: '', gender: '' }]);
        };

        const handleInputChange = (index, field, value) => {
            const updatedMembers = [...familyMembers];
            updatedMembers[index][field] = value;
            setFamilyMembers(updatedMembers);
        };

        return (
            <div className="form_body">
                <div className="pt-3">
                    <h2 className="text-center" style={{ color: "#3E1B7C" }}>
                        Additional Family Members <span className="app">(if applicable)</span>
                    </h2>
                    {familyMembers.map((member, index) => (
                        <div key={index} className="row py-3">
                            <p className="col-lg-6 col-md-6 col-sm-12">
                                <input
                                    type="text"
                                    placeholder={`${index + 1}st Person Full Name*`}
                                    value={member.name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    required
                                />
                            </p>
                            <p className="col-lg-6 col-md-6 col-sm-12">
                                <input
                                    type="date"
                                    value={member.dob ? moment(member.dob).format('YYYY-MM-DD') : ''}
                                    onChange={(e) => handleInputChange(index, 'dob', e.target.value)}
                                    required
                                />
                            </p>
                            <p className="col-lg-6 col-md-6 col-sm-12">
                                <input
                                    type="text"
                                    placeholder="Gender*"
                                    value={member.gender}
                                    onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                    required
                                />
                            </p>
                        </div>
                    ))}
                </div>
                <div className="text-center py-3" onClick={addFamilyMemberField}>
                    <span className="addfamily" style={{ cursor: "pointer" }}><i className="fa fa-plus"></i> Add Family Member</span>
                </div>

                <div className="footer_form">
                    <button type="button"
                        onClick={() => {
                            setStep(step - 1);
                        }}
                    >Previous</button>
                    <button type="button"
                        onClick={() => {
                            setMembership({ ...membership, ...{ familyMembers: familyMembers } })
                            setStep(step + 1);
                        }}
                    >Next</button>
                </div>
            </div>
        );
    }


    function Location() {
        const [units, setUnits] = useState(membership?.units || 1);
        return (
            <div className="form_body">
                <div className=" pt-3">
                    <h4 className="text-center" style={{ color: "#3E1B7C" }}>Specify Preferred Location</h4>
                    <p className="text-center">
                        Plan Pricing varied by location
                    </p>
                    <div class="row  py-5 px-5">
                        <div class="s_form py-3">
                            <div class="s_qus my-1 d-flex">
                                <div className="col-5">
                                    <label htmlFor="city">Location: </label>
                                    <input
                                        class="form-control m-1"
                                        type="text"
                                        name="city"
                                        value={membership.city}
                                        id="text1"
                                        disabled
                                        placeholder="City (optional)"
                                    />
                                </div>
                                <div className="col-5">
                                    <label htmlFor="units">Number of Units (optional): </label>
                                    <input
                                        class="form-control m-1"
                                        type="number"
                                        name="units"
                                        value={units}
                                        id="text1"
                                        onChange={(e)=>{
                                            if(e.target.value>0){
                                            setUnits(e.target.value)
                                        }}}
                                        placeholder="Number of Units (optional)"
                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="footer_form">
                        <button type="button" onClick={() => { if (membership.packageFor == "Family") { setStep(step - 1) } else { setStep(step - 2) } }} >
                            Previous
                        </button>
                        <button type="button" className="Creat_btn " onClick={() => {
                            setMembership({ ...membership, ...{ units: units } });
                            setStep(step + 1)
                        }}  >
                            Checkout
                            <img src="assets/image/arrow-right.png" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function Summary() {
        return (
            <div className="form_body">
                <div className="header_form py-3">
                    {/* <h4>Summary</h4> */}
                    {/* <span>{step_form}</span> */}
                </div>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Card >
                                <Card.Body >
                                    <Card.Title style={{ color: '#50289A' }}>Contact Information</Card.Title>
                                    <Card.Text>
                                        <strong>Name: {membership.fullName}</strong>
                                        <br />
                                        <strong>Address: {membership.addressLine1}</strong>
                                        <br />
                                        <strong>Phone: {membership.phone}</strong>
                                        <br />
                                        <strong>City: {membership.city}</strong>
                                        <br />
                                        <strong>Country: {membership.country}</strong>
                                        <br />
                                        <br />

                                        {/* Add more details as needed */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title style={{ color: '#50289A' }} >Order Summary</Card.Title>
                                    <Card.Text>
                                        <strong>Date: { moment(Date.now()).format("YYYY-MM-DD")}</strong>
                                        <br />
                                        <strong>City: {membership.city}</strong>
                                        <br />
                                        <strong>Total Units: {membership.units}</strong>
                                        <br />
                                        <strong>Membership Type: {membership.membershipType}</strong>
                                        <br />
                                        <strong>Price: {membership.cost}</strong>
                                        <br />
                                        <br />
                                        {/* <strong>
                        Cost: <span style={{ fontSize: '1em' }}>{selectedOptions.cost}</span>
                      </strong> */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <div className="footer_form mt-3">
                    <button type="button" onClick={() => setStep(step - 1)} >
                        Previous
                    </button>
                    <button type="button" className="Creat_btn " onClick={() => setStep(step + 1)}  >
                        Pay Now
                        <img src="assets/image/arrow-right.png" alt="" />
                    </button>
                </div>
            </div >
        );
    }

    return (
        <div className="container">
            <div class="form">
                <div className="card">
                    <div>{<Form />}</div>
                </div>
            </div>
        </div>
    );
}

export default TestMember;
