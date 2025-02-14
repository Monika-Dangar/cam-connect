import React from 'react';
import { Snackbar, Slide } from '@mui/material';

function TransitionsSnackbar({ open, message, onClose, autoHideDuration }) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      TransitionComponent={(props) => <Slide {...props} direction="down" />}
      message={message}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    />
  );
}

export default TransitionsSnackbar;
