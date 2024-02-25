chrome.runtime.sendMessage({ msg: "wakeup" });
function textInsert(chance, string) {
    const collection = document.querySelectorAll("*");
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].innerText != undefined && collection[i].innerText.length > 0) {
            let len = collection[i].innerText.length;
            if (Math.random() < chance) {
                let spot = Math.floor(Math.random() * len);
                collection[i].innerText = collection[i].innerText.slice(0, spot) + string + collection[i].innerText.slice(spot, len);
            }
        }
    }
}

chrome.storage.local.get(["replaceBool", "screenTime", "goal", "replaceText"]).then((result) => {
    if (result.replaceBool) {
        let time = result.screenTime[0];
        if (time > result.goal * 60) {
            textInsert(0.01, result.replaceText);
        }
    }
});


