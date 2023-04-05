const firstT = document.querySelector("#firstT");
const secondT = document.querySelector("#secondT");
const thirdT = document.querySelector("#thirdT");
const workspace = document.querySelector("#workspace");
var selectedDiv = null;
var mouseDownDiv = null;
var isDown = false;
var isMoved = false;
var isDblclick = false;
var savedX = [0,0,0];
var savedY = [0,0,0];
var savedDiv = null;
var isESC = false;
var isTouch = false;
var firstFinger = [0,0];
var secondFinger = [0,0];
var distanceX=0;
var distanceY=0;
//two fingers
document.addEventListener('touchstart',(e)=>{
    if(e.touches.length===2){
        firstFinger[0]=e.touches[0].pageX;
        firstFinger[1]=e.touches[0].pageY;
        secondFinger[0]=e.touches[1].pageX;
        secondFinger[1]=e.touches[1].pageY;
    }else if(e.touches.length>2){
        isDblclick =  false;
        isDown = false;
        isMoved = false;
        mouseDownDiv = null;
        firstT.style.left = savedX[0]+'px';
        firstT.style.top = savedY[0]+'px';
        secondT.style.left = savedX[1]+'px';
        secondT.style.top = savedY[1]+'px';
        thirdT.style.left = savedX[2]+'px';
        thirdT.style.top = savedY[2]+'px';
        selectedDiv = savedDiv;
        if(selectedDiv!=null){
            selectedDiv.style.backgroundColor="00f";
        }
        isESC = true;
    }
});
document.addEventListener('touchmove',(e)=>{
    if(e.touches.length===2&&selectedDiv!=null){
        e.preventDefault();
        if(e.touches[0].pageX-e.touches[1]>0){
            distanceX = (e.touches[0].pageX-firstFinger[0])-(e.touches[1].pageX-secondFinger[0])
        }else{
            distanceX = -(e.touches[0].pageX-firstFinger[0])+(e.touches[1].pageX-secondFinger[0])
        }
        if(e.touches[0].pageY-e.touches[1]>0){
            distanceY = (e.touches[0].pageY-firstFinger[1])-(e.touches[1].pageY-secondFinger[1])
        }else{
            distanceY = (e.touches[0].pageY-firstFinger[1])-(e.touches[1].pageY-secondFinger[1])
        }
        if(distanceX*distanceX>distanceY*distanceY){
            // console.log(selectedDiv.style.width)
            // console.log("x"+distanceX)
            console.log(distanceX+parseInt(selectedDiv.style.width,10))
            selectedDiv.style.width=(distanceX+parseInt(selectedDiv.style.width,10))/20+'px';
            if(selectedDiv.style.width=(distanceX+parseInt(selectedDiv.style.width,10))/20<20){
                selectedDiv.style.width=(distanceX+parseInt(selectedDiv.style.width,10))/20+'px';
            }else{
                selectedDiv.style.width=20+'px';   
            }
        }else{
            // console.log(selectedDiv.style.width)
            // console.log("y"+distanceY)
            console.log(distanceY+parseInt(selectedDiv.style.height,10))
            selectedDiv.style.height=(distanceY+parseInt(selectedDiv.style.height,10))/20+'px';
            if((distanceY+parseInt(selectedDiv.style.height,10))/20<20){
                selectedDiv.style.height=(distanceY+parseInt(selectedDiv.style.height,10))/20+'px';
            }else{
                selectedDiv.style.height=20+'px';
            }
        }
    }
});
//dbl touch

