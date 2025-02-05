const messages = {
  validation: `Enter a valid input .Spaces are not allowed`,
  createSuccess: 'Created',
  fieldCheck: 'Enter all the fields',
  createError: 'Creation Failed .Unable to process request',
  createMessage: "You haven't added any devices yet. Click 'Create' to create one!",
  readError: 'Failed to read device',
  updateSuccess: 'Device updated successfully',
  updateError: 'No changes detected ,data remains the same',
  deleteSuccess: 'Device deleted successfully',
  deleteError: 'Failed to delete device',
  feedEmpty: 'Your feed is empty',
  serverError: 'Something went wrong, please try again later.',
  signUpSuccess: 'Signup successful',
  signInSuccess: 'Login successful',
  tokenNotVerified: 'Token not verified',
  usernameExists: 'Username already exists!',
  emailExists: 'Email already exists!',
  userNotFound: "User doesn't exist!",
  invalidPassword: 'Invalid password!',
  auth: {
    inValidToken: 'Invalid Token',
    tokenMissing: 'Authorization token missing or invalid',
    missing: 'Username or password is missing.',
    hashingError: 'Error in hashing password!',
    missingPassword: 'Password is not given!',
  },
};
export default messages;
