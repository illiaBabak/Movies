import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr } from 'src/utils/guards';

type ResponseType = {
  results: MovieType[];
  dates: {
    maximum: string;
    minimum: string;
  };
};

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/upcoming',
  params: {
    language: 'en-US',
    page: '1',
  },
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTJmNTE0MjRkN2M1MzhmYTVhNGEyOWY1YWE4MTAyMCIsInN1YiI6IjY0MTRmNjRlMGQ1ZDg1MDBiYTBlYWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLlDEny0kvYG4dyIR8TOGf0dBj8cW5LZYHaIWwgmSdg',
  },
};

export const fetchUpcoming = async (): Promise<MovieType[]> => {
  try {
    const response: AxiosResponse<ResponseType> = await axios.request(options);
    const { results, dates } = response.data;

    const minimumDate = new Date(dates.minimum);
    const maximumDate = new Date(dates.maximum);

    return isMovieArr(results)
      ? results.filter((movie) => {
          const movieReleaseDate = new Date(movie.release_date);
          return movieReleaseDate >= minimumDate && movieReleaseDate <= maximumDate;
        })
      : [];
  } catch {
    throw new Error('Something went wrong with request (Upcoming films)');
  }
};
