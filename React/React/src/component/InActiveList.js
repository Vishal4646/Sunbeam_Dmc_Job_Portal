import axios from 'axios';
import React, { useEffect, useState } from 'react'
import loc from '../images/room_black_24dp.svg'
import work from '../images/work_white_24dp.svg'
import check from '../images/checklist_rtl_black_24dp.svg'
import pos from '../images/people_black_24dp.svg'
import { constants } from '../utils/constant';
import { toast } from 'react-toastify';

export default function InActiveList() {
  const [inactivelist,setInactive] = useState([])
  var [searchText, setSearchText] = useState("");
  const [isOpen,setIsOpen]= useState()


  useEffect(()=>{
    getInActivelist();
  },[])


  let search=(args)=>
  {
    
      setSearchText(args.target.value);
  }


  let trimDate =(date)=>{
    let d=date.substr(1,9).split("-").reverse().join("-");
    return d;
  }


  let makeActive = (val, id) => {
    toast.success("JOB ACTIVATED")
    let obj = {
      status: val,
    };

    if (val === true) {
      axios
        .put(constants.serverUrl + "/recruiter/active/" + id, obj)
        .then((res) => {
          if (res.data.status === "success") {
          
             
              setTimeout(() => {
                getInActivelist();
                setIsOpen(false)
              }, 700);
          }
        });
    }
  };

  let getInActivelist = () =>{
    var id = sessionStorage.getItem("recruiterId")
    axios.get(constants.serverUrl+"/recruiter/inactive/"+id).then((res)=>{
      setInactive(res.data.data)
      setIsOpen( )
    })
  }
  return (
    <>

      <div className="shadow p-3 mb-5 bg-body rounded container">
        <center className="row">
          <div className="d-flex col">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search By Job Type Or Location"
              aria-label="Search"
              value={searchText}
              onChange={search}
            />
    
          </div>


        </center>
      </div>

      {inactivelist.map((job) => {

            if(searchText === ""){
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
                  style={{
                    marginLeft: 30,
                    float: "left",
                    maxWidth: 700,
                    overflow: "auto",
                  }}
                >
                  <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>

                  <p
                  style={{ float: "left", textAlign: "initial",overflow : "none" ,maxWidth: 700,overflowWrap : 'anywhere'}}
                  >
                    {job.job_description}
                  </p>
                </div>
            
              </div>

              <div
                className="col-lg-5"
                style={{ display: "flex", flexDirection : 'row-reverse' }}
              >
                <span style={{display : 'flex',flexDirection: 'column',justifyContent : 'space-between'}}>
                  <div className="form-check form-switch" style={{display : 'flex',flexDirection : 'row-reverse'}}><p style={{marginRight: 40,color : 'black',fontWeight: 600}}>MAKE ACTIVE</p>
                    <input
                      
                      style={{border : '2px solid #6899ce'}}
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"
                      checked={isOpen}
                      onClick={(e) => {
                        makeActive(e.target.checked, job.job_id);
                      }}
                    />
                  </div>
                  <div
                  style={{ position: "relative" }}
                >
                  <label> {trimDate(job.created_date)}</label>
                </div>
                </span>
              </div>
            </div>
          </center>
        );
            }else if(job.job_type.toLowerCase().includes(searchText.toLowerCase()) ||job.job_location.toLowerCase().includes(searchText.toLowerCase()) ){

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
                            <p style={{ marginLeft: 0 }}>
                              {job.skill_set_required}
                            </p>
                          </li>

                          <li style={{ display: "flex" }}>
                            <span>
                              <img src={pos} alt='img'></img>
                            </span>
                            <p style={{ marginLeft: 0 }}>{job.position}</p>
                          </li>
                        </ul>

                        <div
                          style={{
                            marginLeft: 30,
                            float: "left",
                            maxWidth: 700,
                            overflow: "auto",
                          }}
                        >
                          <h6 style={{ float: "left" }}>JOB DESCRIPTION</h6>

                          <p
                            style={{ float: "left", textAlign: "initial",overflow : "none" ,maxWidth: 700,overflowWrap : 'anywhere'}}
                          >
                            {job.job_description}
                          </p>
                        </div>
                   
                      </div>

                      <div
                        className="col-lg-5"
                        style={{
                          display: "flex",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div
                            className="form-check form-switch"
                            style={{
                              display: "flex",
                              flexDirection: "row-reverse",
                            }}
                          >
                            <p
                              style={{
                                marginRight: 40,
                                color: "black",
                                fontWeight: 600,
                              }}
                            >
                              MAKE ACTIVE
                            </p>
                            <input
                              i
                              style={{ border: "2px solid #6899ce" }}
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              onClick={(e) => {
                                makeActive(e.target.checked, job.job_id);
                              }}
                            />
                          </div>
                          <div style={{ position: "relative" }}>
                            <label> {trimDate(job.created_date)}</label>
                          </div>
                        </span>
                      </div>
                    </div>
                  </center>
                );   


            }else {return(<></>)}

      })}
    </>
  );
}
