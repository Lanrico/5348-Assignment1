// fetch data from data.json
function getJsonObject(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

var characterList = []; // character list container
var selectedBook = null; // selected book
var isDarkMode = false;  // dark mode flag
var searchContent = '';  // search content
var categoryFilter = '';  // category filter

// store the character list into characterList
getJsonObject('data.json',
  function (data) {
    characterList = data;
    loadTable(characterList);
  },
  function (xhr) { console.error(xhr); }
);

// add event listener to search button
function searchBooks() {
  searchContent = document.getElementById('searchInput').value;
  console.log(searchContent);

  // If search content is empty, give an alert to the user
  let c = characterList.filter(book =>
    (!categoryFilter || book.category === categoryFilter) && book.title.toLowerCase().includes(searchContent.toLowerCase())
  );
  console.log(c);
  if (c.length == 0) {
    alert('No books found with this title');
  }

  // searchBooks calls filterBooks to make sure the search result is consistent with the category filter
  filterBooks();
}


// add event listener to category filter
function filterBooks() {
  categoryFilter = document.getElementById('categoryFilter').value;
  if (categoryFilter === '') {
    loadTable(characterList);
  } else {
    console.log(categoryFilter);

    // If no books are found in the category, give an alert to the user
    let characterListNew = characterList.filter(book => book.category === categoryFilter);
    console.log(characterListNew);
    if (characterListNew.length == 0) {
      alert('No books found in this category');
    }
    loadTable(characterListNew);
  }
}

// add event listener to clear category filter button
function clearFilters() {
  document.getElementById('categoryFilter').value = '';
  categoryFilter = '';
  loadTable(characterList);
}

// Integrated table load function
function loadTable(characterList) {
  // Initialize the table header
  const bookTable = document.getElementById('bookTable');
  bookTable.innerHTML = '';
  insertTableHeader(bookTable);

  // Insert each book into the table
  characterList.map(book => {
    let index = characterList.indexOf(book);
    let newRow = bookTable.insertRow();

    insertBook(book, index, newRow);
    // If the search content is not empty, highlight the search content in the table
    if (searchContent && book.title.toLowerCase().includes(searchContent.toLowerCase())) {
      newRow.style.border = '1pt solid #ff1688';
      newRow.style.backgroundColor = '#ffe8f3';
      newRow.style.color = 'black';
    }
  });
}

function insertTableHeader(bookTable) {
  const headerRow = bookTable.insertRow();
  headerRow.innerHTML = `
    <th> </th>
    <th>Cover</th>
    <th class="title">Title</th>
    <th>Rating</th>
    <th>Author</th>
    <th>Year</th>
    <th>Price</th>
    <th>Publisher</th>
    <th>Category</th>
  `;
  headerRow.className = 'bookTableHeader';
}

function insertBook(book, index, newRow) {
  // Create the html elements for each row of books
  const checkboxCell = newRow.insertCell();
  const coverCell = newRow.insertCell(1);
  const titleCell = newRow.insertCell(2);
  const ratingCell = newRow.insertCell(3);
  const authorCell = newRow.insertCell(4);
  const yearCell = newRow.insertCell(5);
  const priceCell = newRow.insertCell(6);
  const publisherCell = newRow.insertCell(7);
  const categoryCell = newRow.insertCell(8);

  checkboxCell.className = 'checkboxField';
  coverCell.className = 'coverField';
  titleCell.className = 'titleField';
  ratingCell.className = 'ratingField';
  authorCell.className = 'authorField';
  yearCell.className = 'yearField';
  priceCell.className = 'priceField';
  publisherCell.className = 'publisherField';
  categoryCell.className = 'categoryField';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `checkbox_${index}`;
  checkbox.className = 'checkbox';
  checkboxCell.appendChild(checkbox);
  coverCell.innerHTML = `<img src="${book.img}" alt="${book.title}">`;
  titleCell.innerHTML = `${book.title}`;
  authorCell.innerHTML = `${book.authors}`;
  yearCell.innerHTML = `${book.year}`;
  priceCell.innerHTML = `${book.price}`;
  publisherCell.innerHTML = `${book.publisher}`;
  categoryCell.innerHTML = `${book.category}`;

  // Create the rating stars, and fill in the stars based on the rating
  for (let i = 0; i < book.rating; i++) {
    ratingCell.innerHTML += `<img src="images/star-16.ico" class="star" alt="Star Rating">`;
  }

  for (let i = 0; i < 5 - book.rating; i++) {
    ratingCell.innerHTML += `<img src="images/outline-star-16.ico" class="star outline" alt="Star Rating">`;
  }

  // Add event listener to each checkbox
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      resetAllCheckbox();
      checkbox.checked = true;
      selectedBook = book;
    }
    else {
      checkbox.checked = false;
      selectedBook = null;
    }
  });
}

