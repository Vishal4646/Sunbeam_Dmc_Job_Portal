import React, { useEffect, useState } from 'react'
import ApplicantApplied from './ApplicantApplied'
import axios from 'axios'
import { constants } from '../utils/constant'

export default function ApplicantAppliedToJobList() {

    const [list,setList] = useState()
    const [jobhead,setJobhead] = useState([])




    useEffect(()=>{

        getjobHeader()
    },[])


    let getjobHeader = () => {
      let id = sessionStorage.getItem("recruiterId");
      axios.get(constants.serverUrl + "/recruiter/getjob/" + id).then((res) => {
        setJobhead(res.data.data);
      });
    };


    let getApplicantByJobId = (idd) => {
      setList(<ApplicantApplied id={idd} list={list} />);
    };


  return (
    <>
      <div className="row">
        <div
          className="flex-shrink-0 p-3 bg-grey col"
          style={{
            width: 280,
            height: "92vh",
            background: " rgb(236, 248, 249)",
            maxWidth: 300,
          }}
        >
          <span
            
            className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
          >
            <svg className="bi me-2" style={{ width: 30, height: 24 }}></svg>
            <span className="fs-5 fw-semibold">Welcome</span>
          </span>
          <ul className="list-unstyled ps-0 mx-5">
            <li className="mb-1">
              <button
                className="btn dropdown-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="false"
              >
                Your Job List
              </button>
              <div
                className="collapse"
                id="dashboard-collapse"
                style={{ margin: 14 }}
              >
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  {jobhead.map((j) => {
                    return (
                      <li style={{ marginTop: 10, width: "fit-content" }}>
                        <button className="link-dark rounded" onClick={()=>{
                            getApplicantByJobId(j.job_id)
                        }}>
                          {j.job_type}
                          
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col" style={{  overflowY: 'auto',
                  
                  width:'500px',
                  float: 'left',
                  height:'600px',
                  position:'relative' }}>
            {/*List here*/}
            {list}
            
            </div>
      </div>
    </>
  );
}
