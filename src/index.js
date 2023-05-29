import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const catsBreed = document.querySelector('.breed-select');
const catsDescr = document.querySelector('.cat-info');
const loading = document.querySelector('.loader');

// 1st option way
// fetchBreeds().then(responce => {
//   responce.forEach(cat => {
//     let catOption = document.createElement('option');
//     catOption.innerHTML = cat.name;
//     catOption.value = cat.id;
//     catsBreed.append(catOption);
//   });
// });

preLoading();

fetchBreeds()
  .then(response => {
    for (const { id, name } of response) {
      let catOption = document.createElement('option');
      catOption.innerHTML = name;
      catOption.value = id;
      catsBreed.append(catOption);
    }
    removeLoading();
  })
  .catch(error => {
    removeLoading();
    if (error.message === '404') {
      Notify.failure('We dont have this breed in the data');
    } else {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
  });

catsBreed.addEventListener('change', onSelect);

function onSelect(evt) {
  preLoading();
  let breedId = evt.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(responce => {
      responce.map(resp => {
        let catImg = resp.url;
        let catDesc = resp.breeds[0];
        catsDescr.innerHTML = createMarkup(catImg, catDesc);
      });
      removeLoading();
    })
    .catch(error => {
      removeLoading();
      if (error.message === '404') {
        Notify.failure('We dont have this breed in the data');
      } else {
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
      }
    });
}

function createMarkup(url, array) {
  removeLoading();

  return `<div class="cat-img" ><img  src="${url} " alt="${array.name}" width="500" height="400"/></div><div class="cat-descr">
  <h1 >${array.name}</h1>
  <p >${array.description}</p>
  <p >${array.temperament}</p></div>`;
}

function preLoading() {
  loading.classList.remove('hidden');
}

function removeLoading() {
  loading.classList.add('hidden');
}
