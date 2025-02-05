import "../../css/form/form.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, TextField } from "@mui/material";

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignInPage, setIsSignInPage] = useState(true);
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("signup")) {
      setIsSignInPage(false);
    } else {
      setIsSignInPage(true);
    }
  }, [location]);
  const [formData, setformData] = useState({
    ...(!isSignInPage && {
      firstName: "",
      lastName: "",
      emailId: "",
      dateOfBirth: "",
    }),
    username: "",
    password: "",
  });

  const handleChange = async (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value, //[] here ensures that the value is evaluated as js dosent support . notation in object name
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${isSignInPage ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.status == 200 && isSignInPage) {
        const { token } = data;
        console.log("token", token);
        localStorage.setItem("token", token);
        alert(`Login successfull`);
        navigate("/user/dashboard");
      } else if (response.status == 201 && !isSignInPage) {
        alert(`${formData.firstName} you have registered successfully`);
        console.log("login");
        navigate("/account/login");
      } else {
        const message = data.message;
        alert(message);
      }
    } catch (error) {
      console.log("Error in login", error);
    }
  };

  const handleTogglePage = () => {
    setTimeout(() => {
      setIsSignInPage((prev) => !prev);
      navigate(`${isSignInPage ? "/account/signup" : "/account/login"}`);
    }, 300);
  };
  return (
    <div className="flex-create">
      {isSignInPage ? (
        <>
          <h2 className="text"> Welcome To Cam connect</h2>

          <form className="flex-div-child-node" onSubmit={handleSubmit}>
            <h2 className="text">Login</h2>
            <TextField
              type="text"
              name="username"
              id="standard-basic"
              label="Username"
              variant="filled"
              className="textField"
              color="primary"
              value={formData.username}
              onChange={handleChange}
              required
            ></TextField>

            <TextField
              type="password"
              name="password"
              id="standard-basic"
              label="Password"
              variant="filled"
              className="textField"
              value={formData.password}
              onChange={handleChange}
              required
            ></TextField>

            <Button variant="contained" className="button" type="submit">
              Login
            </Button>
            <p>Forgot password?</p>
            <p onClick={handleTogglePage} className="navigate">
              Don&apos;t have an account? <b>Sign in here</b>
            </p>
          </form>
        </>
      ) : (
        <>
          {/*-----------Signup page -------------*/}
          <form className="flex-div-child-node" onSubmit={handleSubmit}>
            <h2 className="text">Signup</h2>
            <TextField
              type="text"
              name="firstName"
              id="standard-basic"
              label="Firstname"
              variant="filled"
              className="textField"
              color="primary"
              value={formData.firstName}
              onChange={handleChange}
              required
            ></TextField>

            <TextField
              type="text"
              name="lastName"
              id="standard-basic"
              label="Lastname"
              variant="filled"
              className="textField"
              value={formData.lastName}
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="text"
              name="username"
              id="standard-basic"
              label="Username"
              variant="filled"
              className="textField"
              value={formData.username}
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="date"
              name="dateOfBirth"
              id="standard-basic"
              variant="filled"
              className="textField"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="email"
              name="emailId"
              id="standard-basic"
              variant="filled"
              className="textField"
              label="Email"
              value={formData.emailId}
              onChange={handleChange}
              required
            ></TextField>
            <TextField
              type="password"
              name="password"
              id="standard-basic"
              variant="filled"
              className="textField"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></TextField>
            <Button variant="contained" className="button" type="submit">
              Signup
            </Button>
            <p onClick={handleTogglePage} className="navigate">
              Already have an account?<b> Sign in here</b>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
