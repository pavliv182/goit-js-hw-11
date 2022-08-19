import axios from 'axios';

BASE_URL = 'https://pixabay.com/api/';

API_KEY = '29218892-5c728a61ff7c291bb1551bea9';

const options =
  '&image_type=photo&orientation=horizontal&safesearch=true&per_page=20';

export async function fetchImages(q, page = 1) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${q}${options}&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
