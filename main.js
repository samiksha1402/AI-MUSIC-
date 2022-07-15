song1="";
song2="";
song1_status= "";
song2_status= "";
scorerightWrist = 0;
scoreleftWrist = 0;
rightWristY = 0;
rightWristX= 0;
leftWristY = 0;
leftWristX= 0;

function setup(){
canvas= createCanvas(600,500);
canvas.center();

video= createCapture(VIDEO);
video.hide();

poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);
}

function preload(){
    song1=loadSound("double take audio.mp3");
    song2=loadSound("dandelions.mp3");
}
function draw(){
    image(video,0,0,600,500);
    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();
    fill('#FF0000');
    stroke('#FF0000');
    if(scoreleftWrist>0.2){
     circle(leftWristX,leftWristY,30);
     song2.stop();
     if(song1_status==false){
        song1.play();
        document.getElementById("song").innerHTML= "Playing: double take by dhruv";
     }
    }
    if(scorerightWrist>0.2){
     circle(rightWristX,rightWristY,30);
     song1.stop();
     if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML= "Playing: dandelions by Ruth B";
     }
    }
}
function play(){
    song.play();
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        scorerightWrist= results[0].pose.keypoints[10].score;
        scoreleftWrist= results[0].pose.keypoints[9].score;
    }
}