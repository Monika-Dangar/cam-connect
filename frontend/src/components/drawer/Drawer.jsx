import '../../css/drawer/drawer.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SelectTextFields from '../textField/TextField';
import BasicDatePicker from '../datePicker/DatePicker';
import TuneIcon from '@mui/icons-material/Tune';
import { getAllTags, getAllDevices, filterImages } from '../../services/galleryServices';

export default function AnchorTemporaryDrawer({ setFilteredImages }) {
  const [state, setState] = useState({ right: false });
  const [selectDevice, setSelectDevice] = useState([]);
  const [selectTag, setSelectTag] = useState([]);
  const [selectStartDate, setSelectStartDate] = useState(null);
  const [selectEndDate, setSelectEndDate] = useState(null);
  const [allTags, setAllTags] = useState([]);
  const [allDevices, setAllDevices] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ right: open });
  };

  useEffect(() => {
    const fetchAllTags = async () => {
      const tags = await getAllTags();
      setAllTags(tags.response);

      const devices = await getAllDevices();
      setAllDevices(devices.devices);
      setAllDevices(devices.sharedDeviceWithMe);
    };
    fetchAllTags();
  }, []);

  const handleReset = () => {
    setSelectDevice([]);
    setSelectTag([]);
    setSelectStartDate(null);
    setSelectEndDate(null);
    setState({ right: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await filterImages(selectTag, selectDevice, selectStartDate, selectEndDate);

    if (response) {
      console.log(response);
      setFilteredImages(response.response); // Update the images in the Gallery component
      setState({ right: false });
    }
  };

  const list = () => (
    <>
      <main className="filterContainer">
        <p className="mainText">Filtration</p>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <SelectTextFields
              inputValue={selectDevice}
              setValue={setSelectDevice}
              labelText={'Devices'}
              defaultValueText={'All devices'}
              type={'AllDevices'}
              data={allDevices}
            />
            <SelectTextFields
              inputValue={selectTag}
              setValue={setSelectTag}
              labelText={'Tags'}
              defaultValueText={'Add tags'}
              hint={'Add tags'}
              type={'AllTags'}
              data={allTags}
            />
            <div className="w-64 ml-3">
              <p>Start Date</p>
              <BasicDatePicker inputValue={selectStartDate} setValue={setSelectStartDate} />
              <p>End Date</p>
              <BasicDatePicker inputValue={selectEndDate} setValue={setSelectEndDate} />
            </div>
          </List>
        </Box>
        <div className="buttonContainer">
          <button className="filterBtn" onClick={handleSubmit}>
            Filter
          </button>
          <button className="resetBtn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </main>
    </>
  );

  return (
    <>
      <button onClick={toggleDrawer(true)} className="filterBackground">
        <TuneIcon className="filterIcon" />
        <label htmlFor="">Filters</label>
      </button>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}
