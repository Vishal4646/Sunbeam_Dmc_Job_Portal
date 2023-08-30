
import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import work from '../images/work_white_24dp.svg'
import loc from '../images/room_black_24dp.svg'
import check from '../images/checklist_rtl_black_24dp.svg'
import pos from '../images/people_black_24dp.svg'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


export default function ApplicantHome()
{

  const [alljobs,setAllJobs] = useState([])
  const [jobappllied,setJobApplied] = useState([])
  const [message,setMessage] = useState("")
  const [eduDetails,setEduDetails] = useState([])
  const history = useHistory();

    useEffect(()=>{
      getAllJobs();



    },[])

   
    let getAllJobs = ()=>{

      axios.get("http://localhost:4001/jobapplied/").then((res)=>{
          setAllJobs(res.data.data)
    })



    let id = sessionStorage.getItem("applicantId")
    axios.get("http://localhost:4001/applicant/geteducation/"+id).then((res)=>{

       setEduDetails(res.data.data)
       console.log(res.data.data)

    })


  }


  let msg = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  let trimDate =(date)=>{
      let d=date.substr(1,9).split("-").reverse().join("-");
      return d;
  }
  

  let apply =(posted_by_id,job_id) => {
  
  
    let id = sessionStorage.getItem("applicantId")
    let obj={
        applicant_id : id,
        posted_by_id : posted_by_id,
        job_id : job_id,
        selected : false
    }

   

          if(eduDetails.length === 0)
          {
            msg("ENTER EDUCATIONAL DETAILS FIRST")
          }else{
  
                axios.post("http://localhost:4001/jobapplied/apply/",obj).then((res) => {

                      if(res.data.status === "success")
                      {
                        msg("Successfully Applied")
                        getAllJobs()
                      }
                      else{
                        if(res.data.data.sqlMessage.length > 0)
                        {
                          msg("ALREADY APPLIED CANNOT APPLY MORE THAN ONCE")
                        }else{
                          msg("Something Went Wrong Try Again")
                        }
                      }
                  

                })
          }
    
  
}
return (
  <>
    <center>
    <div className="shadow p-3 mb-3 bg-body rounded" style={{maxWidth: 1000}}> Available Jobs</div>
    </center>

    {message === "" ? (
        <></>
      ) : (
        <div className="alert alert-warning" role="alert" style={{position : 'fixed',top : 0}}>
          {message}
        </div>
      )}
    {alljobs.map((job) => {
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
                    <img src={work} style={{ fill: "black" }}></img>
                  </span>
                  <p style={{ marginLeft: 0 }}>{job.company_name}</p>
                </li>

                <li style={{ display: "flex" }}>
                  <span>
                    <img src={loc}></img>
                  </span>
                  <p style={{ marginLeft: 0 }}>{job.job_location}</p>
                </li>

                <li style={{ display: "flex" }}>
                  <span>
                    <img src={check}></img>
                  </span>
                  <p style={{ marginLeft: 0 }}>{job.skill_set_required}</p>
                </li>

                <li style={{ display: "flex" }}>
                  <span>
                    <img src={pos}></img>
                  </span>
                  <p style={{ marginLeft: 0 }}>{job.position}</p>
                </li>
              </ul>

              <div style={{ marginLeft: 30, float: "left",overflow: 'auto' }}>
                <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>

                <p style={{ float: "left", textAlign: "initial" }}>
                  {job.job_description}sadklsandsad dasdasdasdasdasdas
                  dasdasdasdasdasdasdasdas dasdasdasdasdasdasdasdasd addressasd
                  addressas dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                  dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                  dangerouslySetInnerHTMLas dangerouslySetInnerHTMLas
                  dasdasdasdasdasdasdasdasasasdasd addressasdasdas
                  dasdasdasdasdasdasdasdasasasdasdas
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
              onClick={()=>{
                apply(job.posted_by_id,job.job_id)
              }}
            >
              Apply
            </button>
          </div>
        </center>
      );
    })}
  </>
);
}