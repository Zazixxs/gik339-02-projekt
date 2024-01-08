let setActiveElement = document.getElementById("addMovieForm"),
    btn = document.getElementById("addMovieButton"),
    buttonTypeChange = document.querySelectorAll(".change");

    console.log(buttonTypeChange);

btn.addEventListener('click', () => {
    setActiveElement.classList.toggle("form--active");
})

buttonTypeChange.forEach(item => {
    item.addEventListener('click', (e) => {
        this.handleChange(e);
    })
})

function handleChange(e)
{
    console.log(e.target);
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
                <button type="button" class="btn change" data-bs-toggle="" data-bs-target="">
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