import '../../css/form/form.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { userLogin } from '../../services/userServices';
import TransitionsSnackbar from '../toaster/TransitionsSnackbar';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, SetError] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userLogin(formData);

      if (response) {
        navigate('/user/dashboard');
      } else {
        SetError('Login failed. Username or Password is invalid.');
      }
    } catch (error) {
      setToastMessage(error.message);
      setOpenToast(true);
    }
  };

  const handleGotToSignup = () => {
    navigate('/account/signup');
  };

  return (
    <>
      <div className="flex-create">
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

          {error ? <p>{error}</p> : null}
          <p>Forgot password?</p>

          <p onClick={handleGotToSignup} className="navigate">
            Don&apos;t have an account? Sign up here
          </p>
        </form>
      </div>

      <TransitionsSnackbar
        open={openToast}
        message={toastMessage}
        onClose={() => setOpenToast(false)}
        autoHideDuration={5000}
      />
    </>
  );
};

export default Login;
