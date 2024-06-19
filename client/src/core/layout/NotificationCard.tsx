import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
interface NotificationCardProps {
    type: string;
    body: string;
    time: string;
}

const NotificationCard: React.FC<{ notification: NotificationCardProps }> = ({ notification }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ color: 'secondary.main', mr:2 }}>
                {notification.type === 'Add Report' ? <AddRoundedIcon /> :
                    (notification.type === 'Accept Report' ? <CheckRoundedIcon /> :
                        <CampaignRoundedIcon />)}
            </Box>
            <Box sx={{width:'100%'}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.8rem', color: 'primary.light' }}>{notification.type}</Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'primary.light' }}>{notification.time}</Typography>
                </Box>
                <Typography sx={{ fontSize: '0.8rem', color: 'primary.main' }}>{notification.body}</Typography>
            </Box>
        </Box>
    );
};

export default NotificationCard;