//touch&drag
firstT.addEventListener('touchstart',(e) => {
        var touch = e.targetTouches[0];
        offset = [
            firstT.offsetLeft - touch.pageX,
            firstT.offsetTop - touch.pageY
        ];
});
secondT.addEventListener('touchstart',(e) => {
    var touch = e.targetTouches[0];
    offset = [
        secondT.offsetLeft - touch.pageX,
        secondT.offsetTop - touch.pageY
    ];
});
thirdT.addEventListener('touchstart',(e) => {
    var touch = e.targetTouches[0];
    offset = [
        thirdT.offsetLeft - touch.pageX,
        thirdT.offsetTop - touch.pageY
    ];
});
firstT.addEventListener('touchmove',(e) => {
        var touch = e.targetTouches[0];
        firstT.style.left = touch.pageX + offset[0] + 'px';
        firstT.style.top = touch.pageY + offset[1] + 'px';
});
secondT.addEventListener('touchmove',(e) => {
    var touch = e.targetTouches[0];
    secondT.style.left = touch.pageX + offset[0] + 'px';
    secondT.style.top = touch.pageY + offset[1] + 'px';
});
thirdT.addEventListener('touchmove',(e) => {
    var touch = e.targetTouches[0];
    thirdT.style.left = touch.pageX + offset[0] + 'px';
    thirdT.style.top = touch.pageY + offset[1] + 'px';
});
//esc
function savePosition() {
    savedX[0]=firstT.offsetLeft;
    savedX[1]=secondT.offsetLeft;
    savedX[2]=thirdT.offsetLeft;
    savedY[0]=firstT.offsetTop;
    savedY[1]=secondT.offsetTop;
    savedY[2]=thirdT.offsetTop;
    savedDiv = selectedDiv;
}
document.addEventListener("keydown", (e) => {
    console.log(e.key)
    if(e.key == "Escape") {
        isDblclick =  false;
        isDown = false;
        isMoved = false;
        mouseDownDiv = null;
        firstT.style.left = savedX[0]+'px';
        firstT.style.top = savedY[0]+'px';
        secondT.style.left = savedX[1]+'px';
        secondT.style.top = savedY[1]+'px';
        thirdT.style.left = savedX[2]+'px';
        thirdT.style.top = savedY[2]+'px';
        selectedDiv = savedDiv;
        if(selectedDiv!=null){
            selectedDiv.style.backgroundColor="00f";
        }
        isESC = true;
    }
});
//dblclick
firstT.addEventListener('dblclick', function(e) {
    savePosition();
    isDblclick = true;
    offset = [
        firstT.offsetLeft - e.clientX,
        firstT.offsetTop - e.clientY
    ];
    mouseDownDiv = firstT;
}, true);
secondT.addEventListener('dblclick', function(e) {
    savePosition();
    isDblclick = true;
    offset = [
        secondT.offsetLeft - e.clientX,
        secondT.offsetTop - e.clientY
    ];
    mouseDownDiv = secondT;
}, true);
thirdT.addEventListener('dblclick', function(e) {
    savePosition();
    isDblclick = true;
    offset = [
        thirdT.offsetLeft - e.clientX,
        thirdT.offsetTop - e.clientY
    ];
    mouseDownDiv = thirdT;
}, true);
// mouseDownMove
firstT.addEventListener('mousedown', function(e) {
    savePosition();
    isDown = true;
    isMoved = false;
    offset = [
        firstT.offsetLeft - e.clientX,
        firstT.offsetTop - e.clientY
    ];
    mouseDownDiv = firstT;
}, true);
secondT.addEventListener('mousedown', function(e) {
    savePosition();
    isDown = true;
    isMoved = false;
    offset = [
        secondT.offsetLeft - e.clientX,
        secondT.offsetTop - e.clientY
    ];
    mouseDownDiv = secondT;
}, true);
thirdT.addEventListener('mousedown', function(e) {
    console.log("mousedown")
    savePosition();
    isDown = true;
    isMoved = false;
    offset = [
        thirdT.offsetLeft - e.clientX,
        thirdT.offsetTop - e.clientY
    ];
    mouseDownDiv = thirdT;
}, true);
//move&end
document.addEventListener('mouseup', function() {
    isDown = false;
    isDblclick = false;
    mouseDownDiv = null;
    console.log("mouseup");
}, true);
document.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        mouseDownDiv.style.left = (mousePosition.x + offset[0]) + 'px';
        mouseDownDiv.style.top  = (mousePosition.y + offset[1]) + 'px';
        document.onmouseup = function () {
            isDown = false;
        };
    }
    if(isDblclick){
        mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        mouseDownDiv.style.left = (mousePosition.x + offset[0]) + 'px';
        mouseDownDiv.style.top  = (mousePosition.y + offset[1]) + 'px';
        document.onmouseup = function () {
            isDblclick = false;
        };
    }
    isMoved = true;
}, true);
//click&color
firstT.addEventListener("click",(e)=>{
    if(isMoved==true){
        isMoved = false;
        console.log("isMoved")
    }else{
        if(selectedDiv!=null){
            selectedDiv.style.backgroundColor="red";
        }
        selectedDiv = firstT;
        console.log(e);
        selectedDiv.style.backgroundColor = "#00f";
    }
})
secondT.addEventListener("click",(e)=>{
    if(isMoved==true){
        isMoved = false;
    }else{
        if(selectedDiv!=null){
            selectedDiv.style.backgroundColor="red";
        }
        selectedDiv = secondT;
        console.log(e);
        selectedDiv.style.backgroundColor = "#00f";
    }
})
thirdT.addEventListener("click",(e)=>{
    if(isMoved==true){
        isMoved = false;
    }else{
        if(selectedDiv!=null){
            selectedDiv.style.backgroundColor="red";
        }
        selectedDiv = thirdT;
        console.log(e);
        selectedDiv.style.backgroundColor = "#00f";
    }
})
workspace.addEventListener("click",(e)=>{
    if(e.target.id=="workspace"){
        if(isESC){
            isESC = false;
        }else{
            if(selectedDiv!=null){
                selectedDiv.style.backgroundColor="red";
            }
            console.log(e.target.id);
            selectedDiv = null;
        }
    }
})