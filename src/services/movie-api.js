const BASE_URL = 'https://api.themoviedb.org/3';
const apiKey = 'd6dec23a127639ce0ae8e478cc56da14';

const fetchWithErrorHandling = async (url = '', config = {}) => {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
};

const fetchTrendingMovies = () => {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${apiKey}`,
  );
};

const fetchSearchMovies = query => {
  return fetchWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
};

const fetchMovieDetails = movieId => {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${apiKey}&language=en-US`,
  );
};

const fetchMovieCredits = movieId => {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
  );
};

const fetchMovieReviews = movieId => {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`,
  );
};

export {
  fetchTrendingMovies,
  fetchSearchMovies,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};
