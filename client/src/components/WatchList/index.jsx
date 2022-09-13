import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import sunset from '../../assets/images/sunset.png'

export default function MediaControlCard({ course, start_time, end_time, num_golfers }) {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, marginBottom: 1 }} >
            <Card sx={{ display: 'flex' }} variant="outlined">
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h4">
                            {course}
                        </Typography>
                        <Typography component="div" variant="h5">
                            {start_time}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {start_time}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {end_time}
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="edit">
                            <EditIcon color="primary" />
                        </IconButton>
                        <IconButton aria-label="duplicate">
                            <CopyAllIcon color="warning" />
                        </IconButton>
                        <IconButton aria-label="delete">
                            <DeleteForeverIcon color="error" />
                        </IconButton>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151, backgroundColor: 'success.light', 'object-fit': 'contain' }}
                    image={sunset}
                    alt="Live from space album cover"
                />
            </Card>
        </Box>
    );
}
