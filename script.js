const movieApp = {};
movieApp.apiUrl = "https://api.themoviedb.org/3/movie/top_rated";
movieApp.apiKey = 'fb179007c6601d74f9777f1516562eb1';
movieApp.popularEnMovies = [];


async function getMoviesByPage(page){
    const url = new URL(movieApp.apiUrl);
    url.search = new URLSearchParams({
        api_key: movieApp.apiKey,
        page: page
    });
    const response = await fetch(url);
    const data = await response.json();
    const filteredMovies = data.results.filter(movie => {
        return movie.original_language === 'en' && movie.vote_count > 9500;
    });
    return filteredMovies
};

movieApp.getPopularMovies = () => {
    const moviePages = [];
    for (let i = 1; i < 136; i++) {
        moviePages[i-1] = getMoviesByPage(i);
    };
    Promise.all(moviePages)
    .then(moviePages => {
        moviePages.forEach( page => {
            page.forEach( movie => {
                movieApp.popularEnMovies.push(movie);
            });
        });
        movieApp.getRandomMovie();
        movieApp.populateMovieList();
    });  
};

movieApp.getRandomMovie = () => {
    movieApp.randomMovie = movieApp.popularEnMovies[Math.floor(Math.random() * movieApp.popularEnMovies.length)];
    movieApp.randomBackdropUrl = `https://www.themoviedb.org/t/p/original/${movieApp.randomMovie.backdrop_path}`
    movieApp.imgElement = document.querySelector('img');
    movieApp.imgElement.src = movieApp.randomBackdropUrl;
    movieApp.imgElement.alt = `Backdrop from the movie '${movieApp.randomMovie.original_title}'`;
}

movieApp.populateMovieList = () => {
    movieApp.popularEnMovies.forEach( movie => {
        const option = document.createElement('option');
        option.textContent = movie.original_title;
        option.value = movie.original_title;
        document.querySelector('datalist').append(option);
    });
    movieApp.guessMovie();
}

movieApp.guessMovie = () => {
    let guessCount = 5;
    const h3 = document.querySelector('h3');
    h3.textContent = `${guessCount} guesses remaining`
    const input = document.querySelector('input');
    input.addEventListener('input', e =>{
        movieApp.popularEnMovies.forEach( movie =>{
            if(input.value === movie.original_title){
                const selection = e.target.value;
                const li = document.createElement('li');
                const p = document.createElement('p'); 
                p.classList.add("slide-animation");
                li.style.zIndex = (guessCount);
                p.textContent = selection; 
                guessCount--;
                const h2 = document.querySelector('h2');
                if (selection === movieApp.randomMovie.original_title) {
                    movieApp.imgElement.classList.remove(`blur${guessCount + 1}`);
                    p.textContent = selection + '✅'; 
                    h2.textContent = `Congratulations! you solved it in ${5 - guessCount} guesses`; 
                    input.disabled = true;
                } else {
                    movieApp.imgElement.classList.remove(`blur${guessCount + 1}`);
                    movieApp.imgElement.classList.add(`blur${guessCount}`);
                    p.textContent = selection + '❌'; 
                    if (guessCount === 0) {
                        h2.textContent = `Sorry you lost. The movie was '${movieApp.randomMovie.original_title}'. Reset to play again.`; 
                        input.disabled = true;
                    }
                }
                li.append(p);
                document.querySelector('ul').append(li); 
                h3.textContent = `${guessCount} guesses remaining`;
                input.blur();
            }
        });        
    });
};

movieApp.init = () => {
    movieApp.getPopularMovies();
}

movieApp.init();