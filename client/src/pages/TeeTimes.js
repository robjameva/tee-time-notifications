import React, { useState } from "react";
import WatchList from '../components/WatchList'

const Home = () => {
  const [teeTimes, setTeeTimes] = useState([
    {
      course: 5152,
      start_time: '6:00am',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 5153,
      start_time: '6:00am',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 5150,
      start_time: '6:00am',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 5151,
      start_time: '6:00am',
      end_time: '8:30am',
      num_golfers: 4
    },
    {
      course: 9535,
      start_time: '6:00am',
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

  return (
    <div className="container">
      <h1>Tee Times</h1>
      {teeTimes.length ?
        teeTimes.map((teeTime, index) => (
          <WatchList course={getCourseName(teeTime.course)} start_time={teeTime.start_time} end_time={teeTime.end_time} num_golfers={teeTime.num_golfers} />
        )) : <h1>No Tee Times</h1>}

    </div>
  );
};

export default Home;