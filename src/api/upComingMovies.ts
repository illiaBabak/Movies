import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr } from 'src/utils/guards';
import { BASE_URL, UP_COMING_QUERY } from './constants';

type ResponseType = {
  results: MovieType[];
  dates: {
    maximum: string;
    minimum: string;
  };
};

const options = {
  method: 'GET',
  url: `${BASE_URL}/upcoming`,
  params: {
    language: 'en-US',
    page: '1',
  },
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_MOVIE_API_KEY,
  },
};

const fetchUpcoming = async (): Promise<MovieType[]> => {
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

export const useUpComingMoviesQuery = (): UseQueryResult<MovieType[]> => {
  return useQuery({
    queryKey: [UP_COMING_QUERY],
    queryFn: async () => {
      return await fetchUpcoming();
    },
  });
};
