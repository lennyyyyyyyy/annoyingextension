function showScreenTime() {
    document.getElementById("screentime").style.display = "block";
}
function hideScreenTime() {
    document.getElementById("screentime").style.display = "none";
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("screentimebutton").addEventListener("click", showScreenTime);
    document.getElementById("exitscreentime").addEventListener("click", hideScreenTime);
});

