import React, { useState } from "react";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Button, ButtonGroup, Autocomplete, Box, TextField, Stack } from "@mui/material";

function AddTeeTime({ desktop }) {
  // const [startTime, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [date, setDateValue] = useState(dayjs());
  const [startTime, setStartTimeValue] = useState(dayjs());
  const [endTime, setEndTimeValue] = useState(dayjs());

  // TODO: Make Dynamic
  const courses = ["Sunset Valley", "Birkshire Valley", "Pinch Brook", "Flanders R/G", "Flanders B/W"];

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
  };

  const handleStartTimeChange = (newValue) => {
    console.log(newValue);
    setStartTimeValue(newValue);
  }

  const handleEndTimeChange = (newValue) => {
    console.log(newValue);
    setEndTimeValue(newValue);
  }

  const buttonClick = (event) => {
    console.log(event);
    let button = event.target;
    button.variant = 'outlined';
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginBottom: 3 }} >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{ width: '80%', maxWidth: '400px' }}>
          {desktop &&
            <DesktopDatePicker
              label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          }
          {!desktop &&
            <MobileDatePicker
              label="Date mobile"
              inputFormat="MM/DD/YYYY"
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          }
          <TimePicker
            label="Earliest Tee Time"
            value={startTime}
            onChange={handleStartTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Latest Tee Time"
            value={endTime}
            onChange={handleEndTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Autocomplete
            id="tags-outlined"
            options={courses}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Course"
                placeholder="Select a course"
              />
            )}
          />
          <ButtonGroup aria-label="outlined button group">
            <Button variant="contained" onClick={buttonClick}>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
            <Button>Four</Button>
          </ButtonGroup>
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}

export default AddTeeTime;