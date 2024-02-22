const collection = document.querySelectorAll("*");
for (let i = 0; i < collection.length; i++) {
    if (collection[i].innerText != undefined && collection[i].innerText.length > 0) {
        let len = collection[i].innerText.length;
        if (Math.random() < 0.01) {
            let spot = Math.floor(Math.random() * len);
            collection[i].innerText = collection[i].innerText.slice(0, spot) + "go outside" + collection[i].innerText.slice(spot, len);
        }
    }
}
