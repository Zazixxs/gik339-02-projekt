let setActiveElement = document.getElementById("addMovieForm"),
    btn = document.getElementById("addMovieButton");


btn.addEventListener('click', () => {
    setActiveElement.classList.toggle("form--active");
})

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
        `<div id="${movie.id}" class="col-md-12 col-lg-6 col-xl-4 mt-5">
            <div class="p-3 list__item list_item--border">
                <h3>${movie.title}</h3>
                <p>${movie.short_description}</p>
                <p>${movie.long_description}</p>
            </div>
        </div>`

        document.getElementById("movieList").insertAdjacentHTML("beforeend", html);
    });
});