import React from 'react'
import ChartCard from './ChartCard'
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Box, Typography } from '@mui/material';

const Notifications = [
    {
        type: 'new report',
        notification: 'Dr. Zeyad Amr added a new report'
    },
    {
        type: 'accepted report',
        notification: 'Dr. body accepted Dr. Zeyad Amr report'
    },
    {
        type: 'rejected report',
        notification: 'Dr. body rejected Dr. Zeyad Amr report'
    },
    {
        type: 'new report',
        notification: 'Dr. body added a new report'
    },
    {
        type: 'new report',
        notification: 'Dr. raouf added a new report'
    },
]

const NotificationsCard = () => {
    return (
        <ChartCard title='Notifications' icon={<NotificationsRoundedIcon sx={{color:'secondary.main'}}/>} sx={{ flexDirection: 'column' }}>
            {
                Notifications.map((notification, i) => (
                    <Box key={i} sx={{ width: '100%' }}>
                        <Typography sx={{ fontSize: '0.8rem', color: 'primary.light', mb:0.5 }}>{notification.type}</Typography>
                        <Typography sx={{ fontSize: '0.9rem', color: 'primary.main' }}>{notification.notification}</Typography>
                        {i !== Notifications.length - 1 ? <Box sx={{ width: '100%', height: '2px', backgroundColor: 'primary.lighter', margin: '0.75rem 0' }} /> : null}
                    </Box>
                ))
            }
        </ChartCard>
    )
}

export default NotificationsCard