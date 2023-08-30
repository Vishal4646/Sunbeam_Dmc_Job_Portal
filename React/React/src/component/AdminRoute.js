import React from 'react'
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function AdminRoute(props) {
    const history = useHistory();

    if(sessionStorage.getItem("loggedInUser") === "admin")
    {



        return (


                    <Route exact path={props.path} component={props.component}></Route>



            )







    }
    else{


            history.push("/")
    
    }

}
