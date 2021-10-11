/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const itemsPerPage = 9;
const header = document.querySelector('.header');

function showPage(list, page) {
	let startIndex = (page * itemsPerPage) - itemsPerPage;
	let endIndex = (page * itemsPerPage);
	const studentList = document.querySelector('.student-list');
	studentList.innerHTML = "";
	for (let i = 0; i < list.length; i++) {
		if (i >= startIndex && i < endIndex) {
			let studentItems = `<li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
          </div>
        </li>`;
			studentList.insertAdjacentHTML('beforeend', studentItems);
		}
	}
	return studentList;
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
	let numOfPages = Math.ceil(list.length / itemsPerPage);
	const linkList = document.querySelector('.link-list');
	linkList.innerHTML = "";
	for (let i = 1; i <= numOfPages; i++) {
		let button = `<li>
    <button type="button">${i}</button>
 </li>`;
		linkList.insertAdjacentHTML('beforeend', button);
		linkList.querySelector("button").className = "active";
	}
	linkList.addEventListener('click', (e) => {
		if (e.target.tagName === 'BUTTON') {
			let buttons = e.target;
			const activeButton = document.querySelector('.active');
			activeButton.className = "";
			buttons.className = "active";
			showPage(list, buttons.textContent);
		}
	})
}
// this supplies the search bar within the header of the main page dynamically
const search = document.createElement("label");
search.innerHTML = '';
search.insertAdjacentHTML('beforeend', `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button id ="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`);
header.appendChild(search);
search.addEventListener('keyup', (e) => {
	if (e.target.id === 'search') {
		studentSearch();
	}
})
search.addEventListener('click', (e) => {
	if (e.target.id === 'search') {
		studentSearch();
	}
})
// This supplies the search function, filtering through students as typed. 
function studentSearch() {
	const studentList = document.querySelector('.student-list');
	const search = document.querySelector('#search');
	let input = search.value.toLowerCase();
	let searchResults = [];
	for (let i = 0; i < data.length; i++) {
		const searchName = `${data[i]['name']['first']} ${data[i]['name']['last']}`.toLocaleLowerCase();
		if (searchName.includes(input.toLocaleLowerCase())) {
			searchResults.push(data[i]);
			showPage(searchResults, 1);
			addPagination(searchResults);
		}
		if (searchResults.length == 0) {
			studentList.innerHTML = "";
			const none = `<li class="no-results"> No results, please try again.</li>`;
			studentList.insertAdjacentHTML('beforeend', none);
			addPagination(searchResults);
		}
	}
}
// Call functions
showPage(data, 1);
addPagination(data);