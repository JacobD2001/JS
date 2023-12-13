//TO DO:
//1. implement tagging system 
//- add tags to note
//- add input for tags

//getting elements from html
document.getElementById("addNote").addEventListener("click", addNewNote);
document.getElementById('searchBtn').addEventListener('click', searchNotes);

document.getElementById('addTaskCheckbox').addEventListener('change', function() {
    let taskList = document.getElementById('taskList');
    if (this.checked) {
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'newTaskText';
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = this.value;
                let label = document.createElement('label');
                label.textContent = this.value;
                taskList.appendChild(checkbox);
                taskList.appendChild(label);
                taskList.appendChild(document.createElement('br'));
                this.value = '';
            }
        });
        taskList.appendChild(input);
    } else {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
});

//note constructor function
function Note(id, title, content, color, isPinned, tags, dateOfCreation, dateOfLastModification, reminderDate, tasks) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.color = color;
    this.isPinned = isPinned;
    this.tags = tags;
    this.dateOfCreation = dateOfCreation;
    this.dateOfLastModification = dateOfLastModification;
    this.reminderDate = reminderDate;
    this.tasks = tasks; //an array of objects(each objects represents a list item and has text and isDone properties)
}

//Function for adding a new note
function addNewNote() {
    let id = Date.now();
    let title = document.getElementById("noteTitle").value;
    let content = document.getElementById("noteContent").value;
    let color = document.getElementById("noteColor").value;
    let isPinned = document.getElementById("notePin").checked;
    let tags = document.getElementById("noteTags").value;
    let reminderDate = document.getElementById("noteReminderDate").value;
    let dateOfCreation = new Date();
    //let id = dateOfCreation; //how does getTime works -> https://www.w3schools.com/jsref/jsref_gettime.asp
    //dateOfCreation = document.getElementById("modified");
    let dateOfLastModification = new Date();
    let tasks = [];
    let checkboxes = document.getElementById('taskList').querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        tasks.push({ text: checkboxes[i].value, isDone: checkboxes[i].checked });
    }
    let note = new Note(id, title, content, color, isPinned, tags, reminderDate, dateOfCreation, dateOfLastModification, tasks);
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
        let tasksHtml = '';
        //loop through tasks array and add html code for each task
        for (let j = 0; j < note.tasks.length; j++) {
            let task = note.tasks[j]; //get current task from the task array
            tasksHtml += `<input type="checkbox" id="task${j}" ${task.isDone ? 'checked' : ''} onchange="toggleTask('${note.id}', ${j})"> <!--If checkbox is checked than task is done when checkbox is changed call toggletask func-->
                          <label for="task${j}" style="${task.isDone ? 'text-decoration: line-through; color: green;' : ''}">${task.text}</label><br>`;
        }
        console.log(`here tag`, note.tags)
                  notesHtml += `<div id="note${note.id}" class="note" style="background-color: ${note.color};">
        <div class="noteTitle">${note.title}</div>
        <div class="noteContent">${note.content}</div>
        <div class="noteDate">Created: ${note.dateOfCreation}</div>
        <div class="noteDate">Modified: ${note.dateOfLastModification}</div>
        <div class="noteTags">Tags: ${note.tags}</div>
        <div class="noteTasks">Tasks: ${tasksHtml}</div>
        <div class="noteReminderDate">Reminder date: ${note.reminderDate}</div>
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

//function to toggle checked task event
function toggleTask(noteId, taskId) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    noteId = Number(noteId); //noteId passed from html is a string, so we need to convert it to number
    let note = notes.find(note => note.id === noteId); //find note in notes array with id = noteId
    let task = note.tasks[taskId]; // get task from note with taskId note obj has tasks property which is an array of objects
    task.isDone = !task.isDone;
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log(`Toggled task`, task);
    displayNotes();   
}

//Function to display notes when the app is run
window.onload = () => {
    checkReminders();
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
    console.log(`Tag for note id, tag: `, id, notes[index].tags);
    if (index > -1) { //if note is found in array
        const note = notes[index]; //get note from array'notes' of index 'index'
        // Change note display to input fields
        document.getElementById(`note${id}`).innerHTML = `
            <input id="editTitle${id}" type="text" value="${note.title}">
            <input id="editContent${id}" type="text" value="${note.content}">
            <input id="editColor${id}" type="color" value="${note.color}">
            <input id="editPin${id}" type="checkbox" ${note.isPinned ? 'checked' : ''}> <!--if note.isPinned is true than add checked attribute to checkbox-->
            <input id="editTags${id}" type="text" value="${note.tags}">
            <input id="editReminderDate${id}" type="date" value="${note.reminderDate}">
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
        let tags = document.getElementById(`editTags${id}`).value;
        let reminderDate = document.getElementById(`editReminderDate${id}`).value;
        let dateOfLastModification = new Date();
        // Update note
        notes[index].title = title;
        notes[index].content = content;
        notes[index].color = color;
        notes[index].isPinned = isPinned;
        notes[index].tags = tags;
        notes[index].dateOfLastModification = dateOfLastModification;
        notes[index].reminderDate = reminderDate;
        // Save notes back to local storage
        localStorage.setItem("notes", JSON.stringify(notes));
        console.log(`Saved changes to note with id: `, id);
        // Refresh note display
        displayNotes();
    }
}

