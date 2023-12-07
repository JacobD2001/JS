//adding event listener when key is pressed trigger onkeypress function
document.addEventListener('keypress', onKeyPress)

//define arrays for each channel for stroing melodies
const melodyKeysChannels = [];  //- 1.Define an array for each channel for storing melodies

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
    console.log(`PLAYED SOUND ${sound.id}`);
}

//save melody in the right cahnnel array by key // - 3. implement a function that will save the melody in the right channel array by key
function saveMelody(key, channel) {
    // Ensure the array for this channel exists
    if (!melodyKeysChannels[channel]) {
        melodyKeysChannels[channel] = [];
    }
    console.log(`SAVED KEY ${key} TO CHANNEL ${channel}`);
    melodyKeysChannels[channel].push(key);
}

//get the melody array by channel // - 2. implement a function that will return the melody array by channel
function getMelodyKeysArrayByChannel(channel) {
    console.log(`PLAYING CHANNEL ${channel}`);
    return melodyKeysChannels[channel] || [];
}

//get the channels buttons and trigger changeChannel function when clicked
const channelsContainer = document.getElementById('channels');

// Add a single event listener to the parent element
channelsContainer.addEventListener('click', (event) => {
    // Check if the clicked element is a channel button
    if (event.target.classList.contains('channelBtn')) {
        // Extract the channel number from the button's ID
        const channelNumber = parseInt(event.target.id.replace('channel', ''));
        // Change the channel
        changeChannel(channelNumber);
        console.log(`SWITCHED CHANNELS TO ${channelNumber}`);
    }
});

//get the play channels buttons and trigger playmelodybychannel function when clicked
const playChannelsContainer = document.getElementById('playChannels');

// Add a single event listener to the parent element
playChannelsContainer.addEventListener('click', (event) => {
    // Check if the clicked element is a play channel button
    if (event.target.classList.contains('playChannelBtn')) {
        // Extract the channel number from the button's ID
        const channelNumber = parseInt(event.target.id.replace('playChannel', ''));
        // Play melody for the clicked channel
        playMelody(channelNumber);
        console.log(`PLAYING CHANNEL ${channelNumber}`);
    }
});

//get play all channels button and trigger playAllChannels function when clicked
document.getElementById('playAllChannelsBtn').addEventListener('click', playAllChannels);

//play melody by channel function
// Modified playMelody function to support looping
function playMelody(channel, maxChannelLength, totalRepetitions) {
    const melodyKeys = getMelodyKeysArrayByChannel(channel);
    let repetitionCount = 0;

    const playNote = () => {
        const key = melodyKeys.shift();
        const sound = KeyToSound[key];
        if (sound) {
            playSound(sound);
        }

        if (melodyKeys.length > 0) {
            setTimeout(playNote, 300); // Adjust the interval as needed
        } else {
            repetitionCount++;

            if (repetitionCount >= totalRepetitions) {
                // Check if this is the last repetition
                clearInterval(loopInterval); // Stop the loop after reaching the desired repetitions
            }
        }
    };

    playNote(); // Start the first note
}

// play all channels function
// Modified playAllChannels function to ensure looping
function playAllChannels(maxChannelLength, totalRepetitions) { // Add totalRepetitions as a parameter
    for (let i = 1; i <= channelsContainer.children.length; i++) {
        playMelody(i, maxChannelLength, totalRepetitions); // Pass totalRepetitions to playMelody
    }
}


//IMPLEMENTATION OF PANDA 4

//get playselectedchannelsbtn and trigger playselectedchannels function when clicked
document.getElementById('playSelectedChannelsBtn').addEventListener('click', playSelectedChannels);

//function to play selected channels
function playSelectedChannels() {
    const selectedChannels = getSelectedChannels();
    selectedChannels.forEach(channel => {
        playMelody(channel)
    }); //play melody for each selected channel by looping through selected channels array
}

