import React, { useState } from "react";
import Box from '@mui/material/Box';
import WatchList from '../components/WatchList'
import sunsetLogo from '../assets/images/sunset.png'
import birkshireLogo from '../assets/images/birkshire.png'
import pinchBrookLogo from '../assets/images/pinchBrook.png'
import flandersLogo from '../assets/images/flanders.png'

const Home = () => {
  const [teeTimes, setTeeTimes] = useState([
    {
      course: 5152,
      start_time: '6:00am',
      date: 'Sun, Sept 18th',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 5153,
      start_time: '6:00am',
      date: 'Sun, Sept 18th',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 5150,
      start_time: '6:00am',
      date: 'Sun, Sept 18th',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 5151,
      start_time: '6:00am',
      date: 'Sun, Sept 18th',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 9535,
      start_time: '6:00am',
      date: 'Sun, Sept 18th',
      end_time: '8:30am',
      num_golfers: 4
    },
  ]);

  function getCourseName(courseID) {
    switch (courseID) {
      case 5151:
        return 'Flanders B/W';
      case 9535:
        return 'Flanders R/G';
      case 5150:
        return 'Birkshire Valley';
      case 5153:
        return 'Sunset Valley';
      case 5152:
        return 'Pinch Brook';
      default:
        return 'Undefined Course';
    }
  }

  function getCourseLogo(courseID) {
    switch (courseID) {
      case 5151:
        return flandersLogo;
      case 9535:
        return flandersLogo;
      case 5150:
        return birkshireLogo;
      case 5153:
        return sunsetLogo;
      case 5152:
        return pinchBrookLogo;
      default:
        return 'Undefined Course';
    }
  }

  return (
    <div className="container">
      <h1>Tee Times</h1>
      {teeTimes.length ?
        teeTimes.map((teeTime, index) => (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 1 }} >
            <WatchList course={getCourseName(teeTime.course)} courseLogo={getCourseLogo(teeTime.course)} date={teeTime.date} start_time={teeTime.start_time} end_time={teeTime.end_time} num_golfers={teeTime.num_golfers} />
          </Box>
        )) : <h1>No Tee Times</h1>}

    </div>
  );
};

export default Home;