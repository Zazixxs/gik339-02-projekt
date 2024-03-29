
let form = document.getElementById("addMovieForm"),
    btn = document.getElementById("addMovieButton"),
    movieTitle = document.getElementById("title"),
    movieShortDescription = document.getElementById("short_description"),
    movieLongDescription = document.getElementById("long_description"),
    movieGenre = document.getElementById("genre");


function resetForm()
{
    movieTitle.value = "";
    movieShortDescription.value = "";
    movieLongDescription.value = "";
    genre.value = "";
}    

resetForm();

/* Sets the form as active, and displaying it. */
btn.addEventListener('click', () => {
    form.classList.toggle("form--active");
    if(!form.classList.contains("form--active"))
    {   
        setTimeout(function(){
            resetForm();
        }, 1000);
    } 
})

function handleChange(e)
{
    let currentList = e.parentElement.parentElement;
    let listItemArray = currentList.querySelector(".list__item").children;
    let formArray = form.querySelectorAll(".form-group");
    let formUpdateButton = document.getElementById("update");
    
    localStorage.setItem("changeID", e.parentElement.previousElementSibling.id);
    
    if(formUpdateButton.classList.contains("btn--hidden"))
    formUpdateButton.classList.toggle("btn--hidden");
    //localStorage.getItem("changeID");  <---- Use this to retrieve the ID

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
    window.scrollTo(0, 0);
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

const genreMap = new Map();
genreMap.set('Action', '255,0,0');
genreMap.set('Comedy', '0,255,0');
genreMap.set('Drama', '0,0,255');
genreMap.set('Fantasy', '255,150,0');
genreMap.set('Horror', '255,0,255');
genreMap.set('Sci-fi', '0,255,255');

function renderMovies(){
    loadUrl(url).then((movies) => {
        
        document.getElementById("movieList").innerHTML = "";
        movies.forEach((movie) => {
            
            const html = 
            `
            <div class="list col-md-12 col-lg-6 col-xl-4 mt-5" >
                <div id="${movie.id}" class="p-3 list__item list_item--border" style="border-image: radial-gradient(rgb(0, 0, 36),rgb(0, 0, 36),rgb(0, 0, 36),rgb(0, 0, 36), rgb(${genreMap.get(movie.genre)})) 1">
                    <h3>${movie.title}</h3>
                    <p>${movie.short_description}</p>
                    <p>${movie.long_description}</p>
                    <p>${movie.genre}</p>
                </div>
            <div class="button-container mb-2">
                <button type="button" class="btn delete" data-bs-toggle="" data-bs-target="" onclick="handleDelete(this)">
                    Delete
                </button>
                <button type="button" class="btn change" data-bs-toggle="" data-bs-target="" onclick="handleChange(this)">
                    Change
                </button>
            </div>
            `
            
            document.getElementById("movieList").insertAdjacentHTML("beforeend", html);
        });
    });
}

renderMovies();

// --------------- CRUD - Create --------------- //

const addMovieForm = document.getElementById("addMovieForm");
addMovieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const movie = {
        title: addMovieForm.title.value,
        short_description: addMovieForm.short_description.value,
        long_description: addMovieForm.long_description.value,
        genre: addMovieForm.genre.value
    }
    
    if(e.submitter.id === "create")
    {
        fetch(url + "create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.message) {
                alert('Serverns svar: ' + data.message);
                resetForm();
                renderMovies();
            } else if (data.error) {
                alert('Ett fel inträffade: ' + data.error);
            }
        })
        .catch((err) => console.log(err));
    }

    // --------------- CRUD - Update --------------- //

    else
    {
        let id = localStorage.getItem("changeID");
        fetch(url + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movie)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log('Server Data:', data);
            if (data.message) {
                alert('Serverns svar: ' + data.message);
                resetForm();
                renderMovies();
            } else if (data.error) {
                alert('Ett fel inträffade: ' + data.error);
            }
        })
        .catch((err) => console.log('Error:', err));
    }
});
// --------------- CRUD - Delete --------------- //

function handleDelete(e)
{
    loadUrl(url).then((movies) => {
        movies.forEach((movie) => {
            if(movie.id == e.parentElement.parentElement.querySelector(".list__item").id)
            {
                if(confirm(`Are you sure you want to delete ${movie.title}?`))
                {
                    const id = e.parentElement.parentElement.querySelector(".list__item").id;
                    fetch(url + id, {
                        method: "DELETE"
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message) {
                            alert('Serverns svar: ' + data.message);
                            resetForm();
                            renderMovies();
                        } else if (data.error) {
                            alert('Ett fel inträffade: ' + data.error);
                        }
                    })
                    .catch((err) => console.log(err));
                }
            }
        });
    });
}