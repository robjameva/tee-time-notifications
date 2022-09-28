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
import { useMutation } from '@apollo/client';
import { DELETE_TEETIME, DUPLICATE_TEETIME } from '../../utils/mutations';

export default function MediaControlCard({ handleRenderOnDelete, handleRenderOnDuplicate, id, course, courseLogo, date, start_time, end_time, num_golfers }) {
    const [deleteTeetime] = useMutation(DELETE_TEETIME);
    const [duplicateTeetime] = useMutation(DUPLICATE_TEETIME);

    const handleDelete = async (event, id) => {
        event.preventDefault();

        try {
            const { data } = await deleteTeetime({ variables: { id } });
            handleRenderOnDelete(id)
        } catch (e) {
            console.error(e);
        }
    };

    const handleDuplicate = async (event, id,) => {
        event.preventDefault();

        try {
            const { data } = await duplicateTeetime({ variables: { id } });
            handleRenderOnDuplicate(id, data.duplicateTeeTime)
            // console.error('id: ', id);
            // console.error('data.duplicateTeeTime: ', data.duplicateTeeTime);

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Card sx={{ display: 'flex', width: '95%', 'justifyContent': 'space-between', 'boxShadow': '1px 1px 10px -1px' }} variant="outlined">
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {course}
                    </Typography>
                    <Typography component="div" variant="h6">
                        {date}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {start_time} - {end_time}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {num_golfers} golfers
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="edit">
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton aria-label="duplicate" onClick={(event) => handleDuplicate(event, id)}>
                        <CopyAllIcon color="warning" />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={(event) => handleDelete(event, id)} >
                        <DeleteForeverIcon color="error" />
                    </IconButton>
                </Box>
            </Box>
            <div className='courseLogo'>
                <CardMedia
                    component="img"
                    sx={{ width: 135, height: 135, backgroundColor: 'success.light', 'objectFit': 'contain', 'borderRadius': '3%' }}
                    image={courseLogo}
                    alt="Live from space album cover"
                />
            </div>
        </Card>
    );
}
