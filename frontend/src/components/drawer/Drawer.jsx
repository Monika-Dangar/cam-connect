import '../../css/drawer/drawer.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SelectTextFields from '../textField/TextField';
import BasicDatePicker from '../datePicker/DatePicker';
import TuneIcon from '@mui/icons-material/Tune';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });
  const [selectDevices, setSelectDevices] = React.useState('');
  const [selectTags, setSelectTags] = React.useState('');
  const [selectLocation, setSelectLocation] = React.useState('');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ right: open });
  };

  const handleReset = () => {};

  const list = () => (
    <>
      <div className="flex justify-between ml-3 mr-3 mt-3 mb-3">
        <p>Filter</p>
        <button onClick={handleReset}>Reset</button>
      </div>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
      >
        <List>
          <SelectTextFields
            inputValue={selectDevices}
            labelText={'Devices'}
            defaultValueText={'All devices'}
          />
          <SelectTextFields labelText={'Tags'} defaultValueText={'Add tags'} hint={'Add tags'} />
          <SelectTextFields labelText={'Location'} defaultValueText={'location'} />
          <div className="w-56 ml-3">
            <BasicDatePicker />
          </div>
        </List>
      </Box>
    </>
  );

  return (
    <>
      <main className="drawerContainer">
        <button onClick={toggleDrawer(true)} className="filterBackground">
          <TuneIcon className="filterIcon" />
          <label htmlFor="">Filters</label>
        </button>
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>

        <button className="favoriteContainer">Favorites</button>
      </main>
    </>
  );
}
