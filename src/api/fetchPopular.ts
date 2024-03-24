import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr } from 'src/utils/guards';

type ResponseType = {
  results: MovieType[];
};

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular',
  params: {
    language: 'en-US',
    page: 1,
  },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTJmNTE0MjRkN2M1MzhmYTVhNGEyOWY1YWE4MTAyMCIsInN1YiI6IjY0MTRmNjRlMGQ1ZDg1MDBiYTBlYWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLlDEny0kvYG4dyIR8TOGf0dBj8cW5LZYHaIWwgmSdg',
  },
};

export const fetchPopular = async (): Promise<MovieType[]> => {
  try {
    const response: AxiosResponse<ResponseType> = await axios.request(options);

    return isMovieArr(response.data.results) ? response.data.results : [];
  } catch {
    throw new Error('Something went wrong with request (Popular films)');
  }
};
