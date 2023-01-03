// https://api.themoviedb.org/3/movie/550?api_key=fb179007c6601d74f9777f1516562eb1 

//fb179007c6601d74f9777f1516562eb1 



const movieApp = {}; 

movieApp.apiUrl = "https://api.themoviedb.org/3/movie/popular"; 
movieApp.posterUrl = "https://image.tmdb.org/t/p/"
movieApp.apiKey = 'fb179007c6601d74f9777f1516562eb1'; 

const url = new URL(movieApp.apiUrl); 
url.search = new URLSearchParams({ 
    api_key: movieApp.apiKey, 
})  

posterUrl = new URL(movieApp.posterUrl); 

posterUrl.search = new URLSearchParams({ 
    poster_size: 500, 
    file_path: "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
})

console.log(url);
console.log(posterUrl);
movieApp.init = () => { 

    fetch(url) 
    .then((response) => { 
    return response.json();
    }) 
    .then((jsonResponse) => { 
    console.log(jsonResponse); 
    

    })

    

    


} 

 






// Extract list of popular movies


movieApp.init();