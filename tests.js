import { io } from 'socket.io-client';

console.log('tests.js');
const socket = io('http://1220295-cj30407.tw1.ru', { transports: ['websocket'] })
socket.emit("TEST", 'it me',data=>{
    console.log('server res: ',data);
})