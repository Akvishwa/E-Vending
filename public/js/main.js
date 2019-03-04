console.log("connected");
var button = document.getElementById("event");

button.addEventListener("click", function(btn){
    console.log("Star Clicked");
    btn.classList.toggle("glyphicon-star-empty");
    btn.classList.toggle("glyphicon-star");
});