import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { constants } from '../utils/constant';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Admin() {


  const [countApplicant,setCountApplicant] = useState([]);

  const [countRecruiter,setCountRecruiter] = useState([]);



  useEffect(()=>{

      getCountOfApplicant()
      getCountOfRecruiter()
    

  },[])




  let getCountOfApplicant = () => {
    axios.get(constants.serverUrl + "/admin/allapplicant").then((res) => {
      setCountApplicant(res.data.data);
    });
  };

  let getCountOfRecruiter = () => {
    axios.get(constants.serverUrl + "/admin/allrecruiter").then((res) => {
      setCountRecruiter(res.data.data);
    });
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
            <span className="fs-5 fw-semibold">Welcome Admin</span>
          </span>
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#dashboard-collapse"
                aria-expanded="false"
              >
                Dashboard
              </button>
              <div
                className="collapse"
                id="dashboard-collapse"
                style={{ margin: 14 }}
              >
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <Link
                      to="/allapplicant"
                      className="link-dark rounded"
                      style={{ fontSize: 20 }}
                    >
                      All Applicants
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/allrecruiter"
                      className="link-dark rounded"
                      style={{ fontSize: 20 }}
                    >
                      All Recruiters
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col">
          <center>
            <div
              className="row"
              style={{ marginBottom: 250, marginTop: 250, maxWidth: 1000 }}
            >
              <div
                className="shadow-lg p-3 mb-5  rounded col "
                style={{ height: 240, margin: 20, backgroundColor: "#90CAF9" }}
              >
                <span style={{ fontSize: 20 }}>Number of Recruiters</span>
                <p style={{ fontSize: 90, marginTop: "revert" }}>
                  {countRecruiter.length === 0 ? 0 : countRecruiter[0].count}
                </p>
              </div>

              <div
                className="shadow-lg p-3 mb-5 rounded col"
                style={{ height: 240, margin: 20, backgroundColor: "#42A5F5" }}
              >
                <span style={{ fontSize: 20 }}>Number of Applicants</span>
                <p style={{ fontSize: 90, marginTop: "revert" }}>
                  {countApplicant.length === 0 ? 0 : countApplicant[0].count}
                </p>
              </div>
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

