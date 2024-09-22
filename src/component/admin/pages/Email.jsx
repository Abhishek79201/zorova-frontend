import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getUserDataForMail, sendMail } from '../../features/adminSlicer';
import loadingGif from '../../../loading1.gif';

const EmailForm = ({ label, icon, role }) => {

  const dispatch = useDispatch();
  const usersStateData = useSelector(state => state.user.Users);
  const [users, setUsers]=useState(usersStateData ? usersStateData : []);
  const [inputText, setInputText] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');


  useEffect(() => {
    dispatch(getUserDataForMail()).then((result)=>{
      if(!result.error){
        setUsers(result.payload);
      }
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    dispatch(sendMail({ text:inputText, subject, email:email.value }));
  };

  return (
    <div className="card shadow">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>{label}</label>
            <div className="input-group is-invalid d-flex">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  <i className="material-icons f-16">{icon}</i>
                </span>
              </div>
              {/* <input
                placeholder="start typing to search..."
                type="text"
                className="form-control"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                required
              /> */}
              <Select
                options={
                  users.filter(user => user.role.toLowerCase() === role).map(user => (
                    { value: user.email, label: user.fullName }
                  ))
                }                
                name="options"
                placeholder="start typing to search..."
                onChange={e => setEmail(e)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Subject</label>
            <input
              type="text"
              className="form-control"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Text</label>
            <textarea
              className="form-control"
              rows="3"
              style={{ height: '107px' }}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary"> Send</button>
        </form>
      </div>
    </div>
  );
};

const EmailToContacts = () => {
  const loading=useSelector(state=>state.admin.loading);

  return (
    <div className="main-content container">
      <div className="page-header">
        <div>
          <span className="h2">{loading ? "loading...": "Email To Clients, Providers, Employees"}</span>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-4">
          <EmailForm label="Select Client" icon="person" role="user" />
        </div>
        <div className="col-12 col-sm-12 col-md-4">
          <EmailForm label="Select Providers" icon="person" role="provider" />
        </div>
        <div className="col-12 col-sm-12 col-md-4">
          <EmailForm label="Select Employee" icon="person" role="employee" />
        </div>
      </div>
    </div>
  );
};

export default EmailToContacts;
