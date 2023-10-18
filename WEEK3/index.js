// CODE FOR SLIDESHOW
let i = 0;
let images = [];
const time = 4000;
images = [
    "images/1.png",
    "images/2.png",
    "images/3.jpeg",
    "images/4.jpeg",
    "images/5.jpeg",
    "images/6.jpeg",
    "images/7.jpeg"
];

function changesource (){
    let slide = document.getElementsByName('slide')[0];
    slide.src = images[i];
    i = (i+1)% images.length;
};
setInterval(changesource, time);
window.onload = function(){
    changesource();
};