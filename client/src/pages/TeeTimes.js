import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import WatchList from '../components/WatchList'
import { useQuery } from "@apollo/client";
import { GET_TEE_TIMES_BY_USER } from "../utils/queries";
import { formatDate, formatTime, getCourseName, getCourseLogo } from "../utils/helpers";
import auth from '../utils/auth'

const Home = () => {
  const handleRenderOnDelete = (id) => {
    const updatedList = teeTimes.filter(item => item.id !== id)

    setTeeTimes(updatedList)
  };

  const handleRenderOnDuplicate = (oldId, newTeeTime) => {
    const duplicated = teeTimes.filter(item => item.id === oldId)[0]
    const newItem = JSON.parse(JSON.stringify(duplicated))
    newItem.id = newTeeTime._id

    const updatedList = [...teeTimes, newItem]

    setTeeTimes(updatedList)
  };


  const userId = auth.getProfile().data._id
  const { loading, error, data } = useQuery(GET_TEE_TIMES_BY_USER, {
    variables: { userId }
  });


  const [teeTimes, setTeeTimes] = useState([]);

  useEffect(() => {
    const teeTimeData = data?.getTeeTimesByUser || [];

    const formattedTeeTimes = teeTimeData.map(item => {
      return {
        id: item._id,
        course: item.course_id,
        start_time: formatTime(item.start_time),
        date: formatDate(item.start_time),
        end_time: formatTime(item.end_time),
        num_golfers: item.number_of_players.join(',')
      }
    })

    setTeeTimes(formattedTeeTimes);
  }, [loading]);

  //used to update state and rerneder after list updates
  useEffect(() => {

  }, [teeTimes]);


  return (
    <div className="container">
      {/* <h1 class="pageHeading">Your Watch List</h1> */}
      {
        teeTimes.length ?
          teeTimes.map((teeTime, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 1 }} >
              <WatchList
                handleRenderOnDelete={handleRenderOnDelete}
                handleRenderOnDuplicate={handleRenderOnDuplicate}
                id={teeTime.id}
                course={getCourseName(teeTime.course)}
                courseLogo={getCourseLogo(teeTime.course)}
                date={teeTime.date}
                start_time={teeTime.start_time}
                end_time={teeTime.end_time}
                num_golfers={teeTime.num_golfers} />
            </Box>
          )) : <h1>No Tee Times</h1>
      }

    </div >
  );
};

export default Home;