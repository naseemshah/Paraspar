const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {v4: uuid4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.get('/getMeetingId',(req,res)=>{
    res.send(uuid4());
});

app.get('/meet/:roomid',(req,res)=>{
    res.render('room.ejs',{roomid: req.params.roomid})
});

io.on('connection',(socket)=>{
    socket.on('join-room',(roomid, userid)=>{
        socket.join(roomid);
        socket.to(roomid).broadcast.emit('user-connected',userid);
    
    })

});

server.listen(3000);