// document.addEventListener('keypress', onKeyPress)

// const melodyKeys = []

// const KeyToSound = {
//     'a': document.querySelector('#s1'),
//     's': document.querySelector('#s2'),
//     'd': document.querySelector('#s3'),
//     'f': document.querySelector('#s4')
// }

// function onKeyPress(event) {
//     //we are trying to access value that is under key 'a' for example
//     const sound = KeyToSound[event.key] // if pressed a than event.key = a
//     playSound(sound)
//     melodyKeys.push(event.key)
// }
// function playSound(sound) {
//     sound.currentTime = 0
//     sound.play()
// }
// //PLAYING MELODY

// const playMelodyBtn = document.getElementById('playMelodyBtn')
// // 
// playMelodyBtn.addEventListener('click', playMelody)

// function playMelody() {
//     //repeat the function with set interval until array is 0 - setinterval
//     const playMelodyInterval = setInterval(() => {
//         //if array empty than clear interval
//         if (melodyKeys.length === 0) {
//             clearInterval(playMelodyInterval);
//         } else {
//             //get first key from array
//             const key = melodyKeys.shift();
//             const sound = KeyToSound[key];
//             if (sound) {
//                 playSound(sound);
//             }
//         }
//     }, 300); //set interval to 300ms
// }

//adding event listener when key is pressed trigger onkeypress function
document.addEventListener('keypress', onKeyPress)

//define arrays for each channel for stroing melodies
const melodyKeysChannel1 = [];
const melodyKeysChannel2 = [];
const melodyKeysChannel3 = [];
const melodyKeysChannel4 = [];

// Default channel is 1
let currentChannel = 1; 

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

//get the playmelody btn and trigger playMelody function when clicked
document.getElementById('playMelodyBtn').addEventListener('click', playMelody);

//get the channels buttons and trigger changeChannel function when clicked
document.getElementById('channel1Btn').addEventListener('click', () => changeChannel(1));
document.getElementById('channel2Btn').addEventListener('click', () => changeChannel(2));
document.getElementById('channel3Btn').addEventListener('click', () => changeChannel(3));
document.getElementById('channel4Btn').addEventListener('click', () => changeChannel(4));

//change channel function
function changeChannel(channel) {
    currentChannel = channel;
}

//play melody function
function playMelody() {
    const melodyKeys = getMelodyKeysArrayByChannel(currentChannel); //returns array of keys for current channel and store it in melodyKeys
    const playMelodyInterval = setInterval(() => {
        if (melodyKeys.length === 0) {
            clearInterval(playMelodyInterval);
        } else {
            const key = melodyKeys.shift(); //remove the first key from the array and store it in key
            const sound = KeyToSound[key];
            if (sound) {
                playSound(sound);
            }
        }
    }, 300);
}