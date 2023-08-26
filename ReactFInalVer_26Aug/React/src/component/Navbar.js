import React from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import logo from '../images/logoreact.png'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'



export default function Navbar(props) {

   const history = useHistory();

   let logout = ()=>{



      sessionStorage.removeItem("isUserLoggedIn");
      sessionStorage.removeItem("applicantId");
      sessionStorage.removeItem("recruiterId")
      sessionStorage.removeItem("company")
      sessionStorage.removeItem("loggedInUser")
      props.setState();
      history.push("/")



   }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light " style={{background: '#ECF8F9'}}>
        <a className="logo"  href="/">
          <img
           
            alt="logo"
            src={logo}
            style={{ height: 50, width: 200, marginLeft: 10 }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

      
        <div  className="collapse navbar-collapse" id="navbarNav" style={{marginLeft  : 100}}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                INDEX
              </Link>
            </li>
          </ul>
    
       
         {
            sessionStorage.getItem("loggedInUser") === "recruiter"?

            
           
                  <ul className="navbar-nav">
                  <li className="nav-item">
                  <Link className="nav-link" to="/recruiterhome">
                    MY HOME
                  </Link>
                  </li>
                  </ul>
                  
                    

            :

               <></>



         }
         

         

{
            sessionStorage.getItem("loggedInUser") === "applicant"?

            
                  
                  <ul className="navbar-nav">
                  <li className="nav-item">
                  <Link className="nav-link" to="/applicanthome">
                    MY HOME
                  </Link>
                  </li>
                  </ul>
                     

            :

               <></>



         }


          </div>


      

        {
          sessionStorage.getItem("loggedInUser") === "recruiter" ? (
            // >

            <div className="btn-group mx-4">
              <button
                type="button"
                className="btn btn-outline-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                MENU
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/shortlisted">
                    Short Listed
                  </Link>
                </li>
             
                <li>
                  <Link className="dropdown-item" to="/appliedlist">
                    Applied List
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/inactivelist">
                   Inactive List
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/recprofile">
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // <div className="login_text"><Link  className='nav-link' to="/applogin">LOGIN HERE</Link></div>
            <></>
          )

          //
        }

        {
          sessionStorage.getItem("loggedInUser") === "applicant" ? (
            // >

            <div className="btn-group mx-4">
              <button
                type="button"
                className="btn btn-outline-dark dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                MENU
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/applicantprofile">
                    Profile
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item" to="/appliedlistapp">
                    Applied List
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // <div className="login_text"><Link  className='nav-link' to="/applogin">LOGIN HERE</Link></div>
            <></>
          )

          //
        }
        {sessionStorage.getItem("isUserLoggedIn") ? (
          <></>
        ) : (
          <li className="nav-item dropdown mx-20" style={{ marginRight: 100 }}>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              LOGIN OR REGISTER
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="/applogin">
                  Login As Applicant
                </Link>
              </li>
              <li>
              
              </li>
              <li>
                <Link className="dropdown-item" to="/recruiterlogin">
                  Login As Recruiter
                </Link>
              </li>
              <hr className="dropdown-divider" />
              <li>
                <Link className="dropdown-item" to="/recruiterregister">
                  Register As Recruiter
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/applicantregister">
                  Register As Applicant
                </Link>
              </li>

            </ul>
          </li>
        )}
      </nav>
    </>
  );
}
