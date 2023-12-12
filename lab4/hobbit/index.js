//TO DO:
//1. Create function to add new note
// - It will create and html div with note(title, content, color of note, isPinned(bool - determine if note is at the begining 
//of the noes)), date of creation, date of last modification), button to edit the note and button to delete the note/ save notes to local storage
//2. Function that will display the array of notes from local storage
//3. Function that will edit the note
//4. Function that will delete the note

//getting elements from html
document.getElementById("addNote").addEventListener("click", addNewNote);

//note constructor function
function Note(id, title, content, color, isPinned, dateOfCreation, dateOfLastModification) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.isPinned = isPinned;
    this.dateOfCreation = dateOfCreation;
    this.dateOfLastModification = dateOfLastModification;
}

//Function for adding a new note
function addNewNote() {
    let id = Date.now();
    let title = document.getElementById("noteTitle").value;
    let content = document.getElementById("noteContent").value;
    let color = document.getElementById("noteColor").value;
    let isPinned = document.getElementById("notePin").checked;
    let dateOfCreation = new Date();
    //let id = dateOfCreation; //how does getTime works -> https://www.w3schools.com/jsref/jsref_gettime.asp
    //dateOfCreation = document.getElementById("modified");
    let dateOfLastModification = new Date();
    let note = new Note(id, title, content, color, isPinned, dateOfCreation, dateOfLastModification);
    console.log(`Created new note`, note);
    let notes = JSON.parse(localStorage.getItem("notes")); //get notes from local storage
    if (notes == null) { //if there are no notes in local storage
        notes = []; //create an empty array
    }
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes)); //save notes to local storage key = "notes", value = notes array as json string
    console.log(`Saved notes to local storage`, notes);
    displayNotes();
}

//Function for displaying notes
function displayNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")); //get notes from local storage
    if (notes == null) { //if there are no notes in local storage
        return notes = []; //return empty array
    }

    // Sort notes so that pinned notes come first
    /*So, b.isPinned - a.isPinned will return:
     1. a positive value if b is pinned (b.isPinned is true or 1) and a is not (a.isPinned is false or 0), so b will be sorted before a
     2. a negative value if a is pinned and b is not, so a will be sorted before b
     3. zero if both a and b are either pinned or not pinned, so their order doesn't matter */
    notes.sort((a, b) => b.isPinned - a.isPinned); //true = 1, false = 0 -> https://www.w3schools.com/js/js_array_sort.asp
    

    //create empty string for html code -> than loop through notes array and add html code for each note
    let notesHtml = "";
    for (let i = 0; i < notes.length; i++) {
        let note = notes[i];
        notesHtml += `<div id="note${note.id}" class="note" style="background-color: ${note.color};">
        <div class="noteTitle">${note.title}</div>
        <div class="noteContent">${note.content}</div>
        <div class="noteDate">Created: ${note.dateOfCreation}</div>
        <div class="noteDate">Modified: ${note.dateOfLastModification}</div>
        <div class="noteButtons">
            <button class="noteButton" onclick="editNote('${note.id}')">Edit</button>
            <button class="noteButton" onclick="deleteNote('${note.id}')">Delete</button>
        </div>
    </div>`;
    }
    //display notes in html div we created eariler
    document.getElementById("DisplayNotesPanel").innerHTML = notesHtml;
    console.log(`Displaying notes`, notes);
}

//Function to display notes when the app is run
window.onload = () => {
    displayNotes();
}

//function for deleting notes
function deleteNote(id) {
    console.log(`Deleting note button clicked for note with id: `, id);
    const notes = GetStoredNotes();
    const index = notes.findIndex(note => note.id === Number(id)); //get index of the note in array
    console.log(`Index of note in array`, index);
    if (index > -1) { //if note is found in array
        notes.splice(index, 1); //how does splice method works? -> https://www.w3schools.com/jsref/jsref_splice.asp(index, how many elements to remove)
        localStorage.setItem("notes", JSON.stringify(notes)); //update notes to local storage key = "notes", value = notes array as json string
        console.log(`Deleted note with id: `, id);
    }
    displayNotes();
}

//function to get notes from local storage
function GetStoredNotes() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) { //if there are notes in local storage
        const parsedStoredNotes = JSON.parse(storedNotes); //parse notes from json string to array
        if (Array.isArray(parsedStoredNotes)) { //waht is aray.isArray? -> https://www.w3schools.com/jsref/jsref_isarray.asp(checking for safety reasons that returned data is an array)
            console.log(`Got notes from local storage`, parsedStoredNotes);
            return parsedStoredNotes; //return array not json string
        }
    }
    return []; //if there are no notes in local storage return empty array
}

// Function to edit note
function editNote(id) {
    console.log(`Editing note button clicked for note with id: `, id);
    const notes = GetStoredNotes();
    const index = notes.findIndex(note => note.id === Number(id)); //get index of the note in array
    console.log(`Index of note in array`, index);
    if (index > -1) { //if note is found in array
        const note = notes[index]; //get note from array'notes' of index 'index'
        // Change note display to input fields
        document.getElementById(`note${id}`).innerHTML = `
            <input id="editTitle${id}" type="text" value="${note.title}">
            <input id="editContent${id}" type="text" value="${note.content}">
            <input id="editColor${id}" type="color" value="${note.color}">
            <input id="editPin${id}" type="checkbox" ${note.isPinned ? 'checked' : ''}> <!--if note.isPinned is true than add checked attribute to checkbox-->
            <button onclick="saveChanges(${id})">Save</button>
        `;
    }
}

// Function to save changes
function saveChanges(id) {
    const notes = GetStoredNotes();
    const index = notes.findIndex(note => note.id === Number(id)); //get index of the note in array
    if (index > -1) { //if note is found in array
        // Get updated note data from input fields
        let title = document.getElementById(`editTitle${id}`).value;
        let content = document.getElementById(`editContent${id}`).value;
        let color = document.getElementById(`editColor${id}`).value;
        let isPinned = document.getElementById(`editPin${id}`).checked;
        let dateOfLastModification = new Date();
        // Update note
        notes[index].title = title;
        notes[index].content = content;
        notes[index].color = color;
        notes[index].isPinned = isPinned;
        notes[index].dateOfLastModification = dateOfLastModification;
        // Save notes back to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(`Saved changes to note with id: `, id);
        // Refresh note display
        displayNotes();
    }
}