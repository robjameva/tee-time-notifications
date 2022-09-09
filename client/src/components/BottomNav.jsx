import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';


export default function FixedBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const ref = React.useRef(null);


    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Add" icon={<AddCircleIcon />} />
                    <BottomNavigationAction label="Tee Times" icon={<GolfCourseIcon />} />
                    <BottomNavigationAction label="Account" icon={<PersonIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}

