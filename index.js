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
var selectedBook = null;
var isDarkMode = false;
getJsonObject('data.json',
  function (data) {
    characterList = data; // store the character list into characterList
    loadTable(characterList);
  },
  function (xhr) { console.error(xhr); }
);

function searchBooks() {
  const searchInput = document.getElementById('searchInput').value;
  console.log(searchInput);
  filterBooks();
}

function filterBooks() {
  const searchInput = document.getElementById('searchInput').value;
  if (document.getElementById('categoryFilter').value === '') {
    loadTable(characterList, searchInput);
  } else {
    const categoryFilter = document.getElementById('categoryFilter').value;
    console.log(categoryFilter);
    let characterListNew = characterList.filter(book => book.category === categoryFilter);
    loadTable(characterListNew, searchInput);
  }
}

function clearFilters() {
  const searchInput = document.getElementById('searchInput').value;
  document.getElementById('categoryFilter').value = '';
  loadTable(characterList, searchInput);
}

function loadTable(characterList, searchInput) {
  const bookTable = document.getElementById('bookTable');
  bookTable.innerHTML = '';
  insertTableHeader(bookTable);
  characterList.map(book => {
    let index = characterList.indexOf(book);
    let newRow = bookTable.insertRow();

    insertBook(book, index, newRow);
    if (searchInput && book.title.toLowerCase().includes(searchInput.toLowerCase())) {
      newRow.style.border = '1pt solid #ff1688';
      newRow.style.backgroundColor = '#ffe8f3';
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

  for (let i = 0; i < book.rating; i++) {
    ratingCell.innerHTML += `<img src="images/star-16.ico" class="star" alt="Star Rating">`;
  }

  for (let i = 0; i < 5 - book.rating; i++) {
    ratingCell.innerHTML += `<img src="images/outline-star-16.ico" class="star outline" alt="Star Rating">`;
  }

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

function addNumberConfirm() {
  const addNumberInput = document.getElementById('addNumberInput').value;
  console.log(addNumberInput);
  if (addNumberInput <= 0) {
    alert('Please enter a valid number');
    return;
  }
  alert('You have added ' + addNumberInput + ' books to the cart');
  document.getElementById('addNumber').style.display = 'none';
  document.getElementById('addToCartButton').style.display = 'block';
  resetAllCheckbox();

  document.getElementById('cartCountNumber').innerHTML = parseInt(document.getElementById('cartCountNumber').innerHTML) + parseInt(addNumberInput);
  document.getElementById('addNumberInput').value = 1;
}

function addNumberCancel() {
  document.getElementById('addNumber').style.display = 'none';
  document.getElementById('addToCartButton').style.display = 'block';
}

function resetCart() {
  if (window.confirm('Are you sure you want to reset the cart?')) {
    // cart.innerHTML = '';
  };
}

function resetAllCheckbox() {
  const allCheckboxes = document.querySelectorAll('.checkbox');
  allCheckboxes.forEach(c => {
    c.checked = false;
  });

  selectedBook = null;
}

function darkMode() {
  if (isDarkMode) {
    return;
  }
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

function lightMode() {
  if (!isDarkMode) {
    return;
  }
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
  // const allButtons = document.querySelectorAll("button");
  // allButtons.forEach(s => {
  //   s.style.color = 'white';
  // });

  const darkModeButton = document.getElementById("darkModeButton");
  const lightModeButton = document.getElementById("lightModeButton");
  darkModeButton.style.display = 'flex';
  lightModeButton.style.display = 'none';
}

