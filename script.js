const library = [
  {
    title: "Half life: poems for Chernobyl",
    author: "Mario Petrucci",
    image: "http://www.mariopetrucci.com/pictures/halflifecover.JPG",
    pages: 41,
    publishDate: 2004,
    publisher: "Heaventree Press",
    language: "English",
    isRead: true
  },
  {
    title: "Iluminações ; Uma cerveja no inferno",
    author: "Arthur Rimbaud",
    image: "https://images-na.ssl-images-amazon.com/images/I/418oqVAPx3L.jpg",
    pages: 203,
    publishDate: 1989,
    publisher: "Assírio & Alvim",
    language: "Portuguese",
    isRead: false
  }
];

// select elements
const libraryEl = document.querySelector('.library');
const imageInput = document.querySelector('.book__img-selector');
const imagePreview = document.querySelector('.book__img-preview');
const addBookBtn = document.querySelector('.btn--new-book');
const formContainer = document.querySelector('.form-container');
const formBook = document.querySelector('.book');
let uploadedImage = "";

// display books
const displayLibraryBooks = function() {
  const markup = library.map(({title, author, image, pages, publishDate, publisher, language, isRead}, idx) => 
    `
      <li class="card" data-idx="${idx}">
        <div class="card__img" style="background-image: url(${image})"></div>
        <div class="card__info">
          <h3 class="card__title">${title}</h3>
          <p>by <span>${author}</span></p>
          <p><span>${publishDate}</span>, <span>${publisher}</span></p>
          <p><span>${pages}</span> pages, in <span>${language}</span></p>
          <div class="card__btn-container">
            <button class="btn btn--blue btn--remove">Remove</button>
            <button class="btn btn--read ${isRead ? 'btn--green' : 'btn--blue'} btn--read">${isRead ? 'Read' : 'Not Read'}</button>
          </div
        </div>
      </li>
    `).join("");

    libraryEl.innerHTML = "";
    libraryEl.insertAdjacentHTML('afterbegin', markup);
}

displayLibraryBooks();

// book constructor

const Book = function(title, author, image, pages, publishDate, publisher, language, isRead) {
  this.title = title;
  this.author = author;
  this.image = image;
  this.pages = pages;
  this.publishDate = publishDate;
  this.publisher = publisher;
  this.language = language;
  this.isRead = isRead;
}

Book.prototype.addBook = function() {
  library.push(this);
}

Book.prototype.removeBook = function(idx) {
  library.splice(idx, 1);
}

Book.prototype.toggleRead = function() {
  this.isRead = !this.isRead;
}

//////////////////////////////////////////////////////

const addBookToLibrary = function(title, author, image, pages, publishDate, publisher, language, isRead) {
  const book = new Book(title, author, image, pages, publishDate, publisher, language, isRead);
  book.addBook();
}

// add new book
addBookBtn.addEventListener('click', () => {
  formContainer.classList.remove('hidden');
})  

// remove book
libraryEl.addEventListener("click", (e) => {
  if(!e.target.classList.contains('btn--remove')) return;

  const targetIdx = +e.target.parentElement.parentElement.parentElement.dataset.idx;
  
  library[targetIdx].removeBook(targetIdx);

  displayLibraryBooks();
})

// toggle read state
libraryEl.addEventListener("click", (e) => {
  if(!e.target.classList.contains('btn--read')) return;

  const targetBook = library[+e.target.parentElement.parentElement.parentElement.dataset.idx];
  
  targetBook.toggleRead();

  displayLibraryBooks();
})

// upload image
imageInput.addEventListener("change", function() {
  const fileReader = new FileReader();
  
  fileReader.addEventListener("load", () => {
    uploadedImage = fileReader.result;
    imagePreview.style.backgroundImage = `url(${uploadedImage})`;
  });

  fileReader.readAsDataURL(this.files[0]);
})

// form submit handler
formBook.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const image = document.querySelector(".book__img-preview").style.backgroundImage.slice(4, -1).replaceAll("\"", "");
  const title = document.querySelector('.book__title').value;
  const author = document.querySelector('.book__author').value;
  const publisher = document.querySelector('.book__publisher').value;
  const language = document.querySelector('.book__language').value;
  const publishDate = +document.querySelector('.book__publish-date').value;
  const pages = +document.querySelector('.book__pages').value;
  const isRead = document.querySelector(".book__checkbox").checked;

  addBookToLibrary(title, author, image, pages, publishDate, publisher, language, isRead);

  displayLibraryBooks();

  formContainer.classList.add('hidden');
});
