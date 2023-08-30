import axios from 'axios'
import React, { useState } from 'react'
import  opportunity from'../images/opportunity.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { constants } from '../utils/constant';
import { toast } from 'react-toastify';

export default function ApplicantRegister() {
    const data = {first_name : "", last_name : "", email : "", password : "",cpassword: "",  gender : "", contact_number : "", };    
    const [inputdata,setInputData] = useState(data)
    const history = useHistory()

        const handleData = (e) => {
          setInputData({ ...inputdata, [e.target.name]: e.target.value });
        };
         const onSubmit = (e) =>{
        e.preventDefault();
        
        
        if(inputdata.first_name === "" )
          {
                toast.warn("First name cannot be empty");
          }else if(inputdata.last_name === "")
          {
                toast.warn("Last name cannot be empty");
          }else if(inputdata.email === "")
          {
                toast.warn("Email cannot be empty");
          }else if(inputdata.password === "")
          {
                toast.warn("Password cannot be empty");
          }else if(inputdata.cpassword === "")
          {
                toast.warn("Confirm password cannot be empty");
          }else if(inputdata.password !== inputdata.cpassword)
          {
                toast.warn("Password should be match");
          }else if(inputdata.contact_number.length!==10 ||inputdata.contact_number ==="")
          {
                toast.warn("Contact number should be 10 digit");
          }else if(inputdata.gender === "")
          {
                toast.warn("Gender  cannot be empty");
          }else
          {
            axios.post(constants.serverUrl+'/applicant/register',inputdata).then((res)=>{
              if(res.data.status === "success")
              {
                 toast.success("Successfully Registered",{onClose : ()=>{history.push("/applogin")}})
                
              
              }
        })
        
    }
  }


    let radioValue = (val)=>{

        setInputData({...inputdata,['gender']:val})
        

    }



  return (
    <>    
    <div  style={{display: 'flex', height: '100vh', backgroundImage : `url(${opportunity})`}}>
    <div className="container" >
      <div className="main-body">
        <div className="row">      
          <div className="d-flex flex-row justify-content-end p-1"  style={{ justifyContent: 'flex-end',marginTop: "20px" }} >
            <div className="card" style={{maxWidth : 725}}>
              <div className="card-body" style={{width : 700}}>
              <h5 className="d-flex align-items-center mb-3">Register Details</h5>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">First Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" name='first_name' placeholder='Enter First Name' value={inputdata.first_name} onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Last Name</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="text" name='last_name' placeholder='Enter Last Name' value={inputdata.last_name} onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Email</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="email" name='email' placeholder='Enter Email' value={inputdata.email} onChange={handleData} className='form-control'></input>                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Password</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="password" name='password' placeholder='Enter password' value={inputdata.password} onChange={handleData} className='form-control'></input>                  </div>
                 </div>
                 <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Confirm Password</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="password" name='cpassword' placeholder='Please re-enter password'  onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Contact Number</h6>
                  </div>
                  <div className="col-sm-9 text-secondary">
                  <input type="contact" name='contact_number' placeholder='Enter Contact number' value={inputdata.contact_number} onChange={handleData} className='form-control'></input>                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-3">
                    <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                    <span><input type="radio" value="M" name="gender" onClick={(e)=>{

                      radioValue(e.target.value)
                    }}/> Male <input type="radio" value="F" name="gender"onClick={(e)=>{

                      radioValue(e.target.value)
                    }} /> Female</span>
                    </div>
                 
                  </div>
                <div className="row">
                  <div className="col-sm-3" />
                  <div className="col-sm-9 text-secondary">
                  <button className='btn btn-primary' onClick={onSubmit}>Submit</button>                  
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
  )
}
