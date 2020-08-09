let socket = io('/');
let videoGrid =  document.getElementById('video-grid');
let peer = new Peer(undefined,{
    host: '/',
    port: 3001
});

let selfVideo = document.createElement('video');
selfVideo.muted = true;

const peers = {};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream=>{
    addVideoStream(selfVideo,stream)
    socket.on('user-connected',userid =>{
        console.log("User connected: ",userid)
        connectToNewUser(userid, stream);
    })
    peer.on('call', call=>{
        let video = document.createElement('video');
        call.answer(stream);
        call.on('stream', userVideoStream =>{
            addVideoStream(video,userVideoStream);
        })
        
    });
})




peer.on('open', id =>{
    socket.emit('join-room',room_id,id);
    
})


function addVideoStream(video,stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video);
}

function connectToNewUser(userid, stream){
    let call = peer.call(userid, stream);
    let userVideo = document.createElement('video');
    call.on('stream', userVideoStream =>{
        addVideoStream(userVideo,userVideoStream);
    })

    call.on('close',()=>{
        userVideo.remove();
    })
}
