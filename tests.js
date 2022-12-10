import { io } from 'socket.io-client';

console.log('tests.js');
const socket = io('http://192.168.31.254:8000', { transports: ['websocket'] })
socket.emit("TEST", 'it me',data=>{
    console.log('server res: ',data);
})