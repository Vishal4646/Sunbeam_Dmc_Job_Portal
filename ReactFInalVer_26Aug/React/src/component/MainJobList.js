import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { constants } from '../utils/constant';

export default function MainJobList() {

    const [alljobs,setAlljobs] = useState([])



    useEffect(()=>{


        getAllJobs();


    },[])


    //APIS

  let getAllJobs=()=>{



        axios.get(constants.serverUrl+"/jobapplied/").then((result)=>{

            setAlljobs(result.data.data)
            
            
        })




  }


  return (
    <>
        {

            alljobs.map((job)=>{
                   

                return(

    
                    <div className="card mb-3 my-5" style={{marginLeft : 500,marginRight : 500}}>
                    <div className="card-body">
                      <h5 className="card-title">{job.job_type}</h5>
                      <p className="card-text">{job.job_description}</p>
                      <p className="card-text"><small className="text-muted">{job.created_date}</small></p>
                    </div>
                  </div>

                  


                );







            })






        }

    </>
  );
}
