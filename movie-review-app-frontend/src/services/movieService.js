import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movies';

const getMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${API_URL}/${movieId}`);
  return response.data;
};

export default { getMovies, getMovieDetails };