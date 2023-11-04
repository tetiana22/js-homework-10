import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { showLoader, hideLoader, onFetchError } from "./helper";
import './styles.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
    select: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { select, divCatInfo, loader, error } = ref;

let arrBreedsId = [];
showLoader();

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    
    new SlimSelect({
      select: select,
      data: arrBreedsId
    });

  })
  .catch(error => onFetchError())
  .finally(() => loader.classList.remove('is-hidden'));

select.addEventListener('change', onSelectBreed);


function onSelectBreed(event) {
  showLoader();
  
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      hideLoader();
      
      const { url, breeds } = data[0];
        
      divCatInfo.innerHTML = `
        <div class="img">
          <img src="${url}" alt="${breeds[0].name}" width="400"/>
        </div>
        <div class="description">
          <h1>${breeds[0].name}</h1>
          <p>${breeds[0].description}</p>
          <p><b>Temperament:</b> ${breeds[0].temperament}</p>
        </div>
      `;
    })
    .catch(error =>
      onFetchError()
    )
    .finally(() =>
      loader.classList.add('is-hidden')
    );
}