//function for searching notes
function searchNotes() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase(); //get search input and convert it to lowercase
    const notes = GetStoredNotes(); //get notes from local storage

    // Filter notes based on search input
    const filteredNotes = notes.filter(note => {
        const title = note.title.toLowerCase();
        const content = note.content.toLowerCase();
        const tags = note.tags.toLowerCase();

        return title.includes(searchInput) || content.includes(searchInput) || tags.includes(searchInput);
    });
    console.log(`Filtered notes`, filteredNotes);
    // Display filtered notes
    displayFilteredNotes(filteredNotes);
}

function displayFilteredNotes(filteredNotes) {
    // Sort notes so that pinned notes come first
    filteredNotes.sort((a, b) => b.isPinned - a.isPinned);

    // Create empty string for html code -> then loop through notes array and add html code for each note
    let notesHtml = "";
    for (let i = 0; i < filteredNotes.length; i++) {
        let note = filteredNotes[i];
        console.log(`here tag`, note.tags)
        notesHtml += `<div id="note${note.id}" class="note" style="background-color: ${note.color};">
            <div class="noteTitle">${note.title}</div>
            <div class="noteContent">${note.content}</div>
            <div class="noteDate">Created: ${note.dateOfCreation}</div>
            <div class="noteDate">Modified: ${note.dateOfLastModification}</div>
            <div class="noteTags">Tags: ${note.tags}</div>
            <div class="noteButtons">
                <button class="noteButton" onclick="editNote('${note.id}')">Edit</button>
                <button class="noteButton" onclick="deleteNote('${note.id}')">Delete</button>
            </div>
        </div>`;
    }
    // Display notes in html div we created earlier
    document.getElementById("DisplayNotesPanel").innerHTML = notesHtml;
    console.log(`Displaying notes`, filteredNotes);
}

// Function to check reminders
function checkReminders() {
    const notes = GetStoredNotes(); //get notes from local storage
    const currentDate = new Date(); //get current date

    // Filter notes based on reminder date
    const notesWithReminders = notes.filter(note => {
        const reminderDate = new Date(note.reminderDate);
        // Check if the current date is after the reminder date
        return currentDate >= reminderDate;
    });

    // For each note with a reminder, create a reminder div
    notesWithReminders.reverse().forEach(note => { //reverse() method reverses the order of the elements in an array - eariler reminders first
        const reminderDiv = document.createElement('div');
        reminderDiv.innerHTML = `
        <div class="reminder" style="background-color: red;">
                <h2>REMINDER</h2>
                <p>You have set a reminder with date for note:</p>
                <div class="noteTitle">${note.title}</div>
                <div class="noteContent">${note.content}</div
                <div class="noteReminderDate">Reminder date: ${note.reminderDate}</div>
            </div>
        `;
        // Append the reminder div to the body of the document
        document.body.insertBefore(reminderDiv, document.body.firstChild);
    });
    console.log(`Checked reminders`);
}

