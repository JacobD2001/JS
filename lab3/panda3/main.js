document.addEventListener('keypress', onKeyPress)

const melodyKeys = []

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4')
}

function onKeyPress(event) {
    //we are trying to access value that is under key 'a' for example
    const sound = KeyToSound[event.key] // if pressed a than event.key = a
    playSound(sound)
    melodyKeys.push(event.key)
}
function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}
//PLAYING MELODY

const playMelodyBtn = document.getElementById('playMelodyBtn')

playMelodyBtn.addEventListener('click', playMelody)

function playMelody() {
    const playMelodyInterval = setInterval(() => {
        //if array empty than clear interval
        if (melodyKeys.length === 0) {
            clearInterval(playMelodyInterval);
        } else {
            //get first key from array
            const key = melodyKeys.shift();
            const sound = KeyToSound[key];
            if (sound) {
                playSound(sound);
            }
        }
    }, 300); //set interval to 300ms
}