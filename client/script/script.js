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
        `<div class="col-md-12 col-lg-6 col-xl-4 mt-5">
            <div class="p-3 list__item list_item--border">
                <h3>${movie.title}</h3>
                <p>${movie.short_description}</p>
                <p>${movie.long_description}</p>
            </div>
        </div>`

        document.getElementById("movieList").insertAdjacentHTML("beforeend", html);
    });
});
=======
async function fetchMovies() {
    try {
      const response = await fetch("http://localhost:3000");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const movies = await response.json();
      return movies;
    } catch (error) {
      console.log("Det uppstod ett fel:", error);
    }
  }


  async function createUserList() {
    try {
      const users = await fetchMovies();
      const ul = document.createElement("ul");
      ul.style.listStyleType = "none";
      movies.forEach((movie) => {
        const li = document.createElement("li");
        li.textContent = `${movie.title} ${movie.length}`;
        ul.appendChild(li);
      });
      document.body.appendChild(ul);
    } catch (error) {
      console.log("Det uppstod ett fel:", error);
    }
  }
  
  createUserList();
>>>>>>> Stashed changes
