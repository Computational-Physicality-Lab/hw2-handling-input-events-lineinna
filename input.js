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
//touch&drag
firstT.addEventListener('touchmove',(e) => {
    var touch = e.targetTouches[0];
    firstT.style.left = touch.pageX + 'px';
    firstT.style.top = touch.pageY + 'px';
});
secondT.addEventListener('touchmove',(e) => {
    var touch = e.targetTouches[0];
    secondT.style.left = touch.pageX + 'px';
    secondT.style.top = touch.pageY + 'px';
});
thirdT.addEventListener('touchmove',(e) => {
    var touch = e.targetTouches[0];
    thirdT.style.left = touch.pageX + 'px';
    thirdT.style.top = touch.pageY + 'px';
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