let socket = io('/');
let videoGrid =  document.getElementById('video-grid');
let peer = new Peer(undefined,{
    host: '/',
    port: 3001
});

let selfVideo = document.createElement('video');
selfVideo.muted = true;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(userVideostream=>{
    addUserVideo(selfVideo,userVideostream);
    peer.on('call',call=>{
        call.answer(stream);
    })
    socket.on('user-connected',userid=>{
        connectToNewUser(userid,userVideostream);
    })
})

function connectToNewUser(userid,stream){
    const call = peer.call(userid,stream);
    const userVideo = document.createElement('video');
    call.on('stream',userVideostream=>{
        addUserVideo(userVideo,userVideostream);
    })
    call.on('close',()=>{
        video.remove();
    })
    
}

function addUserVideo(video,stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}


peer.on('open', id=>{
    socket.emit('join-room', room_id, id);
})

socket.on('user-connected',userid=>{
    console.log("user connected " + userid);
})