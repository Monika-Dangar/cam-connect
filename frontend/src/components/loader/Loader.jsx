import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import '../../css/loader/loader.css'; // Create a CSS file for styling

const LoadingSpinner = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loadingOverlay">
          <Box className="spinnerBox">
            <CircularProgress />
          </Box>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