// Add event listener to the add to cart button
function addToCart() {
  if (selectedBook) {
    console.log(selectedBook);
    document.getElementById('addNumber').style.display = 'flex';
    document.getElementById('addNumberInput').value = 1;
    document.getElementById('addToCartButton').style.display = 'none';
  }
  else {
    alert('No book selected');
  }
}

// Add event listener to the add number confirm button
function addNumberConfirm() {
  const addNumberInput = document.getElementById('addNumberInput').value;
  console.log(addNumberInput);
  // If the input is not a valid number, give an alert to the user
  if (addNumberInput <= 0) {
    alert('Please enter a valid number');
    return;
  }

  // If the input is a valid number, add the book to the cart
  alert('You have added ' + addNumberInput + ' books to the cart');
  document.getElementById('addNumber').style.display = 'none';
  document.getElementById('addToCartButton').style.display = 'block';
  resetAllCheckbox();

  // Update the cart count number
  document.getElementById('cartCountNumber').innerHTML = parseInt(document.getElementById('cartCountNumber').innerHTML) + parseInt(addNumberInput);
  document.getElementById('addNumberInput').value = 1;
}

function addNumberCancel() {
  document.getElementById('addNumber').style.display = 'none';
  document.getElementById('addToCartButton').style.display = 'block';
}

// Add event listener to the reset cart button
function resetCart() {
  if (window.confirm('Are you sure you want to reset the cart?')) {
    document.getElementById('cartCountNumber').innerHTML = 0;
  };
}

// Once a checkbox is checked, reset all other checkboxes
function resetAllCheckbox() {
  const allCheckboxes = document.querySelectorAll('.checkbox');
  allCheckboxes.forEach(c => {
    c.checked = false;
  });

  selectedBook = null;
}

// Add event listener to the dark mode button
function darkMode() {
  isDarkMode = true;
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white';
  document.getElementById("header").style.backgroundColor = 'black';
  document.getElementById("header-left").style.backgroundColor = 'black';
  document.getElementById("listBox").style.backgroundColor = 'black';
  document.getElementById("bookTable").style.backgroundColor = 'black';

  const allStars = document.querySelectorAll(".star");
  allStars.forEach(s => {
    s.style.backgroundColor = 'black';
  });

  const darkModeButton = document.getElementById("darkModeButton");
  const lightModeButton = document.getElementById("lightModeButton");
  darkModeButton.style.display = 'none';
  lightModeButton.style.display = 'flex';
}

// Add event listener to the light mode button
function lightMode() {
  isDarkMode = false;
  document.body.style.backgroundColor = '#f0fefd';
  document.body.style.color = 'black';
  document.getElementById("header").style.backgroundColor = '#f0fefd';
  document.getElementById("header-left").style.backgroundColor = '#f0fefd';
  document.getElementById("listBox").style.backgroundColor = '#f0fefd';
  document.getElementById("bookTable").style.backgroundColor = '#f0fefd';

  const allStars = document.querySelectorAll(".star");
  allStars.forEach(s => {
    s.style.backgroundColor = '#3accc0';
  });

  const darkModeButton = document.getElementById("darkModeButton");
  const lightModeButton = document.getElementById("lightModeButton");
  darkModeButton.style.display = 'flex';
  lightModeButton.style.display = 'none';
}

