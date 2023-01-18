let myLibrary = [];

const form = document.getElementById("book-form");
const button = document.getElementById("new-book");
const display = document.getElementById('book-display');

button.addEventListener('click', () => {
    form.style.display = "flex";
    form.style.flexDirection = "column";
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let book = new Book(title, author);
    addBookToLibrary(book);
    displayLibrary();
    document.getElementById("book-form").reset();
  });

// Book constructor, contains a title and an author
function Book(title, author) {
    let _title = title;
    let _author = author;
  
    this.getTitle = function() {
      return _title;
    };
  
    this.setTitle = function(title) {
      _title = title;
    };
  
    this.getAuthor = function() {
      return _author;
    };
  
    this.setAuthor = function(author) {
      _author = author;
    };
  }
  

function addBookToLibrary(book)
{
    // check to see if the object passed is a Book object
    if (typeof book !== "object" || !(book instanceof Book)) {
        throw new Error("Argument must be a Book object");
      }

    myLibrary.push(book); // add the book to the library

    // sort the library, js sort method is quicksort, might not be the most efficient with large datasets
    myLibrary.sort(function(a, b) {
        if (a.getTitle() < b.getTitle()) {
          return -1;
        }
        if (a.getTitle() > b.getTitle()) {
          return 1;
        }
        return 0;
      });
}

function displayLibrary()
{
    display.innerText = "";

    myLibrary.forEach(book => {
        const container = document.createElement('div');
        container.classList.add("a-book");
        container.innerText += "Title: " + book.getTitle() + "\n" + "Author: " + book.getAuthor();
        display.appendChild(container);
    });   
}