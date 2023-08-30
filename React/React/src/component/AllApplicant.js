import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { constants } from '../utils/constant'

export default function AllApplicant() {

    const [allApplicant,setAllApplicant] = useState([])
  
      useEffect(() => {
        getCand()
      }, [])

      let getImage = (img) => {
        return constants.serverUrl + "/" + img;
      };

      let getCand = () => {
        axios.get(constants.serverUrl + "/admin/applicant/").then((res) => {
          setAllApplicant(res.data.data);
         
        });
      };
      

      let del=(id)=>{

            axios.delete(constants.serverUrl+"/admin/dltapplicant/"+id).then((res)=>{

                if(res.data.status === "success")
                {
                    getCand()
                }
            })


      }

  return (
    <>
      
      <center>
             <div className="shadow p-3 mb-3 bg-body rounded" style={{maxWidth: 1000}}>ALL APPLICANTS</div>
            </center>
          {
            allApplicant.map((sh)=>{
              return(
                <div style={{marginBottom : 45,marginTop : 20}}>
              
                <section className="section">
                  <div className="container">      
                    <div className="row">
                      <div className="col-lg-12">
                        <center>
                        <div className="candidate-list">
                          <div className="candidate-list-box card mt-4 shadow p-3 mb-2 bg-body rounded" style={{maxWidth: 800}}>
                            <div className="p-4 card-body">
                              <div className="align-items-center row">
                                <div className="col-auto">
                                  <div className="candidate-list-images">
                                    <span><img src={getImage(sh.profileImg)} alt="img here" className="avatar-md img-thumbnail rounded-circle" style={{maxWidth : '55%',height : 100,width : 170}} /></span>
                                  </div>
                                </div>
                                <div className="col-lg-5">
                                  <div className="candidate-list-content mt-3 mt-lg-0">
                                    <h5 className="fs-19 mb-0">
                                      <span className="primary-link">Full Name : {sh.first_name} {sh.last_name}</span>
                                    </h5>
                                    <ul className="list-inline mb-0 text-muted">
                                      <li className="list-inline-item">Email : {sh.email}</li>
                                      <li className="list-inline-item">Phone : {sh.contact_number}</li>

                                      <li className="list-inline-item">Gender : {sh.gender}</li>

                                    </ul>
                                  </div>
                                </div>

                                <button className='btn btn-outline-danger col' onClick={()=>{del(sh.applicant_id)}}>Delete</button>
                               
                              </div>
                             
                            </div>
                          </div>
                          
                        </div>
                        </center>
                      </div>
                    </div>
                    
                  </div>
                </section>
              </div>
              
              )
            })
          }




    </>
  )
}
