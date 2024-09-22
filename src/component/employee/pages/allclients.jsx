import React,{ useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import "./Datatables.css"
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../features/employeeSlicer';
import moment from 'moment';

export default function Allclients() {

    const dispatch=useDispatch();
    const clientStateData=useSelector((state)=>state.employee.clients);
    const [clientData,setClientData]=useState(clientStateData || []);
    const loading=useSelector((state)=>state.employee.loading);
    
    useEffect(()=>{
      dispatch(getClients()).then((result)=>{
        if(!result.error){
          setClientData(result.payload);
        }
      });
    },[])

    const columns = [
      { name: 'Sr #', selector: (row, index) => <div className="tableSrCell">{(index + 1).toString()}</div>, sortable: true },
      { name: 'Id', selector: row => "FLX-" + row._id.slice(-5).toUpperCase(), sortable: true,  style: { padding: 0, margin: 0 }},
        { name: 'Client Name', selector: row => row.fullName, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Email', selector: row => row.email, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Gender', selector: row => row.gender, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'City', selector: row => row.city, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'State', selector: row => row.state, sortable: true, style: { padding: 0, margin: 0 } },
        { name: 'Address', selector: row => row.addressLine1, sortable: true, style: { padding: 0, margin: 0 } },
        {
          name: 'Actions',
          cell: row => (
            <div className="row m-1" >
              <button
                className="btn btn-info btn-sm"
                data-bs-toggle="modal"
                data-bs-target={`#exampleModalLg-${row._id}`}
              >
                <i className="bi bi-eye" />
                View Detail
              </button>
              {/* Modal Detail */}
              <div
                className="modal fade"
                id={`exampleModalLg-${row._id}`}
                tabIndex={-1}
                aria-labelledby="exampleModalLgLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title h3"
                        id="exampleModalLgLabel"
                      >
                        Client Detail{" "}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="table-responsive">
                          <table className="table table-striped ">
                            <tbody>
                            {Object.entries(
                                  {
                                    "Order #": "FLX-" + row._id.slice(-5).toUpperCase(),
                                    "Full Name": `${row.fullName}`,
                                    "Email": `${row.email}`,
                                    "Date Of Birth": `${moment(row.dob).format("YYYY-MM-DD")}`,
                                    "Gender": `${row.gender}`,
                                    "Phone": `${row.phone}`,
                                    "City": `${row.city}`,
                                    "State": `${row.state}`,
                                    "Address Line 1": `${row.addressLine1}`,
                                    "Address Line 2": `${row.addressLine2}`,
                                    "Zip Code": `${row.zipCode}`,
                                    "Medical Condition": `${row.medicalCondition==true ? row.medicalConditionYesDetail: "No"} `,
                                    "Medication": `${row.medication==true ? row.medicationYesDetail : "No"}`,
                                    "Fitness Goal": `${row.fitnessWeightLossGoalDesc}`,
                                  }
                                ).map(
                                  ([label, value]) => (
                                    <tr key={label}>
                                      <td className="h6">{label}</td>
                                      <td>{value}</td>
                                    </tr>
                                  )
                                )}    
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
  
    const filteredData = clientData?.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    );
    return (
        <div className="container-fluid">
          <div className="col-12">
            <div className="card mb-3">
              <div className="card-header">
                <h4 className="card-title">All Clients</h4>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div className="border-dark rounded-3 ">
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
                      {loading ? "Loading...":
                      <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        paginationTotalRows={filteredData?.length}
    
    
                      />
                      }
                    </div>
    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
