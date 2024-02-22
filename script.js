function showScreenTime() {
    document.getElementById("screentime").style.display = "block";
}
function hideScreenTime() {
    document.getElementById("screentime").style.display = "none";
}
function showSettings() {
    document.getElementById("settings").style.display = "block";
}
function hideSettings() {
    document.getElementById("settings").style.display = "none";
}

function secondsToTime(seconds) {
    return Math.floor((seconds / 3600)) + " hours, " + Math.floor((seconds / 60) % 60) + " minutes, " + (seconds % 60) + " seconds";
}

function getSecondsToday() {
    let now = new Date();

    // create an object using the current day/month/year
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let diff = now - today; // ms difference
    return Math.round(diff / 1000); // make seconds
}

const secondsInDay = 60 * 60 * 24;

function updateScreenTime() {
    chrome.storage.local.get("screenTime").then((result) => {
        let times = result.screenTime;
        document.getElementById("before1time").innerText = secondsToTime(times[0]);
        document.getElementById("before2time").innerText = secondsToTime(times[1]);
        document.getElementById("before3time").innerText = secondsToTime(times[2]);
        document.getElementById("before4time").innerText = secondsToTime(times[3]);
        document.getElementById("proportion1").style.width = times[0] * 100 / getSecondsToday() + "%";
        document.getElementById("proportion2").style.width = times[1] * 100 / secondsInDay + "%";
        document.getElementById("proportion3").style.width = times[2] * 100 / secondsInDay + "%";
        document.getElementById("proportion4").style.width = times[3] * 100 / secondsInDay + "%";
        if (times[0] < 30 * 60) {
            document.getElementById("suggestion").innerText = ":) im so proud of u";
        } else if (times[0] < 60 * 60) {
            document.getElementById("suggestion").innerText = "at least ur getting work done ig";
        } else if (times[0] < 2 * 60 * 60) {
            document.getElementById("suggestion").innerText = "im not mad at u just stay off yt";
        } else if (times[0] < 4 * 60 * 60) {
            document.getElementById("suggestion").innerText = "try looking out ur window";
        } else if (times[0] < 6 * 60 * 60) {
            document.getElementById("suggestion").innerText = "go outside go outside go outside";
        } else if (times[0] < 8 * 60 * 60) {
            document.getElementById("suggestion").innerText = "bro go take a shower";
        } else {
            document.getElementById("suggestion").innerText = "...";
        }
    });
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("screentimebutton").addEventListener("click", showScreenTime);
    document.getElementById("exitscreentime").addEventListener("click", hideScreenTime);
    document.getElementById("settingsbutton").addEventListener("click", showSettings);
    document.getElementById("exitsettings").addEventListener("click", hideSettings);
});
setInterval(updateScreenTime, 1000);

// set checkbox to whatever it is
chrome.storage.local.get("giveReminders").then((result) => {
    document.getElementById("remindertoggle").checked = result.giveReminders;
});

document.getElementById("remindertoggle").addEventListener("click", () => {
    chrome.storage.local.set({ giveReminders: document.getElementById("remindertoggle").checked });
});