// function to get selected channels
function getSelectedChannels() {
    const selectedChannels = [];
    
    // Get all checkbox elements
    const checkboxElements = document.querySelectorAll('.checkbox');

    // Iterate over each checkbox element
    checkboxElements.forEach((checkbox, index) => {
        // Check if the checkbox is selected
        if (checkbox.checked) {
            // Extract the channel number from the checkbox id
            const channelNumber = parseInt(checkbox.id.match(/\d+/)[0]);
            selectedChannels.push(channelNumber);
        }
    });

    return selectedChannels;
}


//METRONOME IMPLEMENTATION

let metronomeIsOn = false;
let beatsPerMinute = 120;
let metronomeInterval;

//get metronome button and trigger startMetronome/stopmetronom function when clicked
document.getElementById('toggleMetronomeBtn').addEventListener('click', () => {
    metronomeIsOn = !metronomeIsOn;

    if (metronomeIsOn) {
        startMetronome();
    } else {
        stopMetronome();
    }
});

//function to start metronome
function startMetronome() {
    metronomeIsOn = true;
    metronomeInterval = setInterval(() => {
        playMetronomeClick();
    }, 60000 / beatsPerMinute);
}

//function to stop metronome
function stopMetronome() {
    metronomeIsOn = false;
    clearInterval(metronomeInterval);
}

//play metronome click function
function playMetronomeClick() {
    const sound = document.querySelector('#metronomeClick');
    sound.currentTime = 0;
    sound.play();
}

//get the slider and trigger changeBPM function when input is changed(bpm value is changed)
document.getElementById('bpmSlider').addEventListener('input', (event) => { //get the slider and trigger changeBPM function when input
    changeBPM(event.target.value);
});

//function to change bpm
function changeBPM(bpm) {
    beatsPerMinute = bpm;
    document.getElementById('bpmValue').innerHTML = bpm;
    if (metronomeIsOn) { //if its on stop and start(restart metronome)
        stopMetronome();
        startMetronome();
    }
}

//PANDA 5 IMPLEMENTATION
//const channelsContainer = document.getElementById('channels');
//const playChannelsContainer = document.getElementById('playChannels');
const checkboxContainer = document.getElementById('checkboxes');

//get the add/remove channel button and trigger addChannel/removeChannel function when clicked
document.getElementById('addChannelBtn').addEventListener('click', addChannel);
document.getElementById('removeChannelBtn').addEventListener('click', removeChannel);


//function to add channel
function addChannel() {
    //adding channels buttons
    const newChannelNumber = channelsContainer.children.length + 1; //get the number of channels and add 1 to it
    const newChannelBtn = document.createElement('button'); //create new channel button
    newChannelBtn.textContent = `Channel ${newChannelNumber}`; //set the text of the button to the new channel number
    newChannelBtn.id = `channel${newChannelNumber}Btn`; //set the id of the button to the new channel number
    newChannelBtn.classList.add('channelBtn'); // add the 'channelBtn' class
    newChannelBtn.addEventListener('click', () => changeChannel(newChannelNumber)); //add event listener to the button to change channel when clicked
    channelsContainer.appendChild(newChannelBtn); //add the button to the channels container
    console.log(`ADDED CHANNEL ${newChannelNumber}`);

    //adding play channels buttons
    const newPlayChannelNumber = playChannelsContainer.children.length + 1; //get the number of play channels btn and add 1 to it
    const newPlayChannelBtn = document.createElement('button'); //create new play channel button
    newPlayChannelBtn.textContent = `Play Channel ${newPlayChannelNumber}`; //set the text of the button to the new play channel number
    newPlayChannelBtn.id = `playChannel${newPlayChannelNumber}Btn`; //set the id of the button to the new play channel number
    newPlayChannelBtn.classList.add('playChannelBtn'); // add the 'playChannelBtn' class
    playChannelsContainer.appendChild(newPlayChannelBtn); //add the button to the play channels container
    console.log(`ADDED PLAY CHANNEL ${newPlayChannelNumber}`);

    //adding checkboxes for play selected channels
    const newCheckBoxNumber = document.querySelectorAll('.checkbox').length + 1; //get the number of checkboxes and add 1 to it

    // create a label for the checkbox
    // create a label for the checkbox
    const newLabel = document.createElement('label');
    newLabel.textContent = `Channel ${newCheckBoxNumber}`;
    newLabel.classList.add('checkbox-label');


    const newCheckBox = document.createElement('input'); //create new checkbox
    newCheckBox.type = 'checkbox'; //set the type of the checkbox to checkbox
    newCheckBox.id = `channel${newCheckBoxNumber}ToPlayBtn`; //set the id of the checkbox to the new checkbox number
    newCheckBox.classList.add('checkbox');
    checkboxContainer.appendChild(newCheckBox); //add the checkbox to the checkbox container
    checkboxContainer.appendChild(newLabel);
    console.log(`ADDED CHECKBOX ${newCheckBoxNumber}`);


}

