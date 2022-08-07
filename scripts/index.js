const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const channel = urlParams.get('channel') || "stanz";
const time = urlParams.get('window') || 21;
const limit = urlParams.get('limit') || 0;
const decimals = parseInt(urlParams.get('decimals')) || 2;
const ease = parseInt(urlParams.get('ease')) || 25;
console.log(channel, time, limit, decimals, ease);

let cpm = 0.0;


let div = document.getElementById("cpm");

setInterval(() => {
    div.innerHTML = Math.abs(cpm).toFixed(decimals);

    if (cpm < limit) {
        div.classList.add("warning");
    } else {
        div.classList.remove("warning");
    }
}, 100);

// CONNECT TO TWITCH CHAT
const client = new tmi.Client({
    channels: [channel]
});

client.connect();
client.on('message', async (channel, tags, message, self) => {
    //console.log(`${tags['display-name']}: ${message}`);
    for (i = 0; i <= ease; i++) {
        setTimeout(() => {
            cpm += 60 / time / (ease + 1);
        }, time * 1000 * i / 100);
    }

    for (i = 100 - ease; i <= 100; i++) {
        setTimeout(() => {
            cpm -= 60 / time / (ease + 1);
        }, time * 1000 * i / 100);
    }
});
