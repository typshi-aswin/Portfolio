const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        minWidth: 700,  // Minimum width
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        darkTheme: true,
    });
    mainWindow.maximize(); 
    mainWindow.loadFile('index.html');
    

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.executeJavaScript(`
            const homeBtn = document.getElementById('home');
            const ideasBtn = document.getElementById('ideas');
            const getstartBtn = document.getElementById('getting-started');
            const addNoteBtn = document.getElementById('add-new-note');
            const mainContent = document.querySelector('.main-content');
            const sidebar = document.getElementById('sidebar');
    
            // Function to clear the active state on all items
            function clearActiveStates() {
                document.querySelectorAll('.sidebar-item, .note-item').forEach(el => el.classList.remove('active'));
            }
    
            // Function to handle setting an active state for a clicked item
            function setActive(item) {
                clearActiveStates();
                item.classList.add('active');
            }
            function loadContent(filePath, cssPath, jsPath) {
             // Fetch and load HTML content
             fetch(filePath)
             .then(response => response.text())
             .then(html => {
                 mainContent.innerHTML = html;

            // Load CSS if provided
            if (cssPath) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = cssPath;
                document.head.appendChild(link);
            }

            // Load JS if provided
            if (jsPath) {
                const script = document.createElement('script');
                script.src = jsPath;
                document.body.appendChild(script);
            }
        }); 
            }
           

    
            
            // Event listeners for Home and Ideas buttons
            homeBtn.addEventListener('click', () => {
                loadContent('home.html', 'home.css', 'home.js');
                console.log('Loaded files');
                setActive(homeBtn)
            });

    
            ideasBtn.addEventListener('click', () => {
                mainContent.innerHTML = '<h1>Ideas</h1><p>Here are some note ideas.</p>';
              
                setActive(ideasBtn);
            });
            
            
            // Dynamic note addition
            addNoteBtn.addEventListener('click', () => {
                const newNote = document.createElement('p');
                newNote.classList.add('note-item');
                newNote.innerHTML ='<i class="bi bi-file-earmark"></i> New Note';
                sidebar.insertBefore(newNote, addNoteBtn);
                const noteId = 'note-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

                 // Save to localStorage (Initial creation)
                 const notes = JSON.parse(localStorage.getItem('notes')) || {};
                 notes[noteId] = { content: '', title: 'Untitled Note' };
                 localStorage.setItem('notes', JSON.stringify(notes));

                 console.log('Created Note with ID:', noteId);
    
                // Event listener for the newly created note with exclusive active state
                newNote.addEventListener('click', () => {
                    mainContent.innerHTML = '';

                    // Create a new div for the note input
                    const noteInput = document.createElement('div');
                    noteInput.classList.add('note-input');

                    // Add a text area for the note
                    const textArea = document.createElement('textarea');
                    textArea.id = 'typeshit';
                    textArea.placeholder = 'Type your note here...';
                    
                    noteInput.appendChild(textArea);

                    // Append the note input to the main content
                    mainContent.appendChild(noteInput);

                    // Load the notes.css for styles
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'notes.css';
                    document.head.appendChild(link);
                     
                    setActive(newNote);  // Ensures only this note is active


                    const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
                    console.log('Saved Notes:', savedNotes);

                    if (savedNotes[noteId]) {
                      textArea.value = savedNotes[noteId].content; }
                    else {
                    console.log('note not found for id', noteId);
                     }

                    textArea.addEventListener('input', () => {
                       // Get the existing notes from localStorage
                          const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    
                        // Update the specific note content
                     savedNotes[noteId].content = textArea.value;
    
                        // Save the updated notes back to localStorage
                     localStorage.setItem('notes', JSON.stringify(savedNotes));
                   });

                });
            });

            

            
             



`);
    });
    
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