// Function to remove channel
function removeChannel() {
    const lastChannelBtn = channelsContainer.lastElementChild;
    if (lastChannelBtn) {
        channelsContainer.removeChild(lastChannelBtn);
        playChannelsContainer.removeChild(playChannelsContainer.lastElementChild);

        // Remove the checkbox and its label
        if (checkboxContainer.lastElementChild) {
            checkboxContainer.removeChild(checkboxContainer.lastElementChild); // Remove the label
        }
        if (checkboxContainer.lastElementChild) {
            checkboxContainer.removeChild(checkboxContainer.lastElementChild); // Remove the checkbox
        }

        // If removed channel is the current channel switch to the default(1) channel
        if (currentChannel === lastChannelBtn.id) {
            changeChannel(1);
        }
    }
    console.log(`REMOVED CHANNEL ${lastChannelBtn.id}`);
    console.log(`REMOVED PLAY CHANNEL ${playChannelsContainer.lastElementChild.id}`);
    console.log(`REMOVED CHECKBOX ${checkboxContainer.lastElementChild.id}`);
}



//change channel function with css
function changeChannel(channel) {
    currentChannel = channel; //sets current cahnnel to new cahnnel

    const channelButtons = channelsContainer.children; //get all channel buttons

    //loop through all channels(4)
    for (let i = 1; i <= channelButtons.length; i++) {
        const channelBtn = document.getElementById(`channel${i}Btn`); //get the button corresponding to the (i) channel
        channelBtn.classList.remove('active-channel'); //remove the active-channel class from all channel buttons

    }

    const currentChannelBtn = document.getElementById(`channel${channel}Btn`);
    currentChannelBtn.classList.add('active-channel');
    console.log(`SWITCHED CHANNELS TO ${channel}`);
}


//for looping implementation

document.getElementById('loopAllChannelsBtn').addEventListener('click', loopEntireSong);

// Function to loop the entire song
function loopEntireSong() {
    const maxChannelLength = getMaxChannelLength(); // Step 2
     console.log(`MAX CHANNEL LENGTH IS ${maxChannelLength}`);
    // Loop until the desired number of repetitions (adjust as needed)
    const totalRepetitions = 1000; 
    let currentRepetition = 0;

    // Use setInterval for repeating the loop
    const loopInterval = setInterval(() => {
        playAllChannels(maxChannelLength, totalRepetitions); // Pass totalRepetitions to playAllChannels
console.log(`CURRENT REPETITION IS ${currentRepetition}`);
        currentRepetition++;
        if (currentRepetition >= totalRepetitions) {
            clearInterval(loopInterval); // Stop the loop after reaching the desired repetitions
        }
    }, maxChannelLength * 1000); 
}

// Function to get the maximum length among all channels
function getMaxChannelLength() {
    let maxChannelLength = 0;

    for (let i = 1; i <= channelsContainer.children.length; i++) {
        const channelLength = getMelodyKeysArrayByChannel(i).length;
        if (channelLength > maxChannelLength) {
            maxChannelLength = channelLength;
        }
    }

    return maxChannelLength;
}

//seems to work but the sounds dont have time to play ig?