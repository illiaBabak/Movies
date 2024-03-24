import axios, { AxiosResponse } from 'axios';
import { GenreType } from 'src/types/types';
import { isGenreArr } from 'src/utils/guards';

type ResponseType = {
  genres: GenreType[];
};

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  params: {
    language: 'en-US',
  },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTJmNTE0MjRkN2M1MzhmYTVhNGEyOWY1YWE4MTAyMCIsInN1YiI6IjY0MTRmNjRlMGQ1ZDg1MDBiYTBlYWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLlDEny0kvYG4dyIR8TOGf0dBj8cW5LZYHaIWwgmSdg',
  },
};

export const fetchGenres = async (): Promise<GenreType[]> => {
  try {
    const response: AxiosResponse<ResponseType> = await axios.request(options);
    const genresArr = Object.values(response.data)[0];

    return isGenreArr(genresArr) ? genresArr : [];
  } catch {
    throw new Error('Something went wrong with API (genres)');
  }
};
