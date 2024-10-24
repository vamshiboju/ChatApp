import React, { useState } from "react";
import logo from "../Images/LoginLogo.svg";
import { Backdrop, Button, CircularProgress, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "./Toaster";
import NavBar from "./NavBar";

function Login() {
  //const [login, setlogin] = useState(false);
  // const [signup, setsignup] = useState(second)
  //const [showlogin, setShowLogin] = useState(false);
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
        "http://localhost:8080/user/login/",
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
        msg: "Invalid User name or Password or Gender",
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
        "http://localhost:8080/user/register/",
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
      <NavBar path={{ login: true, signup: false }} />
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
            <p className="login-text">Login</p>
            <TextField
              onChange={changeHandler}
              id="filled-basic"
              label="Enter User Name"
              variant="filled"
              color="primary"
              name="name"
              size="normal"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <TextField
              onChange={changeHandler}
              id="filled-password-input"
              variant="filled"
              label="Password"
              type="password"
              autoComplete="current-password"
              color="primary"
              name="password"
              size="normal"
              onKeyDown={(event) => {
                if (event.code === "Enter") {
                  // console.log(event);
                  loginHandler();
                }
              }}
            />
            <TextField
              select
              onChange={changeHandler}

              color="primary"
              label="Gender"
              name="gender"
              id="filled-size-normal"
              variant="filled"
              size="Normal"
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
              onClick={loginHandler}
              isLoading
            >
              Login
            </Button>
            <p>
              Don't have an Account ?{" "}
              <Link to="/signup" >
                <span
                  className="hyper"
                >
                  Sign Up
                </span>
              </Link>
            </p>
            {logInStatus ? (
              <Toaster key={logInStatus.key} message={logInStatus.msg} />
            ) : null}
          </div>
        </div>
      </>
    </div>
  );
}

export default Login;
