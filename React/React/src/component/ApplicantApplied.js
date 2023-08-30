import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import gender from "../images/gender.svg";
import mail from "../images/mail.svg";
import phone from "../images/phone.svg";
import calender from "../images/calender.svg";
import percent from "../images/percent.svg";
import skills from "../images/skill.svg";
import { useHistory } from "react-router-dom";
import { constants } from '../utils/constant';
import { toast } from "react-toastify";

export default function ApplicantApplied(props) {
  const [applies, setApplies] = useState([]);
  const [message, setMessage] = useState("");
  const history = useHistory();
  var [searchText, setSearchText] = useState("");


  useEffect(() => {
    getApplies();
  }, [props.list]);

  let getApplies = () => {
    setApplies([]);

    let id = props.id;
    axios
      .get(constants.serverUrl + "/recruiter/getApplies/" + id)
      .then((res) => {
        setApplies(res.data.data);
      });
  };

  let trimDate = (date) => {
    let d = date.substr(0, 10).split("-").reverse().join("-");
    return d;
  };

  let getImage = (img) => {
    return constants.serverUrl+"/" + img;
  };

  let shortList = (id,e) => {
    setMessage("Please Wait Sending Mail to Shortlisted Candidate")
    axios
      .post(constants.serverUrl+"/recruiter/shortlist", { job_applied_id: id ,email : e})
      .then((res) => {
        if (res.data.status === "success") {
          setMessage('')
          toast.success("SHORTLISTED SUCCESSFULLY..!!!",{onClose : ()=>{history.push("/recruiterhome")}});
   
        }
      });
  };

  let search = (args) => {
   
    setSearchText(args.target.value);
  };


  return (
    < >
      {message === "" ? (
        <></>
      ) : (
        <div className="alert alert-warning" role="alert">
          {message}
        </div>
      )}

        <center>
             <div className="shadow p-3 mb-3 bg-body rounded" style={{maxWidth: 1000}}>APPLIED APPLICANT TO YOUR JOB POSTED</div>
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
              placeholder="Search By Skills Or Percentage Or Degree Name"
              aria-label="Search"
              value={searchText}
              onChange={search}
            />
          </div>
        </div>
      </center>
      {
        applies.length === 0? <center> <h2>Empty list</h2> </center>:
          
      applies.map((applicant) => {
        if (searchText === "") {
          return (
            <div style={{marginBottom : 50}}>
             
                <div className="container">
                  <div className="row" style={{justifyContent : 'center'}}>
                    <div className="col-lg-10">
                      <div className="candidate-list">
                        <div className="candidate-list-box card mt-4">
                          <div className="p-4 card-body ">
                            <div className="align-items-center row">
                              <div
                                className="col-auto"
                                width={500}
                                height={500}
                              >
                                <div
                                  className="candidate-list-images"
                                  style={{ width: 150, height: 150 }}
                                >
                                  <span>
                                    <img
                                      src={getImage(applicant.profileImg)}
                                      style={{ width: 150, height: 150 }}
                                      alt="img"
                                      className="avatar-md img-thumbnail rounded-circle"
                                    />
                                  </span>
                                </div>
                              </div>

                              <div className="col-lg-5">
                                <div className="candidate-list-content mt-3 mt-lg-0">
                                  <h5 className="fs-19 mb-0">
                                    <span className="primary-link">
                                      {applicant.first_name}{" "}
                                      {applicant.last_name}
                                    </span>
                                    <span className="badge bg-success ms-1"></span>
                                  </h5>

                                  <p className="text-muted mb-2">
                                    Degree: {applicant.degree_name}
                                  </p>
                                  <p className="text-muted mb-2">
                                    University: {applicant.university_name}
                                  </p>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={gender} alt='img'></img>
                                      {applicant.gender}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={mail} alt='img'></img>
                                      {applicant.email}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={phone} alt='img'></img>
                                      {applicant.contact_number}
                                    </li>
                                  </ul>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={calender} alt='img'></img>Gradution start
                                      date: {trimDate(applicant.start_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={calender} alt='img'></img>Gradution end
                                      date:{" "}
                                      {trimDate(applicant.completion_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={percent} alt='img'></img>
                                      {applicant.percentage}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={skills} alt='img'></img>
                                      {applicant.skill_set}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div
                                className="col-lg-5"
                                style={{
                                  display: "flex",
                                  marginLeft  : -12,
                                  justifyContent: "flex-start"
                                }}
                              >
                                <span>
                                  <div className="form-check form-switch">
                                    <button
                                      type="button"
                                      className="btn btn-outline-info"
                                      onClick={() => {
                                        shortList(applicant.job_applied_id,applicant.email);
                                      }}
                                    >
                                      Shortlist
                                    </button>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          );
        } else if (
          applicant.skill_set
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          applicant.degree_name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          applicant.percentage <= searchText
        ) {
          return (
            <div style={{marginBottom : 50}}>
              <section className="section">
                <div className="container">
                  <div className="row" style={{justifyContent : 'center'}}>
                    <div className="col-lg-10">
                      <div className="candidate-list">
                        <div className="candidate-list-box card mt-4">
                          <div className="p-4 card-body ">
                            <div className="align-items-center row">
                              <div
                                className="col-auto"
                                width={500}
                                height={500}
                              >
                                <div
                                  className="candidate-list-images"
                                  style={{ width: 150, height: 150 }}
                                >
                                  <span>
                                    <img
                                      src={getImage(applicant.profileImg)}
                                      style={{ width: 150, height: 150 }}
                                      alt="img"
                                      className="avatar-md img-thumbnail rounded-circle"
                                    />
                                  </span>
                                </div>
                              </div>

                              <div className="col-lg-5">
                                <div className="candidate-list-content mt-3 mt-lg-0">
                                  <h5 className="fs-19 mb-0">
                                    <span className="primary-link" >
                                      {applicant.first_name}{" "}
                                      {applicant.last_name}
                                    </span>
                                    <span className="badge bg-success ms-1"></span>
                                  </h5>

                                  <p className="text-muted mb-2">
                                    Degree: {applicant.degree_name}
                                  </p>
                                  <p className="text-muted mb-2">
                                    University: {applicant.university_name}
                                  </p>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={gender} alt='img'></img>
                                      {applicant.gender}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={mail} alt='img'></img>
                                      {applicant.email}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={phone} alt='img'></img>
                                      {applicant.contact_number}
                                    </li>
                                  </ul>

                                  <ul className="list-inline mb-0 text-muted">
                                    <li className="list-inline-item">
                                      <img src={calender} alt='img'></img>Gradution start
                                      date: {trimDate(applicant.start_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={calender} alt='img'></img>Gradution end
                                      date:{" "}
                                      {trimDate(applicant.completion_date)}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={percent} alt='img'></img>
                                      {applicant.percentage}
                                    </li>
                                    <li className="list-inline-item">
                                      <img src={skills} alt='img'></img>
                                      {applicant.skill_set}
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div
                                className="col-lg-5"
                                style={{
                                  display: "flex",
                                  marginLeft  : -12,
                                  justifyContent: "flex-start",
                                }}
                              >
                                <span>
                                  <div className="form-check form-switch">
                                    <button
                                      type="button"
                                      className="btn btn-outline-info"
                                      onClick={() => {
                                        shortList(applicant.job_applied_id);
                                      }}
                                    >
                                      Shortlist
                                    </button>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          );
        }else {return(<></>)}
      })}
    </>
  );
}