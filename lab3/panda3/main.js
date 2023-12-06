//adding event listener when key is pressed trigger onkeypress function
document.addEventListener('keypress', onKeyPress)

//define arrays for each channel for stroing melodies
const melodyKeysChannel1 = [];
const melodyKeysChannel2 = [];
const melodyKeysChannel3 = [];
const melodyKeysChannel4 = [];

// Default channel is 1
let currentChannel = 1; 

//get the first channel button and add active-channel class to it
const currentChannelBtn = document.getElementById(`channel1Btn`); 
currentChannelBtn.classList.add('active-channel');


//map keys to sounds
const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4')
}

//get the sound from the key and play it than save key of the event to the channel array
function onKeyPress(event) {
    const sound = KeyToSound[event.key];
    
    if (sound) {
        playSound(sound);
        saveMelody(event.key, currentChannel);
    }
}

//play sound
function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

//save melody in the right cahnnel array by key
function saveMelody(key, channel) {
    const currentMelodyKeys = getMelodyKeysArrayByChannel(channel);
    currentMelodyKeys.push(key);
}

//get the melody array by channel
function getMelodyKeysArrayByChannel(channel) {
    switch (channel) {
        case 1:
            return melodyKeysChannel1;
        case 2:
            return melodyKeysChannel2;
        case 3:
            return melodyKeysChannel3;
        case 4:
            return melodyKeysChannel4;
        default:
            return [];
    }
}

//get the channels buttons and trigger changeChannel function when clicked
document.getElementById('channel1Btn').addEventListener('click', () => changeChannel(1));
document.getElementById('channel2Btn').addEventListener('click', () => changeChannel(2));
document.getElementById('channel3Btn').addEventListener('click', () => changeChannel(3));
document.getElementById('channel4Btn').addEventListener('click', () => changeChannel(4));

//get the play channels buttons and trigger playmelodybychannel function when clicked
document.getElementById('playChannel1Btn').addEventListener('click', () => playMelody(1));
document.getElementById('playChannel2Btn').addEventListener('click', () => playMelody(2));
document.getElementById('playChannel3Btn').addEventListener('click', () => playMelody(3));
document.getElementById('playChannel4Btn').addEventListener('click', () => playMelody(4));

//get play all channels button and trigger playAllChannels function when clicked
document.getElementById('playAllChannelsBtn').addEventListener('click', playAllChannels);

//change channel function with css
function changeChannel(channel) {
    currentChannel = channel; //sets current cahnnel to new cahnnel

    //loop through all channels(4)
    for (let i = 1; i <= 4; i++) {
        const channelBtn = document.getElementById(`channel${i}Btn`); //get the button corresponding to the (i) channel
        channelBtn.classList.remove('active-channel'); //remove the active-channel class from all channel buttons

    }

    const currentChannelBtn = document.getElementById(`channel${channel}Btn`);
    currentChannelBtn.classList.add('active-channel');
}

//play melody by channel function
function playMelody(channel) {
    const melodyKeys = getMelodyKeysArrayByChannel(channel);
    const playMelodyInterval = setInterval(() => {
        if (melodyKeys.length === 0) {
            clearInterval(playMelodyInterval);
        } else {
            const key = melodyKeys.shift();
            const sound = KeyToSound[key];
            if (sound) {
                playSound(sound);
            }
        }
    }, 300);
}

//play all channels function
function playAllChannels() {
    playMelody(1);
    playMelody(2);
    playMelody(3);
    playMelody(4);
}

