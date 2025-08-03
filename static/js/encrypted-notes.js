// this function takes a note and a passphrase, then encrypts the note using AES
function encryptNote(note, passphrase) {
    // use CryptoJS library to encrypt the note with the passphrase
    const encrypted = CryptoJS.AES.encrypt(note, passphrase).toString();
    console.log('Encrypted Note:', encrypted); // log it (helpful for debugging)
    return encrypted; // return the encrypted note as a string
}

// this function takes an encrypted note and passphrase, then tries to decrypt it
function decryptNote(encrypted, passphrase) {
    try {
        // try decrypting the note using the passphrase
        const bytes = CryptoJS.AES.decrypt(encrypted, passphrase);
        // convert decrypted data from bytes to readable text
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        console.log('Decrypted Note:', decrypted);
        // return the decrypted note (or null if decryption failed)
        return decrypted || null;
    } catch {
        // if something goes wrong (like wrong passphrase), just return null
        return null;
    }
}

// this function displays all saved notes on the page
function renderNotes(notes, passphrase) {
    const list = document.getElementById('notes-list'); // find the notes list container
    list.innerHTML = ''; // clear it first so we don’t show old content

    // loop through each note we got from the backend
    notes.forEach(note => {
        // try to decrypt the note with the user’s passphrase
        const decrypted = decryptNote(note.encrypted_note, passphrase);

        // create a new card (box) to show this note
        const div = document.createElement('div');
        div.className = 'card'; // use card style
        div.style.marginBottom = '1em'; // space below each card

        // fill the card with info: when it was created and the decrypted text
        // if decryption failed, show an error message instead
        div.innerHTML = `
            <div><b>Created:</b> ${new Date(note.created_at).toLocaleString()}</div>
            <div><b>Note:</b> ${decrypted ? decrypted : '<span style="color:#FF6B6B;">Wrong passphrase or corrupted note</span>'}</div>
            <button data-id="${note.id}" class="delete-note-btn" style="margin-top:0.5em;">Delete</button>
        `;

        // add the note card into the notes list
        list.appendChild(div);
    });

    // after showing the notes, add event listeners to all the delete buttons
    document.querySelectorAll('.delete-note-btn').forEach(btn => {
        btn.onclick = function() {
            // when delete is clicked, send a DELETE request to backend
            fetch(`/api/notes/${btn.dataset.id}`, { method: 'DELETE' })
                .then(() => loadNotes()); // after deleting, reload the notes list
        };
    });
}

// this function asks the backend for all notes, then shows them on the page
function loadNotes() {
    // get the passphrase typed by the user
    const passphrase = document.getElementById('vault-passphrase').value;

    // request notes from the server
    fetch('/api/notes')
        .then(res => res.json()) // convert response to JSON
        .then(notes => renderNotes(notes, passphrase)); // display them using renderNotes
}

// wait until the whole page is ready before running the script
document.addEventListener('DOMContentLoaded', function() {
    // get the important elements from the page
    const passInput = document.getElementById('vault-passphrase'); // where the passphrase is typed
    const noteInput = document.getElementById('note-input'); // where the user writes a note
    const addBtn = document.getElementById('add-note-btn'); // the "Add Note" button
    const warning = document.getElementById('passphrase-warning'); // place for warning messages

    // function to check if the passphrase field has something typed
    function checkPassphrase() {
        if (!passInput.value) {
            // if passphrase is empty, show a warning
            warning.textContent = "Enter your passphrase to view/decrypt notes.";
        } else {
            // if passphrase is filled, clear the warning
            warning.textContent = "";
        }
        // always try to load notes (will fail to decrypt if no passphrase)
        loadNotes();
    }

    // whenever the user types something in the passphrase box, run checkPassphrase
    passInput.addEventListener('input', checkPassphrase);

    // when the user clicks the add note button
    addBtn.addEventListener('click', function() {
        const passphrase = passInput.value; // get passphrase
        const note = noteInput.value.trim(); // get note text (remove extra spaces)

        // if no passphrase, show warning and don’t continue
        if (!passphrase) {
            warning.textContent = "Enter a passphrase before adding a note!";
            return;
        }

        // if note is empty, just stop (don’t save empty notes)
        if (!note) return;

        // encrypt the note with the passphrase
        const encrypted = encryptNote(note, passphrase);

        // send the encrypted note to the backend to save it
        fetch('/api/notes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // sending JSON
            body: JSON.stringify({ encrypted_note: encrypted })
        }).then(() => {
            // after saving, clear the input box and reload the notes
            noteInput.value = '';
            loadNotes();
        });
    });

    // load notes right away when the page first opens
    loadNotes();
});
