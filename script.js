// https://api.themoviedb.org/3/movie/550?api_key=fb179007c6601d74f9777f1516562eb1
//fb179007c6601d74f9777f1516562eb1
const movieApp = {};
movieApp.apiUrl = "https://api.themoviedb.org/3/movie/top_rated";
movieApp.apiKey = 'fb179007c6601d74f9777f1516562eb1';
movieApp.getPopularMovies = () => {
    const popularEnMovies = [];
    const moviePages = [];
    async function getMovies(page){
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
    }
    
    for (let i = 1; i < 136; i++) {
        moviePages[i-1] = getMovies(i);
    }

    Promise.all(moviePages)
    .then(moviePages => {
        moviePages.forEach( page => {
            page.forEach( movie => {
                popularEnMovies.push(movie);
            });
        });
        movieApp.getRandomMovie(popularEnMovies);
    });  
};

movieApp.getRandomMovie = popularEnMovies => {
    const randomMovie = popularEnMovies[Math.floor(Math.random() * popularEnMovies.length)];
    movieApp.randomBackdrop = `https://www.themoviedb.org/t/p/original/${randomMovie.backdrop_path}`
    const img = document.querySelector('img');
    img.src = movieApp.randomBackdrop;
    movieApp.guessMovie(popularEnMovies, randomMovie);
}

movieApp.guessMovie = (popularEnMovies,randomMovie) => {
    const datalist = document.querySelector('datalist');
    const input = document.querySelector('input');
    
    popularEnMovies.forEach( movie => {
        option = document.createElement('option');
        option.textContent = movie.original_title;
        option.value = movie.original_title;
        datalist.append(option);
    });
    const h3 = document.querySelector('h3');
    let guessCount = 5;
    h3.textContent = `${guessCount} guesses remaining`
    
    input.addEventListener('input', e =>{
        popularEnMovies.forEach( movie =>{
            if(input.value === movie.original_title){
                const selection = e.target.value;
                const ul = document.querySelector('ul');
                const li = document.createElement('li');
                const p = document.createElement('p');
                p.textContent = selection;
                guessCount--;
                const img = document.querySelector('img');
                const h2 = document.querySelector('h2');

                if (selection === randomMovie.original_title) {
                    img.classList.remove(`blur${guessCount + 1}`);
                    p.textContent = selection + '✅';
                    h2.textContent = `Congratulations! you solved it in ${5 - guessCount} guesses`; 
                    input.disabled = true;
                    
                } else {
                    img.classList.remove(`blur${guessCount + 1}`);
                    img.classList.add(`blur${guessCount}`);
                    p.textContent = selection + '❌';
                    if (guessCount === 0) {
                        h2.textContent = `Sorry you lost. The movie was '${randomMovie.original_title}'. Reset to play again.`; 
                        input.disabled = true;
                    }
                }
                li.append(p);
                ul.append(li);
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