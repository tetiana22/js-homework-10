const BASE_URL = "https://api.thecatapi.com/v1/";
const BREED_ENDPOINT = "breeds";
const CAT_IMAGE_ENDPOINT = "images/search";
const API_KEY =
  "live_mhqO1ZiqrBcdtCwcuiuzDdjrhI7YtszSY8DIuxy5ABiMQKTBzEowentbUL1apHNy";
function showError(error) {
    console.error('Виникла помилка:', error);
  }
  
  function fetchBreeds() {
    const urlBreeds = 'https://api.thecatapi.com/v1/breeds';
    return fetch(urlBreeds)
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
      .then(data => {
        return data.map(breed => {
          return { value: breed.id, text: breed.name };
        });
      })
      .catch(showError);
  }
  
  


  function fetchCatByBreed(breedId) {
    const url = `${BASE_URL}${BREED_ENDPOINT}/${breedId}`;
    const options = {
      headers: {
        "x-api-key": API_KEY,
      },
    };
  
    return fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
    
      .catch(showError);
  }
  

  export { fetchBreeds, showError, fetchCatByBreed };

