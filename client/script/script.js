//const { load } = require("signal-exit");

let form = document.getElementById("addMovieForm"),
    btn = document.getElementById("addMovieButton");

/* Sets the form as active, and displaying it. */
btn.addEventListener('click', () => {
    form.classList.toggle("form--active");
})


function handleChange(e)
{
    let currentList = e.parentElement.parentElement;
    let listItemArray = currentList.querySelector(".list__item").children;
    let formArray = form.querySelectorAll(".form-group");

    //Get the text from select list item and transfer it to the form
    for(let i = 0; i < listItemArray.length; i++)
    {
        formArray[i].lastElementChild.value = listItemArray.item(i).innerHTML;
    }

    //Check if the form is opened or not - if not, open it
    if(!form.classList.contains("form--active"))
    {
        form.classList.toggle("form--active");
    }
}


// --------------- CRUD - Read --------------- //



const url = 'http://localhost:3000/';

function loadUrl(url) 
{
  return new Promise(async function (resolve, reject) 
  {
    const getResolve = await fetch(url);

    resolve(getResolve.json());

  });
}

loadUrl(url).then((movies) => {

    movies.forEach((movie) => {
        
        const html = 
        `
        <div class="list col-md-12 col-lg-6 col-xl-4 mt-5">
        <div id="${movie.id}" class="p-3 list__item list_item--border">
        <h3>${movie.title}</h3>
        <p>${movie.short_description}</p>
        <p>${movie.long_description}</p>
        </div>
        <div class="button-container mb-2">
            <button type="button" class="btn delete" data-bs-toggle="" data-bs-target="">
                    Delete
            </button>
            <button type="button" class="btn change" data-bs-toggle="" data-bs-target="" onclick="handleChange(this)">
                    Change
            </button>
        </div>
        </div>`

        document.getElementById("movieList").insertAdjacentHTML("beforeend", html);
    });
});

// --------------- CRUD - Create --------------- //

const addMovieForm = document.getElementById("addMovieForm");
addMovieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const movie = {
        title: addMovieForm.title.value,
        length: addMovieForm.length.value,
        short_description: addMovieForm.short_description.value,
        long_description: addMovieForm.long_description.value
    }

    fetch(url + "create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((err) => console.log(err));
});

// --------------- CRUD - Delete --------------- //

const deleteButton = document.querySelectorAll(".delete");
deleteButton.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.target.parentElement.parentElement.id;

    fetch(url + id, {
        method: "DELETE"
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        location.reload();
    })
    .catch((err) => console.log(err));
});



