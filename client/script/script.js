let form = document.getElementById("addMovieForm"),
    btn = document.getElementById("addMovieButton");

/* Sets the form as active, and displaying it. */
btn.addEventListener('click', () => {
    form.classList.toggle("form--active");
})


function handleChange(e)
{
    currentList = e.parentElement.parentElement;
    listItemArray = currentList.querySelector(".list__item").children;
    formArray = form.querySelectorAll(".form-group");

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


// --------------- CRUD - Create --------------- //



const url = 'http://localhost:3000/';

function loadUrl(url) 
{
  return new Promise(async function (resolve, reject) 
  {
    const getResolve = await fetch(url);

    resolve(getResolve.json());

  });
}

const promise = loadUrl(url);

promise.then((movies) => {
    console.log(movies);

    movies.forEach((movie) => {
        
        const html = 
        `
        <div class="list col-md-12 col-lg-6 col-xl-4 mt-5">
            <div class="button-container mb-2">
                <button type="button" class="btn delete" data-bs-toggle="" data-bs-target="">
                        Delete
                </button>
                <button type="button" class="btn change" data-bs-toggle="" data-bs-target="" onclick="handleChange(this)">
                        Change
                </button>
            </div>
            <div id="${movie.id}" class="p-3 list__item list_item--border">
                <h3>${movie.title}</h3>
                <p>${movie.short_description}</p>
                <p>${movie.long_description}</p>
            </div>
        </div>`

        document.getElementById("movieList").insertAdjacentHTML("beforeend", html);
    });
});