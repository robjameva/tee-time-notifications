import React, { useState, useRef, useEffect } from "react";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { Button, ButtonGroup, Autocomplete, Box, TextField, Stack } from "@mui/material";
import { useMutation } from '@apollo/client';
import { CREATE_TEETIME } from '../../utils/mutations';

function AddTeeTime({ desktop }) {
  const dateInputRef = useRef(null);

  useEffect(() => {
    let dateValue = dateInputRef.current.querySelector('input').value;
    setDateValue(dateValue);
  }, []);

  const [date, setDateValue] = useState(dayjs().add(1, 'day').hour(0).minute(0));
  const [startTime, setStartTimeValue] = useState(dayjs().add(1, 'day').hour(7).minute(0));
  const [endTime, setEndTimeValue] = useState(dayjs().add(1, 'day').hour(9).minute(0));
  const [course, setCourse] = useState('');
  const [players, setPlayers] = useState([]);

  // TODO: Make Dynamic
  const courses = [
    {
      "id": 5150,
      "course": "Birkshire Valley"
    },
    {
      "id": 5151,
      "course": "Flanders B/W"
    },
    {
      "id": 5152,
      "course": "Pinch Brook"
    },
    {
      "id": 5153,
      "course": "Sunset Valley"
    },
    {
      "id": 9535,
      "course": "Flanders R/G"
    },
  ];

  const [createTeetime] = useMutation(CREATE_TEETIME);


  const handleCreate = async (event) => {
    event.preventDefault();

    let day = dayjs(date).format('YYYY-MM-DD')
    let start_hour = startTime.format('HH')
    let start_minute = startTime.format('mm')
    let start_time = formatDate(day, start_hour, start_minute)

    let end_hour = endTime.format('HH')
    let end_minute = endTime.format('mm')
    let end_time = formatDate(day, end_hour, end_minute)

    console.log('startTime: ', start_time)
    console.log('endTime: ', end_time)
    console.log('course: ', course)
    console.log('players: ', players)

    try {
      const { data } = await createTeetime({
        variables: {
          input: {
            course_id: course,
            start_time: start_time,
            end_time: end_time,
            number_of_players: players,
            user: "630280d9e88a3635cd76cf7c",
            // priority: 10,
          }
        }
      });

    } catch (e) {
      console.error(e);
    }
  };

  const handleDateChange = (newValue) => {
    // setDateValue(newValue.format('MM/DD/YYYY'));
    setDateValue(newValue);
  };

  const handleStartTimeChange = (newValue) => {
    setStartTimeValue(newValue);
  }

  const handleEndTimeChange = (newValue) => {
    setEndTimeValue(newValue);
  }

  const handleCourseChange = (newValue) => {
    setCourse(newValue.target.value);
  }

  const handlePlayerCountChange = (value) => {
    if (players.includes(value)) {
      setPlayers(players.filter(player => player !== value));
    } else {
      setPlayers(players.concat(value));
    }
  }

  const formatDate = (day, hour, minute) => {
    return `${day}T${hour}:${minute}:00.000Z`
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3, marginBottom: 3 }} >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{ width: '80%', maxWidth: '400px' }}>
          {desktop &&
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              minDate={dayjs().add(1, 'day')}
              maxDate={dayjs().add(7, 'day')}
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} ref={dateInputRef} />}
            />
          }
          {!desktop &&
            <MobileDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              minDate={dayjs().add(1, 'day')}
              maxDate={dayjs().add(7, 'day')}
              value={date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} ref={dateInputRef} />}
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
          <FormControl fullWidth>
            <InputLabel id="course-select">Course</InputLabel>
            <Select
              labelId="course-select"
              id="demo-simple-select"
              label="Course"
              value={course}
              onChange={handleCourseChange}
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography gutterBottom>Golfers</Typography>
          <ButtonGroup fullWidth={true} variant="outlined" aria-label="outlined primary button group">
            <Button onClick={() => handlePlayerCountChange(1)} variant={players.includes(1) ? 'contained' : 'outlined'}>One</Button>
            <Button onClick={() => handlePlayerCountChange(2)} variant={players.includes(2) ? 'contained' : 'outlined'}>Two</Button>
            <Button onClick={() => handlePlayerCountChange(3)} variant={players.includes(3) ? 'contained' : 'outlined'}>Three</Button>
            <Button onClick={() => handlePlayerCountChange(4)} variant={players.includes(4) ? 'contained' : 'outlined'}>Four</Button>
          </ButtonGroup>
          <Button onClick={handleCreate} variant="outlined" startIcon={<SearchIcon />}>
            Start Searching
          </Button>
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}

export default AddTeeTime;