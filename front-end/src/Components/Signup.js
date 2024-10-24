import React, { useState } from "react";
import logo from "../Images/SignupLogo.svg";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "./Toaster";
import NavBar from "./NavBar";
import { MenuItem } from '@mui/material';

const ENDPOINT = "https://chatapp-backend-ri1x.onrender.com";

function Login() {
    const [data, setData] = useState({ name: "", email: "", password: "", gender: "" });
    const [loading, setLoading] = useState(false);

    const [logInStatus, setLogInStatus] = React.useState("");
    const [signInStatus, setSignInStatus] = React.useState("");

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loginHandler = async (e) => {
        setLoading(true);
        console.log(data);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const response = await axios.post(
                ENDPOINT+"/user/login/",
                data,
                config
            );
            console.log("Login : ", response);
            setLogInStatus({ msg: "Success", key: Math.random() });
            setLoading(false);
            localStorage.setItem("userData", JSON.stringify(response));
            navigate("/app/welcome");
        } catch (error) {
            setLogInStatus({
                msg: "Invalid User name or Password",
                key: Math.random(),
            });
        }
        setLoading(false);
    };

    const signUpHandler = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const response = await axios.post(
                ENDPOINT+"/user/register/",
                data,
                config
            );
            console.log(response);
            setSignInStatus({ msg: "Success", key: Math.random() });
            navigate("/app/welcome");
            localStorage.setItem("userData", JSON.stringify(response));
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response.status === 405) {
                setLogInStatus({
                    msg: "User with this email ID already Exists",
                    key: Math.random(),
                });
            }
            if (error.response.status === 406) {
                setLogInStatus({
                    msg: "User Name already Taken, Please take another one",
                    key: Math.random(),
                });
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <NavBar path={{ login: false, signup: true }} />
            <>
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="secondary" />
                </Backdrop>
                <div className="login-container">
                    <div className="image-container">
                        <img src={logo} alt="Logo" className="welcome-logo" />
                    </div>
                    <div className="login-box">
                        <p className="login-text">Create your Account</p>
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter User Name"
                            variant="filled"
                            color="primary"
                            name="name"
                            helperText=""
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    // console.log(event);
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter Email Address"
                            variant="filled"
                            color="primary"
                            name="email"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    // console.log(event);
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="primary"
                            name="password"
                            variant="filled"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    // console.log(event);
                                    signUpHandler();
                                }
                            }}
                        />

                        <TextField
                            select
                            label="Gender"
                            onChange={changeHandler}
                            name="gender"
                            color="primary"
                            variant="filled"
                            style={{ width: 220 }}
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    signUpHandler();
                                }
                            }}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </TextField>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={signUpHandler}
                        >
                            Sign Up
                        </Button>
                        <p>
                            Already have an Account ?
                            <Link to="/">
                                <span
                                    className="hyper"
                                >
                                    Log in
                                </span>
                            </Link>
                        </p>
                        {signInStatus ? (
                            <Toaster key={signInStatus.key} message={signInStatus.msg} />
                        ) : null}
                    </div>
                </div>
            </>
        </div>
    );
}

export default Login;
