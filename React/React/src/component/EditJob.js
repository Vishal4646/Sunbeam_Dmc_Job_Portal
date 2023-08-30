import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { constants } from '../utils/constant';

export default function EditJob() {
    const location = useLocation();
    const [input,setInput] = useState({job_type:"",skill_set_required : "",position : "",job_location: "",job_description:"",job_id:""});
    const history = useHistory();
    const inputRec = location.state;



    useEffect(()=>{

      setInput(inputRec)
    },[inputRec])

    let TextChanged = (e) => {
      var copy = { ...input };
      copy[e.target.name] = e.target.value;
      setInput(copy);
    };



    let editJob = () => {
      axios
        .put(constants.serverUrl + "/recruiter/updtjob/" + input.job_id, input)
        .then((res) => {
          if (res.data.status === "success") {
            toast.success("UPDATED SUCCESSFULLY",{onClose : ()=>{history.push("/recruiterhome")}});
          }
        });
    };



  return (
    <>
      <center>
        <div
          className="shadow p-3 mb-2 bg-body rounded"
          style={{ maxWidth: 1000, marginBottom: 0 }}
        >
          EDIT JOB DETAILS
        </div>
        <div
          className="shadow p-3 mb-5 bg-body rounded my-2"
          style={{ maxWidth: 1000 }}
        >
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              JOB TYPE
            </label>
            <input
              type="text"
              name="job_type"
              value={input.job_type}
              onChange={TextChanged}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              SKILL SET REQUIRED
            </label>
            <input
              name="skill_set_required"
              value={input.skill_set_required}
              onChange={TextChanged}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              POSITION
            </label>
            <input
              name="position"
              value={input.position}
              onChange={TextChanged}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              LOCATION
            </label>
            <input
              name="job_location"
              value={input.job_location}
              onChange={TextChanged}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              JOB DESCRIPTION
            </label>
            <textarea
              name="job_description"
              value={input.job_description}
              onChange={TextChanged}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={editJob}>
            SAVE
          </button>
        </div>
      </center>
    </>
  );
}
