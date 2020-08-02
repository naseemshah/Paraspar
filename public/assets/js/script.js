let newMeetingBtn = document.getElementById('newMeetingBtn');
let meetingIdResult = document.getElementById('meetingIdResult');
let gotoMeetingbtn = document.getElementById('gotoMeetingbtn');
let joinMeetBtn = document.getElementById('joinMeetBtn');

gotoMeetingbtn.style.display = 'none';
let meetingId = undefined;

newMeetingBtn.addEventListener('click',()=>{
    fetch('/getMeetingId').then((res)=>{
        res.text().then((data)=>{
            meetingId = data;
            meetingIdResult.innerHTML = `<strong>Meeting Id:</strong>${meetingId}`;
            gotoMeetingbtn.style.display = 'unset';
        });
    }); 
    console.log(meetingId);
});