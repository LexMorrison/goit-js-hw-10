const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const API_KEY =
  'live_Vs8ZBrdIMBR3fgXbJP6X28pomOh94fyTD7gHFLcqODDsKiGwVo9GftYsx54o4shz';
const CAT_INFO = 'https://api.thecatapi.com/v1/images/search';

function fetchBreeds() {
  return fetch(`${BASE_URL}?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(`${CAT_INFO}?api_key=${API_KEY}&breed_ids=${breedId}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export { fetchBreeds, fetchCatByBreed };
