import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
const Form = () => {
  const navigate = useNavigate();

  const [isSignInPage, setIsSignInPage] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("signup")) {
      setIsSignInPage(false);
    } else {
      setIsSignInPage(true);
    }
  }, []);

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
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignInPage((prev) => !prev);
      setIsTransitioning(false);
      navigate(`${isSignInPage ? "/account/signup" : "/account/login"}`);
    }, 300);
  };
  return (
    <div
      className={`h-screen font-inter flex flex-col transition-all duration-500 ease-in-out ${
        isSignInPage ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${isTransitioning ? "bg-black" : ""}`}
    >
      {isSignInPage ? (
        <>
          {/* Left semicircle div */}
          <div
            className={`bg-black lg:w-[50%] w-full h-[90%] lg:h-full lg:rounded-br-full lg:rounded-tr-[3rem] rounded-bl-lg shadow-md shadow-slate-800 flex justify-center items-center transition-all duration-1000 ease-in-out`}
          >
            <div className="text-white text-center h-1/4 text-xl lg:text-4xl transition-all duration-500 ease-in-out">
              Welcome to Camconnect
            </div>
          </div>
          {/* Div for signin */}
          <div
            className={`relative lg:w-[50%] w-full h-screen lg:h-full flex flex-col lg:justify-center items-center -mt-10 transition-all duration-300 ease-in-out`}
          >
            <form
              className={`bg-gray-600 w-full h-full lg:w-[70%] lg:h-[50%] shadow-lg shadow-gray-700 lg:rounded-[3rem] rounded-tr-[2rem] rounded-tl-[2rem] transition-all duration-300 ease-in-out`}
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                name="username"
                placeholder="Username"
                className="mt-10"
                onChange={handleChange}
                value={formData.username}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <Button name="Sign in" className="h-[13%]" type="submit" />
              <p className="font-bold text-center mt-6 text-sm text-white">
                Forgot password?
              </p>
              <p
                className="font-bold text-center mt-5 text-sm text-white cursor-pointer"
                onClick={handleTogglePage}
              >
                Don&apos;t have an account? Sign up here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* Right semicircle div */}
          <div className="bg-black lg:w-[50%] w-full h-full lg:h-full lg:rounded-tl-full lg:rounded-tr-[3rem] rounded-bl-lg shadow-md shadow-slate-800 flex lg:justify-center justify-evenly lg:items-center items-start transition-all duration-500 ease-in-out">
            <div className="text-white  lg:text-center h-1/4 text-xl lg:text-4xl mt-9 transition-all duration-300 ease-in-out">
              Signup to connect
            </div>
          </div>
          {/* Div for signup */}
          <div
            className={`lg:w-[50%] w-full h-screen lg:h-full flex flex-col justify-evenly items-center -mt-96 lg:mt-0.5 transition-all duration-300 ease-in-out`}
          >
            <form
              className="bg-gray-600 w-full h-full lg:w-[70%] lg:h-[80%] shadow-lg shadow-gray-700 lg:rounded-[3rem] rounded-tr-[2rem] rounded-tl-[2rem] flex flex-col justify-evenly transition-all duration-500 ease-in-out"
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                name="firstName"
                placeholder="Firstname"
                className="lg:h-[10%] lg:mt-10 mt-7"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Lastname"
                className="lg:h-[10%]"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                type="text"
                name="username"
                placeholder="Username"
                className="lg:h-[10%]"
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                type="date"
                name="dateOfBirth"
                placeholder="mm/dd/yyyy"
                className="lg:h-[10%]"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="emailId"
                placeholder="Email"
                className="lg:h-[10%]"
                value={formData.emailId}
                onChange={handleChange}
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="lg:h-[10%]"
                value={formData.password}
                onChange={handleChange}
              />
              <Button name="Sign up" className="mt-2 h-[13%]" />

              <p
                className="text-center mt-2 text-sm text-white mb-3 cursor-pointer"
                onClick={handleTogglePage}
              >
                Already have an account?<b> Sign in here</b>
              </p>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
