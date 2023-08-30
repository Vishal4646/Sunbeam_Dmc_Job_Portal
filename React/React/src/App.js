
import './App.css';
import Navbar from './component/Navbar';

import Footer from './component/Footer';
import LoginApplicant from './component/LoginApplicant';
import Index from './component/Index';
import { Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import MainJobList from './component/MainJobList';
import AppliedJobList from './component/AppliedJobList';
import ProtectedRoute from './component/ProtectedRoute';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import RecruiterHomePage from './component/RecruiterHomePage';
import LoginRecruiter from './component/LoginRecruiter';
import RecruiterProfile from './component/RecruiterProfile';
import ShortlistCandidate from './component/ShortlistCandidate'
import EditJob from './component/EditJob';
import AddJob from './component/AddJob'
import ApplicantApplied from './component/ApplicantApplied';
import RecruiterRegister from './component/RecruiterRegister';
import ApplicantProfile from './component/ApplicantProfile';
import ApplicantHome from './component/ApplicantHome';
import InActiveList from './component/InActiveList';
import ApplicantRegister from './component/ApplicantRegister';
import Admin from './component/Admin';
import Allrecruiter from './component/Allrecruiter';
import AllApplicant from './component/AllApplicant';
import ApplicantAppliedToJobList from './component/ApplicantAppliedToJobList';
import AdminRoute from './component/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './component/AdminLogin';

function App(props) {
  const [state,setState] = useState("")
  return (
    <>
      <Navbar setState={setState} />
        <div>
      <Switch>
        <Route exact path="/" component={Index} />

        <Route exact path="/applogin">
          <LoginApplicant setState={setState} />
        </Route>

        <Route exact path="/recruiterlogin">
          <LoginRecruiter setState={setState} />
        </Route>

        <ProtectedRoute path="/alljobs" component={MainJobList} />

        <ProtectedRoute path="/recruiterhome" component={RecruiterHomePage} />

        <ProtectedRoute path="/recprofile" component={RecruiterProfile}/>

        <ProtectedRoute path="/shortlisted"  component={ShortlistCandidate}/>

        <Route exact path="/adminlogin"> <AdminLogin setState={setState}/></Route>
      

        <AdminRoute exact path="/adminhome" component={Admin}/>

        <AdminRoute path='/allrecruiter' component={Allrecruiter}/>
        <AdminRoute path='/allapplicant' component={AllApplicant}/>

        <ProtectedRoute path="/editjob" component={EditJob}/>

        <ProtectedRoute path="/addjob" component={AddJob}/>

        <ProtectedRoute path="/applicanttojob" component={ApplicantAppliedToJobList}/>

        <Route exact path="/recruiterregister" component={RecruiterRegister}/>

        <ProtectedRoute path="/applicantprofile" component={ApplicantProfile}/>

        <ProtectedRoute path="/applicanthome" component={ApplicantHome}/>

        <ProtectedRoute path="/appliedlistapp" component={AppliedJobList}/>

        <ProtectedRoute path="/inactivelist" component={InActiveList}/>

        <Route path="/applicantregister" component={ApplicantRegister}/>

      </Switch>
        <ToastContainer  autoClose={2000} theme="dark"/>
      </div>
      <Footer />
    </>
  );
}

export default App;
