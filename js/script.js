/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

const itemsPerPage = 9;
const header = document.querySelector('header');

function showPage( list, page ){
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = (page * itemsPerPage);
   const students = data;
   const studentList = document.querySelector('UL');
   studentList.innerHTML = "";
   for (let i = 0; i < list.length; i++){
      if( i >= startIndex && i < endIndex ){
          let studentItems = document.createElement('li');
          studentItems.insertAdjacentHTML('beforeend',
          `<li class="student-item cf">
          <div class="student-details">
            <img class="avatar" src="${data[i].picture.medium}" alt="Profile Picture">
            <h3>${data[i].name.first} ${data[i].name.last}</h3>
            <span class="email">${data[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">Joined ${data[i].registered.date}</span>
          </div>
        </li>`);
        studentList.appendChild(studentItems);
      }
      
   }
   return studentList;
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
  let numOfPages = Math.ceil(list.length / itemsPerPage);
  const linkList = document.querySelector('.link-list');
  linkList.innerHTML = "";

  for (let i = 1; i <= numOfPages; i++){
    let button = `<li>
    <button type="button">${i}</button>
 </li>`;
    linkList.insertAdjacentHTML('beforeend', button);
    linkList.querySelector("button").className = "active";
  }
  linkList.addEventListener('click', (e) =>{
    if(e.target.tagName === 'BUTTON'){
      let buttons = e.target;
      const activeButton = document.querySelector('.active');
      activeButton.className = "";
      buttons.className = "active";
      showPage(list, buttons.textContent);
    }

  })
}



// this supplies the search bar for students(unsure as to why it doesn't work...)

   const search = document.createElement("label");
   search.innerHTML ='';
   search.insertAdjacentHTML('beforeend', `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button id ="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`
   );
   header.appendChild(search);

   header.addEventListener('keyup', (e) => {
     if(e.target.id === 'search'){
       studentSearch(data);
     }
   })


   header.addEventListener('click', (e) => {
    if(e.target.id === 'search'){
      studentSearch(data);
    }

   })

function studentSearch(){
  const search = document.querySelector('#search');
  let input = search.value.toLowerCase();
  const searchResults = [];
  let searchName = '';
  for (let i = 0; i <data.length; i++){
    searchName = `${data[i]['name']['first']}${data[i]['name']['last'].toLowerCase()}`;
    if (input.length !== 0 && searchName.includes(input)){
      searchResults.push(data[i]);
      showPage(searchResults, 1);
      addPagination(searchResults);


  }
  return searchResults;
}
}




// Call functions
showPage(data, 1);
addPagination(data);

