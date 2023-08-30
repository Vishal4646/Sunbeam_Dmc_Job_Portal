import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';

export default function AdminLogin(props) {
    const [input, setInput] = useState({ email: "", password: "" })
    const history = useHistory();

    let TextChanged = (event) => {

        var copyofInput = { ...input };
        copyofInput[event.target.name] = event.target.value;
        setInput(copyofInput);

    }


    let login = () => {
            
        if (input.email === "") {
            toast.warn("Email cannot be empty");
        } else if (input.password === "") {
            toast.warn("Password cannot be empty");
        }
        else {

                if (input.email === "admin" && input.password === "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") {

                    sessionStorage.setItem("isUserLoggedIn", "true");
                    sessionStorage.setItem("loggedInUser", "admin");
                    props.setState(" ");
                    history.push("/adminhome")

                } else {
                    toast.error("Invalid Credentials")
                }
        }
    }

    return (
        <>

            <div className="login_section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Log In Admin</h5>
                                    <form className="form-signin">
                                        <div className="form-label-group">
                                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus name='email' onChange={TextChanged} />
                                            <label for="inputEmail">Email address</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required name='password' onChange={TextChanged} />
                                            <label for="inputPassword">Password</label>
                                        </div>


                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" onClick={login}>Log In</button>
                                        <hr className="my-4" />

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )

}
