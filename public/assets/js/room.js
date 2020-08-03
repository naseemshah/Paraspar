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
}).then(stream=>{
    addVideoStream(selfVideo,stream)
})


peer.on('open', id =>{
    socket.emit('join-room',room_id,id);
    
})

socket.on('user-connected',userid =>{
    console.log("User Connected: " + userid)
})

function addVideoStream(video,stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.appendChild(video);
}