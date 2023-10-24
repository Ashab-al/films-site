fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/collections', {
    method: 'GET',
    headers: {
        'X-API-KEY': '39fff5b9-9bad-4f10-8453-9473bf112d4e',
        'Content-Type': 'application/json'
    }
  
})
.then(res => res.json())
.then(json => {
    let topFilmsData       = json.items
        filmsData          = appendFilmsToSite(topFilmsData),
        favourites         = [],
        filterButton       = document.querySelector('.filter-button')
        addFavoritesButton = document.querySelectorAll('.add-favorites');
    
        addFavoritesButton.forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent == "Сохранить") {
                    button.innerText = "Фильм сохранен"
                    favourites.push(filmsData[button.value])
                } else {
                    button.innerText = "Сохранить"
                    favourites.pop(filmsData[button.value])
                }
            })
        })

    
    filterButton.addEventListener('click', () => {
        if (filterButton.textContent == "От высокого рейтинга"){
            filterButton.innerText = "От низкого рейтинга"

            let sortedData = filmsData.sort((a, b) => {
                const ratingA = a.ratingKinopoisk || 0; 
                const ratingB = b.ratingKinopoisk || 0;
                return ratingB - ratingA;
            });         
            appendFilmsToSite(sortedData)   

        } else {
            let sortedDataFilms = filmsData.sort((a, b) => {
                const ratingA = a.ratingKinopoisk || 0; 
                const ratingB = b.ratingKinopoisk || 0;
            
                return ratingA - ratingB;
            });         
            appendFilmsToSite(sortedDataFilms)

            filterButton.innerText = "От высокого рейтинга"
        }
        
    })
})
    
function appendFilmsToSite(filmsData){
    let htmlFilms = '';

    filmsData.forEach((value, index) => {
        let genre     = "",
            title     = value.nameRu,
            years     = value.year,
            rating    = value.ratingKinopoisk,
            poster    = value.posterUrl;

        value.genres.forEach((value) => {
            genre +=  value.genre + ", " 
        })

        genre = genre.slice(0, -2)

        htmlFilms += '<div class="film">'+ 
        `<img class="film-img" src="${poster}" alt="">` +
        `<p class="film-title">${title}</p>`+ 
        `<p class="film-yers">Год: ${years}</p>` +
        `<p class="film-rating">Рейтинг: ${rating}</p>` +
        `<p class="film-genres">Жанры: ${genre}</p>` +
        `<button class="add-favorites" value="${index}">Сохранить</button>` +
        '</div>';                              
   })

   document.getElementById('films').innerHTML = htmlFilms
   return filmsData
}


