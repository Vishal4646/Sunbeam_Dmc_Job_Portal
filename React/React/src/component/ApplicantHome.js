
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import work from '../images/work_white_24dp.svg'
import loc from '../images/room_black_24dp.svg'
import check from '../images/checklist_rtl_black_24dp.svg'
import pos from '../images/people_black_24dp.svg'
import load from '../images/restart_alt_FILL0_wght400_GRAD0_opsz24.svg'
import { constants } from '../utils/constant'
import { toast } from 'react-toastify'


export default function ApplicantHome()
{

  const [alljobs,joblist] = useState([])
  const [eduDetails,setEduDetails] = useState([])
  var [searchText, setSearchText] = useState("");
  

    useEffect(()=>{
      getAllJobs();
      getEduDetails();

    },[])


    let reload = ()=>{

      getAllJobs()
     
    }

   
    let getAllJobs = () => {
      axios.get(constants.serverUrl + "/jobapplied/").then((res) => {
        joblist(res.data.data);
      });
    };

  let getEduDetails = () => {
    let id = sessionStorage.getItem("applicantId");
    axios
      .get(constants.serverUrl + "/applicant/geteducation/" + id)
      .then((res) => {
        setEduDetails(res.data.data);
      });
  };

  let search = (args) => {
    setSearchText(args.target.value);
  };

  let trimDate = (date) => {
    let d = date.substr(1, 9).split("-").reverse().join("-");
    return d;
  };



  let apply = (posted_by_id, job_id) => {
    let id = sessionStorage.getItem("applicantId");
    let obj = {
      applicant_id: id,
      posted_by_id: posted_by_id,
      job_id: job_id,
      selected: false,
    };

    if (eduDetails.length === 0) {
      toast.warn("Enter Educational Details");
    } else {
      axios
        .post(constants.serverUrl + "/jobapplied/apply/", obj)
        .then((res) => {
          if (res.data.status === "success") {
            toast.success("Applied SuccessFully");
          } else {
            toast.info("Already Applied");
          }
        });
    }
  };
return (
  <>

    <center>
      <div className="shadow p-3 mb-3 bg-body rounded " style={{ maxWidth: 1000,display : 'flex' ,justifyContent : 'space-between'}}>
       <span style={{marginLeft : 445}}>JOBS</span> 
       <span><img  src={load} onClick={reload} alt='img'/></span>
      </div>
    </center>
    <center>
      <div
        className="shadow p-3 mb-2 mt-2 bg-body rounded"
        style={{ maxWidth: 1000 }}
      >
        <div className="d-flex col">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Filter by Job Type or Location"
            aria-label="Search"
            value={searchText}
            onChange={search}
          />
        </div>
      </div>
    </center>
    {alljobs.map((job) => {
      if (searchText === "") {
        return (
          <center>
            <div
              className="shadow-lg p-3 mb-5 bg-body rounded"
              style={{
                maxWidth: 1000,
                height: "inherit",
                display: "flex",
                borderRadius: 100,
              }}
            >
              <div style={{ marginLeft: 0, position: "relative" }}>
                <div style={{ display: "flex", marginLeft: 30 }}>
                  <h5 style={{ marginLeft: 0 }}>{job.job_type}</h5>
                </div>

                <ul>
                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={work} style={{ fill: "black" }} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.company_name}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={loc} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.job_location}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={check} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.skill_set_required}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={pos} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.position}</p>
                  </li>
                </ul>

                <div
                  style={{ marginLeft: 30, float: "left", overflow: "auto" }}
                >
                  <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>

                  <p
                    style={{
                      float: "left",
                      textAlign: "initial",
                      overflow: "none",
                      maxWidth: 700,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {job.job_description}
                  </p>
                </div>
                <div
                  style={{ position: "relative", float: "right", right: -70 }}
                >
                  <label> {trimDate(job.created_date)}</label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-success"
                style={{ height: "max-content" }}
                onClick={() => {
                  apply(job.posted_by_id, job.job_id);
                }}
              >
                Apply
              </button>
            </div>
          </center>
        );
      } else if (
        job.job_type.toLowerCase().includes(searchText.toLowerCase()) ||
        job.job_location.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return (
          <center>
            <div
              className="shadow-lg p-3 mb-5 bg-body rounded"
              style={{
                maxWidth: 1000,
                height: "inherit",
                display: "flex",
                borderRadius: 100,
              }}
            >
              <div style={{ marginLeft: 0, position: "relative" }}>
                <div style={{ display: "flex", marginLeft: 30 }}>
                  <h5 style={{ marginLeft: 0 }}>{job.job_type}</h5>
                </div>

                <ul>
                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={work} style={{ fill: "black" }} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.company_name}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={loc} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.job_location}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={check} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.skill_set_required}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img src={pos} alt='img'></img>
                    </span>
                    <p style={{ marginLeft: 0 }}>{job.position}</p>
                  </li>
                </ul>

                <div
                  style={{ marginLeft: 30, float: "left", overflow: "auto" }}
                >
                  <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>

                  <p
                    style={{
                      float: "left",
                      textAlign: "initial",
                      overflow: "none",
                      maxWidth: 700,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {job.job_description}
                  </p>
                </div>
                <div
                  style={{ position: "relative", float: "right", right: -70 }}
                >
                  <label> {trimDate(job.created_date)}</label>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-success"
                style={{ height: "max-content" }}
                onClick={() => {
                  apply(job.posted_by_id, job.job_id);
                }}
              >
                Apply
              </button>
            </div>
          </center>
        );
      }else{return(<></>)}
    })}
  </>
);
}