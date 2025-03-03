import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function SelectTextFields({
  inputValue,
  setValue,
  labelText,
  defaultValueText,
  hint,
  type,
  data,
}) {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-select-currency"
        select
        label={labelText}
        defaultValue={defaultValueText}
        placeholder={hint}
        value={inputValue}
        onChange={(e) => setValue(e.target.value)}
        SelectProps={{
          multiple: true,
          renderValue: (selected) => selected.join(', '),
        }}
      >
        {type == 'AllDevices'
          ? data?.map((option) => (
              <MenuItem key={option._id} value={option.deviceId._id}>
                {option.deviceId.deviceName}
              </MenuItem>
            ))
          : data?.map((option, idx) => (
              <MenuItem key={idx} value={option._id}>
                {option._id}
              </MenuItem>
            ))}
      </TextField>
    </Box>
  );
}
