import '../../css/form/form.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { userSignup } from '../../services/userServices';
import TransitionsSnackbar from '../toaster/TransitionsSnackbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    dateOfBirth: '',
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
      const response = await userSignup(formData);

      if (response) {
        navigate('/account/login');
      } else {
        SetError('Signup failed. Please try again.');
      }
    } catch (error) {
      setToastMessage(error.message);
      setOpenToast(true);
    }
  };

  const handleGoToLoginPage = () => {
    navigate('/account/login');
  };

  return (
    <>
      <div className="flex-create">
        <form className="flex-div-child-node" onSubmit={handleSubmit}>
          <h2 className="text">Signup</h2>

          <TextField
            type="text"
            name="firstName"
            id="standard-basic"
            label="firstName"
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
            label="lastName"
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
          {error ? <p>{error}</p> : null}

          <p onClick={handleGoToLoginPage} className="navigate">
            Already have an account?<b> Sign in here</b>
          </p>
        </form>
      </div>

      <TransitionsSnackbar
        open={openToast}
        message={toastMessage}
        onClose={() => setOpenToast(false)} // Close the toast after it's shown
        autoHideDuration={5000}
      />
    </>
  );
};

export default Signup;
