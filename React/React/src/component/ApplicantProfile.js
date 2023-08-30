import axios from 'axios';
import React, { useEffect, useState } from 'react'
import account from '../images/account.svg'
import grad from '../images/grad.svg'
import edu from '../images/edu.svg'
import { constants } from '../utils/constant';
import { toast } from 'react-toastify';

export default function ApplicantProfile() {
 
  const [profileArray,setProfileArray] = useState([])
  const [educationArray,setEducationArray] = useState([])
  const [input,setInput] = useState({applicant_id: sessionStorage.getItem("applicantId"),first_name : "",last_name : "",email : "",contact_number:"",degree_name:"",university_name:"",percentage:"",skill_set:"",start_date:"",completion_date:""})
  const [img,setImg] = useState();
  const [startDate,setStartDate] = useState("")
  const [compDate,setCompDate] = useState("")
  const [regDate,setRegDate] = useState("")


  useEffect(() => {
    getApplicant();
    getEducation();
  }, []);

  let getEducation=()=>{

        let id = sessionStorage.getItem("applicantId")
        axios.get(constants.serverUrl+"/applicant/geteducation/"+id).then((res)=>{

          if(res.data.status === "error")
          {
            setEducationArray({
              applicant_id: 0,
              degree_name: "NA",
              university_name: "NA",
              start_date: "NA",
              completion_date: "NA",
              percentage: 0.0,
              skill_set: "NA",
              extra_col1: null,
              extra_col2: null
          })
          }else{
          setEducationArray(res.data.data[0])
          let sdate = res.data.data[0].start_date
          let cdate = res.data.data[0].completion_date
          setStartDate(trimDate(sdate))
          setCompDate(trimDate(cdate))
          }
         
        })

  }
  let handleImage = (e)=>{

      setImg(e.target.files[0])
      setTimeout(() => {
        toast("Image Selected Please Press Upload to Set Image")
        e.target.value = null
      }, 2000);
     

  }

  let uploadImg = ()=>{


    const fromData = new FormData();

    fromData.append("image",img,img.name)

    let id = sessionStorage.getItem("applicantId");
    axios.post(constants.serverUrl+"/applicant/uploadprofile/"+id,fromData).then((res)=>{

        if(res.data.status === "success")
        {
          getApplicant()
        }
    })
  }

  let getApplicant = () => {

     let id = sessionStorage.getItem("applicantId")
    axios
      .get(constants.serverUrl+"/applicant/getapplicant/"+id)
      .then((res) => {
        setProfileArray(res.data.data[0]);
        let rdate = res.data.data[0].registration_date;
        setRegDate(trimDate(rdate))
  
      });
  };

             
     

  let trimDate = (dd) => {
    

    let d = dd.substr(0, 10).split("/").reverse().join('/')
    return d;

  };

  let TextChanged = (event) => {
    var copyofInput = { ...input };
    copyofInput[event.target.name] = event.target.value;
    setInput(copyofInput);
  };
    
     
  let getImage=(img)=>{

    return constants.serverUrl+"/"+img

}

  let updateProfile = () => {
    let id =sessionStorage.getItem("applicantId")

    if(input.first_name === "" )
    {
          toast.warn("First name cannot be empty");
    }else if(input.last_name === "")
    {
          toast.warn("Last name cannot be empty");
    }else if(input.email === "")
    {
          toast.warn("Email cannot be empty");
    }else if(input.contact_number.length!==10 ||input.contact_number ==="")
    {
          toast.warn("Contact number should be 10 digit");
    }
    else{
    axios
      .put(constants.serverUrl+"/applicant/updateapplicant/"+id,input)
      .then((f) => {
        toast.success("Profile Details Updated Successfully");
        setInput({
          first_name: "",
          last_name: "",
          email: "",
          contact_number: "",
        });
        getApplicant();
      });
    }
  };

  let updateEducation = () => {

    if(input.degree_name === "" )
    {
     
          toast.warn("Degree name cannot be empty")
    }else if(input.university_name === "")
    {
          toast.warn("University name cannot be empty");
    }else if(input.percentage === "")
    {
          toast.warn("Percantage cannot be empty");
    }else if(input.skill_set === "")
    {
          toast.warn("Skills cannot be empty");
    }
    else if(input.start_date === "")
    {
          toast.warn("Start Date cannot be empty");
    }
    else if(input.completion_date === "")
    {
          toast.warn("Completion Date cannot be empty");
    }
    else{

      let id = sessionStorage.getItem("applicantId");
      const obj={

          applicant_id : id,
          degree_name: input.degree_name,
          university_name: input.university_name,
          percentage: input.percentage,
          skill_set: input.skill_set,
          start_date: input.start_date,
          completion_date: input.completion_date
        
      }
    axios
      .post(constants.serverUrl+"/applicant/addeducationdetails",obj)
      .then((f) => {
        getApplicant();
        toast.success("Education Details Updated Successfully");
        getEducation();
      });
    }
  };

  return (
    <>
          <div style={{marginBottom : 55}}>
            <div className="container">
              <div className="main-body">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                        <img  alt='img' src={getImage(profileArray.profileImg)} style={{width: 150, height: 150}}  className="avatar-md img-thumbnail rounded-circle" />
                        <input type='file' name='image' style={{maxWidth : 250,marginTop: 10}} onChange={handleImage}/>
                        <button type='button'className='btn btn-primary' onClick={uploadImg}>Upload</button>
                          <div className="mt-3">
                            <h4>
                              {profileArray.first_name} {profileArray.last_name}
                            </h4>
                            <p className="text-secondary mb-1">
                              Email :{profileArray.email}
                            </p>
                            <p className="text-secondary mb-1">
                              Gender :{profileArray.gender}
                            </p>
                            <p className="text-secondary mb-1">
                              Registration Date :
                               {regDate}

                            
                               
                              
                              
                              
                            </p>
                            <p className="text-secondary mb-1">
                              Phone:{profileArray.contact_number}
                            </p>
                          </div>
                          <div className="mt-3">
                            <h6>
                              <img src={edu} alt='img'/>

                              Education
                            </h6>
                            <p className="text-secondary mb-1">
                              Degree :{educationArray.degree_name}
                            </p>
                            <p className="text-secondary mb-1">
                              University :{educationArray.university_name}
                            </p>
                            <p className="text-secondary mb-1">
                              Percentage :{educationArray.percentage}
                            </p>
                            <p className="text-secondary mb-1">
                              Skill:{educationArray.skill_set}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="d-flex align-items-center mb-3">
                          <img src={account} className='mx-2' alt='img' /> Profile Details
                        </h5>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">First Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              required
                              placeholder={profileArray.first_name}
                              name="first_name"
                              value={input.first_name}
                              onChange={TextChanged}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Last Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              required
                              placeholder={profileArray.last_name}
                              name="last_name"
                              value={input.last_name}
                              onChange={TextChanged}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              required
                              placeholder={profileArray.email}
                              name="email"
                              value={input.email}
                              onChange={TextChanged}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="number"
                              className="form-control"
                              required
                              placeholder={profileArray.contact_number}
                              name="contact_number"
                              value={input.contact_number}
                              onChange={TextChanged}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-3" />
                          <div className="col-sm-9 text-secondary">
                            <input
                              type="button"
                              className="btn btn-primary px-4"
                              defaultValue="Save Changes"
                              onClick={updateProfile}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-13">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="d-flex align-items-center mb-3">
                            <img src={grad} alt='img' className='mx-2'/>
                            Education Highlights
                          </h5>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Degree</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder={educationArray.degree_name}
                                name="degree_name"
                                value={input.degree_name}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">University</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder={educationArray.university_name}
                                name="university_name"
                                value={input.university_name}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Percentage</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="number"
                                className="form-control"
                                required
                                placeholder={educationArray.percentage}
                                name="percentage"
                                value={input.percentage}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Skill</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="text"
                                className="form-control"
                                required
                                placeholder={educationArray.skill_set}
                                name="skill_set"
                                value={input.skill_set}
                                onChange={TextChanged}
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Start Date</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="date"
                                className="form-control"
                                required
                                placeholder={educationArray.start_date}
                                name="start_date"
                                value={input.start_date}
                                onChange={TextChanged}
                              />
                              <input type='text' value={""+startDate}/>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <div className="col-sm-3">
                              <h6 className="mb-0">Completion Date</h6>
                            </div>
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="date"
                                className="form-control"
                                required
                                placeholder={educationArray.completion_date}
                                name="completion_date"
                                value={input.completion_date}
                                onChange={TextChanged}
                              />
                              <input type='text' value={compDate}/>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-3" />
                            <div className="col-sm-9 text-secondary">
                              <input
                                type="button"
                                className="btn btn-primary px-4"
                                defaultValue="Save Changes"
                                onClick={updateEducation}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                
          </div>
          
    
    </>
  );}
