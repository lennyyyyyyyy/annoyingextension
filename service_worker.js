const date = new Date();
const updateTime = 1;

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == 'install') {
        chrome.storage.local.set({ screenTime: [0, 0, 0, 0] });
        chrome.storage.local.set({ giveReminders: true });
    }
});

async function updateScreenTime() {
    chrome.storage.local.get("screenTime").then((result) => {
        let time = result.screenTime;
        let changed = [0, 0, 0, 0];
        let normal = [time[0] + updateTime, time[1], time[2], time[3]];
        chrome.storage.local.get("lastOnline").then((result) => {
            let diff = date.getDate() - result.lastOnline;
            if (diff >= 0 && diff <= 3) {
                for (let i = diff; i < 4; i++) {
                    changed[i] = normal[i - diff];
                }
            }
            chrome.storage.local.set({ screenTime: changed });
        });
    });
    chrome.storage.local.set({ lastOnline: date.getDate() });
}
setInterval(updateScreenTime, updateTime * 1000);