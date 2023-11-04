const ref = {
    select: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { select, divCatInfo, loader, error } = ref;

export function showLoader() {
    divCatInfo.innerHTML = '';
    loader.classList.remove('is-hidden');
    select.classList.add('is-hidden');
    divCatInfo.style.visibility = 'hidden';
}

export function hideLoader() {
    loader.classList.add('is-hidden');
     select.classList.remove('is-hidden');
     divCatInfo.style.visibility = 'visible';
}

export function onFetchError() {
    Notiflix.Notify.failure('Oops! Something went wrong!');
    select.classList.remove('is-hidden');
  }