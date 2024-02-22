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

chrome.storage.local.get("giveReminders").then((result) => {
    let giveReminders = result.giveReminders;
    if (giveReminders) {
        chrome.storage.local.get("screenTime").then((result2) => {
            let time = result2.screenTime[0];
            if (time > 4 * 60 * 60) {
                if (time < 6 * 60 * 60) {
                    textInsert(0.01, " go outside ");
                } else if (time < 8 * 60 * 60) {
                    textInsert(0.02, " take a shower ");
                    textInsert(0.02, " pls go outside ");
                } else {
                    textInsert(0.1, " TAKE A SHOWER ");
                    textInsert(0.1, " GO OUTSIDE ");
                }
            }
        });
    }
});


