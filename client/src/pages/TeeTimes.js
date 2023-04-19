import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import WatchList from '../components/WatchList'
import { useQuery } from "@apollo/client";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Modal from '@mui/material/Modal';
import { GET_TEE_TIMES_BY_USER } from "../utils/queries";
import { formatDate, formatTime, getCourseName, getCourseLogo } from "../utils/helpers";
import auth from '../utils/auth'
import AddTeeTime from "../components/AddTeeTime";

const TeeTimes = () => {
  const [teeTimes, setTeeTimes] = useState([]);
  const [active, setActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({});


  const userId = auth.getProfile().data._id
  const { loading, error, data, refetch } = useQuery(GET_TEE_TIMES_BY_USER, {
    variables: { userId }
  });

  const toggleActive = () => {
    setActive(!active);
  };

  const toggleOpen = (event, id) => {
    handleListUpdate()
    setCurrent(teeTimes.filter(t => t.id === id)[0])
    setOpen(!open);
  };

  const handleListUpdate = async () => {
    const rawData = await refetch();
    let updatedList = formatData(rawData.data.getTeeTimesByUser);
    setTeeTimes(updatedList.filter(t => t.is_active === active))
  };

  const formatData = (teeTimeData) => {
    const formattedTeeTimes = teeTimeData.map(item => {
      return {
        id: item._id,
        course: item.course_id,
        is_active: item.is_active,
        start_time: formatTime(item.start_time),
        date: formatDate(item.start_time),
        end_time: formatTime(item.end_time),
        num_golfers: item.number_of_players.join(',')
      }
    })
    return formattedTeeTimes;
  }

  useEffect(() => {
    const teeTimeData = data?.getTeeTimesByUser || [];
    let list = formatData(teeTimeData);
    setTeeTimes(list.filter(t => t.is_active === active))
  }, [loading, active]);

  useEffect(() => {
    handleListUpdate()
  }, []);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    borderRadius: '1%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="container">
      {/* <h1 class="pageHeading">Your Watch List</h1> */}
      <Box display="flex" flexDirection="column" height="100vh" sx={{ marginBottom: '270px' }}>
        <FormControlLabel control={<Switch defaultChecked />} label="Active" sx={{ margin: 1 }} style={{ alignSelf: "center" }} onChange={toggleActive} />
        {
          teeTimes.length ?
            teeTimes.map((teeTime, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, marginBottom: 1 }} >
                <WatchList
                  handleListUpdate={handleListUpdate}
                  toggleOpen={toggleOpen}
                  id={teeTime.id}
                  course={getCourseName(teeTime.course)}
                  courseLogo={getCourseLogo(teeTime.course)}
                  date={teeTime.date}
                  start_time={teeTime.start_time}
                  end_time={teeTime.end_time}
                  num_golfers={teeTime.num_golfers}
                  active={active} />
              </Box>
            )) : <h1>No Tee Times</h1>
        }
        <Modal
          open={open}
          onClose={toggleOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddTeeTime is_edit={true} current={current} toggleOpen={toggleOpen} ></AddTeeTime>
          </Box>
        </Modal>

      </Box>

    </div >
  );
};

export default TeeTimes;