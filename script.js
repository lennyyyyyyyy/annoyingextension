const cc = document.getElementsByClassName("cc");
const stTab = document.getElementById("screentime");
const settingsTab = document.getElementById("settings");
const secondsInDay = 60 * 60 * 24;

function showScreenTime() {
    stTab.style.display = "block";
}
function hideScreenTime() {
    stTab.style.display = "none";
}
function showSettings() {
    settingsTab.style.display = "block";
    document.body.style.height = "400px";
}
function hideSettings() {
    settingsTab.style.display = "none";
    document.body.style.height = "300px";
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
function updateComments() {
    chrome.storage.local.get(["screenTime", "customcomments"]).then((result) => {
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
            document.getElementById("suggestion").innerText = result.customcomments[0];
        } else if (times[0] < 60 * 60) {
            document.getElementById("suggestion").innerText = result.customcomments[1];
        } else if (times[0] < 2 * 60 * 60) {
            document.getElementById("suggestion").innerText = result.customcomments[2];
        } else if (times[0] < 4 * 60 * 60) {
            document.getElementById("suggestion").innerText = result.customcomments[3];
        } else if (times[0] < 8 * 60 * 60) {
            document.getElementById("suggestion").innerText = result.customcomments[4];
        } else {
            document.getElementById("suggestion").innerText = result.customcomments[5];
        }
    });
}
setInterval(updateComments, 1000);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("screentimebutton").addEventListener("click", showScreenTime);
    document.getElementById("exitscreentime").addEventListener("click", hideScreenTime);
    document.getElementById("settingsbutton").addEventListener("click", showSettings);
    document.getElementById("exitsettings").addEventListener("click", hideSettings);
});

// set goals and reminder prefrences
{
    // set screen time goal
    chrome.storage.local.get("goal").then((result) => {
        document.getElementById("goal").value = result.goal;
    });
    document.getElementById("goal").addEventListener("input", () => {
        chrome.storage.local.set({ goal: document.getElementById("goal").value });
    });
    // set text replacement checkbox
    chrome.storage.local.get("replaceBool").then((result) => {
        document.getElementById("replacetoggle").checked = result.replaceBool;
    });
    document.getElementById("replacetoggle").addEventListener("click", () => {
        chrome.storage.local.set({ replaceBool: document.getElementById("replacetoggle").checked });
    });
    // set text replacement text
    chrome.storage.local.get("replaceText").then((result) => {
        document.getElementById("replacetext").value = result.replaceText;
    });
    document.getElementById("replacetext").addEventListener("input", () => {
        chrome.storage.local.set({ replaceText: document.getElementById("replacetext").value });
    });
    // set alert checkbox
    chrome.storage.local.get("alertBool").then((result) => {
        document.getElementById("alerttoggle").checked = result.alertBool;
    });
    document.getElementById("alerttoggle").addEventListener("click", () => {
        chrome.storage.local.set({ alertBool: document.getElementById("alerttoggle").checked });
    });
    // set alert text
    chrome.storage.local.get("alertText").then((result) => {
        document.getElementById("alerttext").value = result.alertText;
    });
    document.getElementById("alerttext").addEventListener("input", () => {
        chrome.storage.local.set({ alertText: document.getElementById("alerttext").value });
    });
    // set alert frequency
    chrome.storage.local.get("alertFreq").then((result) => {
        document.getElementById("alertfreq").value = result.alertFreq;
    });
    document.getElementById("alertfreq").addEventListener("input", () => {
        chrome.storage.local.set({ alertFreq: document.getElementById("alertfreq").value });
    });
    // set custom comments
    chrome.storage.local.get("customcomments").then((result) => {
        for (let i = 0; i < 6; i++) {
            cc[i].value = result.customcomments[i];
        }
    });
    for (let i = 0; i < 6; i++) {
        cc[i].addEventListener("input", () => {
            chrome.storage.local.get("customcomments").then((result) => {
                result.customcomments[i] = cc[i].value;
                chrome.storage.local.set({ customcomments: result.customcomments });
            });
        });
    }
}
// setting hover descriptions 
const settings = document.getElementsByClassName("setting");
const descriptions = document.getElementsByClassName("desc");
for (let i = 0; i < 4; i++) {
    settings[i].addEventListener("mouseover", () => {
        descriptions[i].style.top = "90%";
    });
    settings[i].addEventListener("mouseout", () => {
        descriptions[i].style.top = "100%";
    });
}