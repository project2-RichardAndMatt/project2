// https://api.themoviedb.org/3/movie/550?api_key=fb179007c6601d74f9777f1516562eb1
//fb179007c6601d74f9777f1516562eb1
const movieApp = {};
movieApp.apiUrl = "https://api.themoviedb.org/3/movie/top_rated";
movieApp.apiKey = 'fb179007c6601d74f9777f1516562eb1';
movieApp.getRandomMovie = () => {
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
            return movie.original_language === 'en' && movie.vote_count > 10000;
        });
        
        return filteredMovies
    }

    
    for (let i = 1; i < 10; i++) {
        moviePages[i-1] = getMovies(i);
    }

    Promise.all(moviePages)
    .then(moviePages => {
        moviePages.forEach( page => {
            page.forEach( movie => {
                popularEnMovies.push(movie);
            });
        });
        const randomMovie = popularEnMovies[Math.floor(Math.random() * popularEnMovies.length)];
        movieApp.randomBackdrop = `https://www.themoviedb.org/t/p/original/${randomMovie.backdrop_path}`
        const img = document.querySelector('img');
        img.src = movieApp.randomBackdrop;
        movieApp.guessMovie(popularEnMovies,randomMovie);
    });  
};

movieApp.guessMovie = (popularEnMovies,randomMovie) => {
    const dropdown = document.querySelector('select');
    console.log(popularEnMovies);
    popularEnMovies.forEach( movie => {
        option = document.createElement('option');
        option.textContent = movie.original_title;
        option.value = movie.original_title;
        dropdown.append(option);
    });

    dropdown.addEventListener('change', e =>{
        const selection = e.target.value;
        const ul = document.querySelector('ul');
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.textContent = selection;
        li.append(p);
        ul.append(li);        
        
        if (selection === randomMovie.original_title){
            console.log('nice👍🏽');
        } else{
            console.log('oops, try again');
        }
    });
}

movieApp.init = () => {
    movieApp.getRandomMovie();
};
// movieApp.getPoster = () =>{
//     console.log(movieApp.randomMovie)
//     movieApp.backdropUrl = `https://api.themoviedb.org/3/movie/${movieApp.randomMovie}/images`
//     const backdropUrl = new URL(movieApp.backdropUrl);
//     backdropUrl.search = new URLSearchParams({
//         api_key: movieApp.apiKey
//     });
//     fetch (backdropUrl)
//     .then(response => {
//         return response.json();
//     })
//     .then(jsonResponse => {
//         console.log(jsonResponse);
//     })
// }

movieApp.init();