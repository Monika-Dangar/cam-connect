import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Input from './Input';
import Button from './Button';
const Form = () => {
  const navigate=useNavigate()

  const [isSignInPage, setIsSignInPage] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
useEffect(() => {
 const path=location.pathname;
 console.log(location.pathname)
if(path.includes('signup')){
  setIsSignInPage(false)
}
else{
  setIsSignInPage(true)
}
  
}, [location.pathname])

const [formData, setformData] = useState({
  
   ...(!isSignInPage &&   {firstName:'',
   lastName:'',
   email:'',
   dob:'' }),
  userName:'',
  password:'',
 
})

const handleChange =async (e) =>{
  setformData({
    ...formData,
    [e.target.name]:e.target.value //[] here ensures that the value is evaluated as js dosent support . notation in object name
  })
}
const handleSubmit = async (e) =>{
  e.preventDefault();
  try {
    const response = fetch(`http://localhost:3000/api/user/${isSignInPage?'login':'signup'}`,
      {
        method:'POST',
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify(formData)
      })
     const data = response.json()
      if(response==200 && isSignInPage){
        const {token,user}=data
        localStorage.setItem("token",token)
        alert(`Login successfull`)
        navigate('/user/dashboard')
      }
      else if(response==201 && !isSignInPage){
        alert(`${formData.userName} you have registered successfully`)
      } 
      else if(response==400 && isSignInPage){
        alert("User doesn't exist")
      }
      else if(response==400 ){
        alert('fill all the fields')
      }
      else if(response==401 && isSignInPage){
        alert("Invalid password")
      }
      else {
        alert("Something went wrong")
      }
  } catch (error) {
    console.log("Error in login")
  }
    


}

  const handleTogglePage = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsSignInPage(prev => !prev);
      setIsTransitioning(false);
      navigate(`${isSignInPage ? '/account/signup' : '/account/login'}`)

    }, 300);
  };
  return (
    <div className={`h-screen flex flex-col transition-all duration-500 ease-in-out ${isSignInPage ? 'lg:flex-row' : 'lg:flex-row-reverse'} ${isTransitioning ? 'bg-black' : ''}`}>
      {isSignInPage ? (
        <>
          {/* Left semicircle div */}
          <div className={`bg-black lg:w-[50%] w-full h-[90%] lg:h-full lg:rounded-br-full lg:rounded-tr-[3rem] rounded-bl-lg shadow-md shadow-slate-800 flex justify-center items-center transition-all duration-1000 ease-in-out`}>
            <div className="text-white text-center h-1/4 text-xl lg:text-2xl transition-all duration-500 ease-in-out">
              Welcome to camconnect
            </div>
          </div>
          {/* Div for signin */}
          <div className={`relative lg:w-[50%] w-full h-screen lg:h-full flex flex-col lg:justify-center items-center -mt-10 transition-all duration-300 ease-in-out`} >
            <form className={`bg-gray-600 w-full h-full lg:w-[70%] lg:h-[50%] shadow-lg shadow-gray-700 lg:rounded-[3rem] rounded-tr-[2rem] rounded-tl-[2rem] transition-all duration-300 ease-in-out`}  onSubmit={handleSubmit}>
              <Input type="text" name="userName" placeholder="Username" className="mt-10" onChange={handleChange} value={formData.userName} />
              <Input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password}/>
              <Button name="Sign in" className="h-[13%]" type="submit" />
              <p className="font-bold text-center mt-6 text-sm text-white" >Forgot password?</p>
              <p className="font-bold text-center mt-5 text-sm text-white cursor-pointer" onClick={handleTogglePage}>
                Don't have an account? Sign up here
              </p>
            </form>
          </div>
        </>
      ) : (
        <>
          {/* Right semicircle div */}
          <div className="bg-black lg:w-[50%] w-full h-full lg:h-full lg:rounded-tl-full lg:rounded-tr-[3rem] rounded-bl-lg shadow-md shadow-slate-800 flex lg:justify-center justify-evenly lg:items-center items-start transition-all duration-500 ease-in-out">
            <div className="text-white lg:text-center h-1/4 text-xl lg:text-2xl mt-9 transition-all duration-300 ease-in-out">
              Welcome to camconnect
            </div>
          </div>
          {/* Div for signup */}
          <div className={`lg:w-[50%] w-full h-screen lg:h-full flex flex-col justify-evenly items-center -mt-96 lg:mt-0.5 transition-all duration-300 ease-in-out`}>
            <form className="bg-gray-600 w-full h-full lg:w-[70%] lg:h-[80%] shadow-lg shadow-gray-700 lg:rounded-[3rem] rounded-tr-[2rem] rounded-tl-[2rem] flex flex-col justify-evenly transition-all duration-500 ease-in-out"  onSubmit={handleSubmit}>
               <Input type="text" name="firstName" placeholder="Firstname" className="lg:h-[10%] lg:mt-10 mt-7" value={formData.firstName} onChange={handleChange} />
              <Input type="text" name="lastName" placeholder="Lastname" className="lg:h-[10%]" value={formData.lastName} onChange={handleChange}/>
              <Input type="text" name="userName" placeholder="Username" className="lg:h-[10%]" value={formData.userName} onChange={handleChange}/>
              <Input type="date" name="dob" placeholder="mm/dd/yyyy" className="lg:h-[10%]" value={formData.dob} onChange={handleChange}/>
              <Input type="email" name="email" placeholder="Email" className="lg:h-[10%]" value={formData.email} onChange={handleChange}/>
              <Input type="password" name="password" placeholder="Password" className="lg:h-[10%]" value={formData.password} onChange={handleChange}/>
              <Button name="Sign up" className="mt-2 h-[13%]" />
             
              <p className="text-center mt-2 text-sm text-white mb-3 cursor-pointer" onClick={handleTogglePage}>
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
