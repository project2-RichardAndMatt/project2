// https://api.themoviedb.org/3/movie/550?api_key=fb179007c6601d74f9777f1516562eb1 

//fb179007c6601d74f9777f1516562eb1 



const movieApp = {}; 

movieApp.apiUrl = "https://api.themoviedb.org/3/movie/top_rated"; 
movieApp.apiKey = 'fb179007c6601d74f9777f1516562eb1';

movieApp.getRandomMovie = () => {
    const url = new URL(movieApp.apiUrl); 
    url.search = new URLSearchParams({ 
        api_key: movieApp.apiKey,
    }); 
    
    fetch(url) 
    .then(response => { 
        return response.json();
    }) 
    .then(jsonResponse => { 
        
        const popularEnMovies = jsonResponse.results.filter ( movies => {
            return movies.original_language === 'en';
        });
        const randomMovie = popularEnMovies[Math.floor(Math.random()*popularEnMovies.length)];
        movieApp.randomBackdrop = `https://www.themoviedb.org/t/p/original/${randomMovie.backdrop_path}`
        img = document.querySelector('img');
        img.src = movieApp.randomBackdrop;
    });
};

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








// Extract list of popular movies


movieApp.init();