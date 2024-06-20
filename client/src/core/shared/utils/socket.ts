// utils/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000', {
    query: {
        userId: 'user123', // dynamically set the user ID here
    },
    transports: ['websocket', 'polling'], // specify transports
});

export default socket;
