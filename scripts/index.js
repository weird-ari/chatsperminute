const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const channel = urlParams.get('channel');
const time = urlParams.get('window');
console.log(channel);

let chatsPerTime = 0.0;


let div = document.getElementById("cpm");

setInterval(() => { div.innerHTML = (chatsPerTime * 60 / time).toFixed(2) }, 250);

// CONNECT TO TWITCH CHAT
const client = new tmi.Client({
    channels: [channel]
});

client.connect();
client.on('message', async (channel, tags, message, self) => {
    //console.log(`${tags['display-name']}: ${message}`);
    chatsPerTime += 1;
    setTimeout(() => {
        chatsPerTime -= 1;
    }, time * 1000);
});



