const date = new Date();
const updateTime = 1;

function setDefault(name, def) {
    chrome.storage.local.get(name).then((result) => {
        if (result[name] == undefined) {
            let obj = {};
            obj[name] = def;
            chrome.storage.local.set(obj);
        }
    });
}

// set defaults in storage
setDefault("screenTime", [0, 0, 0, 0]);
setDefault("lastOnline", date.getDate());
setDefault("goal", 240);
setDefault("replaceBool", false);
setDefault("replaceText", "");
setDefault("alertBool", false);
setDefault("alertText", "");
setDefault("alertFreq", 10);
setDefault("customcomments", ["", "", "", "", "", ""]);


function updateScreenTime() {
    chrome.storage.local.get(["screenTime", "lastOnline", "goal", "alertBool", "alertText", "alertFreq"]).then((result) => {
        let time = result.screenTime;
        let changed = [0, 0, 0, 0];
        let normal = [time[0] + updateTime, time[1], time[2], time[3]];
        let diff = date.getDate() - result.lastOnline;
        if (diff >= 0 && diff <= 3) {
            for (let i = diff; i < 4; i++) {
                changed[i] = normal[i - diff];
            }
        }
        chrome.storage.local.set({ screenTime: changed });
        chrome.storage.local.set({ lastOnline: date.getDate() });

        // alerts
        if (result.alertBool && time[0] >= result.goal * 60 && (time[0] - result.goal * 60) % (result.alertFreq * 60) == 0) {
            chrome.notifications.create({
                type: "basic",
                iconUrl: "icon.png",
                message: result.alertText,
                requireInteraction: true,
                title: "Screen Time Alert!",
                priority: 2
            });
        }
    });
}
setInterval(updateScreenTime, updateTime * 1000);