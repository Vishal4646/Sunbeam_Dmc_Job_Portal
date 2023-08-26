import axios from 'axios'
import React, { useState } from 'react'
import hirebest from '../images/hirebest.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { constants } from '../utils/constant';


export default function RecruiterRegister() 
{
  const data = {first_name : "", last_name : "", email : "", password : "", cpassword : "", contact_number : "", company_name : ""};    
  const [inputdata,setInputData] = useState(data)
  const history = useHistory()
  const [message,setMessage] = useState("")


  const handleData = (e) => {
      setInputData({...inputdata, [e.target.name]:e.target.value})
  }

    const onSubmit = (e) =>{
        e.preventDefault();
          if(inputdata.first_name === "" )
          {
                msg("First name cannot be empty");
          }else if(inputdata.last_name === "")
          {
                msg("Last name cannot be empty");
          }else if(inputdata.email === "")
          {
                msg("Email cannot be empty");
          }else if(inputdata.password === "")
          {
                msg("Password cannot be empty");
          }else if(inputdata.cpassword === "")
          {
                msg("Confirm password cannot be empty");
          }else if(inputdata.password !== inputdata.cpassword)
          {
                msg("Password should be match");
          }else if(inputdata.contact_number.length!==10 ||inputdata.contact_number ==="")
          {
                msg("Contact number should be 10 digit");
          }else if(inputdata.company_name === "")
          {
                msg("Company name cannot be empty");
          }else
          {
              axios.post(constants.serverUrl+'/recruiter/register',inputdata).then((res)=>{ 
                if(res.data.status === "success")
                {
                    msg("Registered Successfully..!!")
                    setTimeout(() => {
                    history.push("/recruiterlogin")
                    }, 2000);
                }else{
                    msg("Company Name should be unique")
                }
              })
          }
        }
           
    


    let msg = (msg) => {
      setMessage(msg);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    };

  
  return (
    <>

      {message === "" ? (
        <></>
      ) : (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}
      <div style={{backgroundImage:`url(${hirebest})`,objectFit: 'inherit',height : 750 }}>
      <div className="container" style={{ marginTop: 20, marginRight: 800  }}>
        <div className="main-body">
          <div className="row">
            <div className="col-lg-8" style={{marginTop : 100}}>
              <div className="card">
                <div className="card-body">
                  <h5 className="d-flex align-items-center mb-3">
                    Register Details
                  </h5>
                  <div class="row">
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <h6>First Name</h6>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="Enter First Name"
                          max={10}
                          value={inputdata.first_name}
                          onChange={handleData}
                          className="form-control"
                        ></input>{" "}
                      </div>
                    </div>
                    <div class="col-md-6 mb-4">
                      <div class="form-outline">
                        <h6>Last Name</h6>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Enter Last Name"
                          value={inputdata.last_name}
                          onChange={handleData}
                          className="form-control"
                        ></input>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={inputdata.email}
                        onChange={handleData}
                        className="form-control"
                      ></input>{" "}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={inputdata.password}
                        onChange={handleData}
                        className="form-control"
                      ></input>{" "}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Confirm Password</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="password"
                        name="cpassword"
                        placeholder="Enter Confirm password"
                        value={inputdata.cpassword}
                        onChange={handleData}
                        className="form-control"
                      ></input>{" "}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Contact Number</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="contact"
                        name="contact_number"
                        placeholder="Enter Contact number"
                        value={inputdata.contact_number}
                        onChange={handleData}
                        className="form-control"
                      ></input>{" "}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Company Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="company_name"
                        name="company_name"
                        placeholder="Enter Company Name"
                        value={inputdata.company_name}
                        onChange={handleData}
                        className="form-control"
                      ></input>{" "}
                    </div>
                  </div>
                 
                  <div className="row">
                    <div className="col-sm-3" />
                    <div className="col-sm-9 text-secondary">
                      <button className="btn btn-primary" onClick={onSubmit}>
                        Submit
                      </button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );

      }

