import axios from 'axios';
import { fetchBreeds, fetchCatByBreed, showError } from './cat_api.js';

const BASE_URL = "https://api.thecatapi.com/v1/";
const BREED_ENDPOINT = "breeds";
const CAT_IMAGE_ENDPOINT = "images/search";
const API_KEY =
  "live_mhqO1ZiqrBcdtCwcuiuzDdjrhI7YtszSY8DIuxy5ABiMQKTBzEowentbUL1apHNy";

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');



breedSelect.addEventListener("change", (event) => {
    const breedId = breedSelect.value;
    fetchCatByBreed(breedId);
  });
  
  
  fetchBreeds()
    .then(breeds => {
      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.value;
        option.text = breed.text;
  
        breedSelect.appendChild(option);
      });
    })
    .catch(showError);
  
  function breedTemplate(breed) {
    return `
      <div class="breed-card card">
        <div class="image-container">
          <img src="${breed.image.url}" alt="#" class="breed-image" />
        </div>
        <div class="breed-body">
          <h4 class="breed-name">${breed.name}</h4>
          <p class="breed-temperament">${breed.temperament}</p>
          <p class="breed-desc">${breed.description}</p>
        </div>
      </div>
    `;
  }
  
  
  
  function renderBreed(breed) {
    const markup = breedTemplate(breed);
    catInfo.insertAdjacentHTML('beforeend', markup);
  }