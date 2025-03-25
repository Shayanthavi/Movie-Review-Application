import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reviews';

const getReviews = async (movieId) => {
  const response = await axios.get(`${API_URL}/${movieId}`);
  return response.data;
};

const addReview = async (movieId, content) => {
  const response = await axios.post(API_URL, { movieId, content });
  return response.data;
};

export default { getReviews, addReview };