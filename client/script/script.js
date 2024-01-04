let setActiveElement = document.getElementById("addMovieForm"),
    btn = document.getElementById("addMovieButton");


btn.addEventListener('click', () => {
    setActiveElement.classList.toggle("form--active");
})