import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { constants } from "../utils/constant";
import phone from '../images/phone_iphone_FILL0_wght400_GRAD0_opsz24.svg'
import work from '../images/work_white_24dp.svg'
import email from '../images/mail_FILL0_wght400_GRAD0_opsz24.svg'
import date from '../images/calendar_month_FILL0_wght400_GRAD0_opsz24.svg'

export default function Allrecruiter() {
  const [recruiter, setRecruiter] = useState([]);
  var [searchText, setSearchText] = useState("");

  let trimDate = (date) => {
    let d = date.substr(0, 10).split("-").reverse().join("-");
    return d;
  };
  let search = (args) => {
  
    setSearchText(args.target.value);
  };

  useEffect(() => {
    getRecruiter();
  }, []);

  let getRecruiter = () => {
    axios.get(constants.serverUrl + "/admin/getallrecruiter/").then((res) => {
      setRecruiter(res.data.data);

    });
  };

  let deleteRecruiter = (id) => {
    axios
      .delete(constants.serverUrl + "/admin/dltrecruiter/" + id)
      .then((res) => {
        getRecruiter();
      });
  };

  return (
    <div>
      <center>
        <div
          className="shadow p-3 mb-2 mt-2 bg-body rounded"
          style={{ maxWidth: 1000 }}
        >
          <div className="d-flex col">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Filter by Company"
              aria-label="Search"
              value={searchText}
              onChange={search}
            />
          </div>
        </div>
      </center>
      <center>
        {recruiter.map((r) => {
          return (
            <div
              className="shadow-lg p-3 mb-5 bg-body rounded"
              style={{
                maxWidth: 1000,
                height: "inherit",
                display: "flex",
                borderRadius: 100,
                justifyContent : 'space-between'
              }}
            >
              <div style={{ marginLeft: 0, position: "relative" }}>
                <div style={{ display: "flex", marginLeft: 30 }}>
                  <h5 style={{ marginLeft: 0 }}>
                    {r.first_name} {r.last_name}
                  </h5>
                </div>

                <ul>
                  <li style={{ display: "flex" }}>
                    <span>
                      <img style={{ fill: "black" }} alt='img' src={work}></img>
                    </span>
                    <p>Comapany :</p>
                    <p style={{ marginLeft: 0 }}>{r.company_name}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img alt='img' src={email}></img>
                    </span>
                    <p>Email :</p>
                    <p style={{ marginLeft: 0 }}>{r.email}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img alt='img' src={phone}></img>
                    </span>
                    <p>Phone :</p>
                    <p style={{ marginLeft: 0 }}>{r.contact_number}</p>
                  </li>

                  <li style={{ display: "flex" }}>
                    <span>
                      <img alt='img' src={date}></img>
                    </span>
                    <p>Registration Date :</p>
                    <p style={{ marginLeft: 0 }}>
                      {trimDate(r.registration_date)}
                    </p>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                className="btn btn-outline-danger"
                style={{ height: "max-content", alignItems: "flex-end" }}
                onClick={()=>{deleteRecruiter(r.recruiter_id)}}
              >
                Delete
              </button>
            </div>
          );
        })}
      </center>
    </div>
  );
}
