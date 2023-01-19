const myLibrary = [];

const form = document.getElementById('book-form');
const button = document.getElementById('new-book');
const display = document.getElementById('book-display');

button.addEventListener('click', () => {
  form.style.gridRow = '1/1';
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.alignItems = 'center';
  form.style.justifyContent = 'flex-start';
  button.style.display = 'none';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pageNumber = document.querySelector('#pages').value;
  const readStatus = document.querySelector('#read').value;
  const book = new Book(title, author, pageNumber, readStatus);
  addBookToLibrary(book);
  displayLibrary();
  document.getElementById('book-form').reset();
});

// Book constructor, contains a title, an author, the number of pages, and the readStatus (boolean)
function Book(title, author, pageNumber, readStatus) {
  let _title = title;
  let _author = author;
  let _pageNum = pageNumber;
  let _readStatus = readStatus;

  this.getTitle = function () {
    return _title;
  };

  this.setTitle = function (title) {
    _title = title;
  };

  this.getAuthor = function () {
    return _author;
  };

  this.setAuthor = function (author) {
    _author = author;
  };

  this.getPages = function () {
    return _pageNum;
  };

  this.setPages = function (pageNumber) {
    _pageNum = pageNumber;
  };

  this.getRead = function () {
    return _readStatus;
  };

  this.setRead = function (readStatus) {
    _readStatus = readStatus;
  };
}

function addBookToLibrary(book) {
  // check to see if the object passed is a Book object
  if (typeof book !== 'object' || !(book instanceof Book)) {
    throw new Error('Argument must be a Book object');
  }

  myLibrary.push(book); // add the book to the library

  // sort the library, js sort method is quicksort, might not be the most efficient with large datasets
  myLibrary.sort((a, b) => {
    if (a.getTitle() < b.getTitle()) {
      return -1;
    }
    if (a.getTitle() > b.getTitle()) {
      return 1;
    }
    return 0;
  });
}

function displayLibrary() {
  display.innerText = ''; // in order for the display to be sorted on each new entry, reset the display

  myLibrary.forEach((book, index) => {
    const container = document.createElement('div');
    container.classList.add('a-book');

    const title = document.createElement('p');
    title.textContent = `Title: ${book.getTitle()}`;
    container.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `Author: ${book.getAuthor()}`;
    container.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = `Number of Pages: ${book.getPages()}`;
    container.appendChild(pages);

    const read = document.createElement('p');
    let answer;
    if (book.getRead() === true) { answer = 'I have read this book!'; } else { answer = 'I have not read this book!'; }
    read.textContent = `Read Status: ${answer}`;
    container.appendChild(read);

    const changeRead = document.createElement('button');
    changeRead.textContent = 'Change Read Status';
    changeRead.setAttribute('id', 'change-read');

    changeRead.addEventListener('click', () => {
      if (book.getRead() === true) {
        book.setRead(false);
        answer = 'I have not read this book!';
      } else {
        book.setRead(true);
        answer = 'I have read this book!';
      }

      read.textContent = `Read Status: ${answer}`;
    });

    const changeRemove = document.createElement('div');

    const removeBook = document.createElement('button');
    removeBook.textContent = 'Remove Book';
    removeBook.setAttribute('id', 'remove-book');
    let removed = false;

    removeBook.addEventListener('click', () => {
      myLibrary.splice(index, 1);
      displayLibrary();
      removed = true;
    });

    changeRemove.appendChild(changeRead);
    changeRemove.appendChild(removeBook);
    container.appendChild(changeRemove);
    if (removed === false) { display.appendChild(container); }

    console.log(myLibrary[index].getTitle());
  });
}
