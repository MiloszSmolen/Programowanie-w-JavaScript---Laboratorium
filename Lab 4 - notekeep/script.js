// dodaje event gdy strona się załaduje (kod wykona się dopiero wtedy)
document.addEventListener("DOMContentLoaded", () => {
  const addNoteForm = document.getElementById("addNoteForm");
  const notesContainer = document.getElementById("notesContainer");
  displayNotes();

  addNoteForm.addEventListener("submit", (event) => {
    event.preventDefault(); // blokuje przeładowanie strony 

    const noteTitle = addNoteForm.querySelector(".noteTitle").value;
    const noteContent = addNoteForm.querySelector(".noteContent").value;
    const noteColor = addNoteForm.querySelector(".noteColor").value;
    const noteTags = addNoteForm.querySelector(".noteTags").value.split(",");

    const note = {
      title: noteTitle,
      content: noteContent,
      color: noteColor,
      tags: noteTags,
    };

    saveNoteToLocalStorage(note);
    displayNotes();
    // po zatwierdzeniu notatki formularz zostaje wyzerowany
    addNoteForm.reset();
  });

  function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  // funkcja tworząca i zwracająca element notatki przyjmuje notatkę i jej index 
  function createNoteElement(note, index) {
    const noteElement = document.createElement("div");
    noteElement.classList.add("note");
    noteElement.style.backgroundColor = note.color;

    const titleElement = document.createElement("h3");
    titleElement.classList.add("note-title");
    titleElement.textContent = note.title;

    const contentElement = document.createElement("div");
    contentElement.classList.add("note-content");
    contentElement.textContent = note.content;

    const tagsElement = document.createElement("div");
    // zwraca tagi w formie stringów oddzielonych od siebie przecinkami
    tagsElement.textContent = `Tagi: ${note.tags.join(", ")}`;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 32 32">
            <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
        </svg>`;
    deleteButton.addEventListener("click", () => {
      const notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      displayNotes();
    });

    // dodaje elementy potomne do noteElement
    noteElement.appendChild(titleElement);
    noteElement.appendChild(contentElement);
    noteElement.appendChild(tagsElement);
    noteElement.appendChild(deleteButton);

    return noteElement;
  }

  function displayNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
      const noteElement = createNoteElement(note, index);
      // dodaje stworzoną notatkę do kontenera
      notesContainer.appendChild(noteElement);
    });
  }

  const searchInput = document.getElementById("search");
  // dodanie eventu do inputa wyszukiwania automatycznie po wpisaniu tekstu
  searchInput.addEventListener("input", searchNotes);

  function searchNotes() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const filteredNotes = notes.filter((note) => {
      const noteValues = {
        title: note.title.toLowerCase(),
        content: note.content.toLowerCase(),
        tags: (note.tags || []).join(" ").toLowerCase(),
      };
      return Object.values(noteValues).some((value) =>
        value.includes(searchTerm)
      );
    });

    // Wyświetla jedynie szukaną notatke
    notesContainer.innerHTML = "";
    filteredNotes.forEach((note, index) => {
      const noteElement = createNoteElement(note, index);
      notesContainer.appendChild(noteElement);
    });
  }
});
