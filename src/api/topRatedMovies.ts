import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr } from 'src/utils/guards';
import { BASE_URL, TOP_RATED_QUERY } from './constants';

type ResponseType = {
  results: MovieType[];
};

const options = {
  method: 'GET',
  url: `${BASE_URL}/top_rated`,
  params: {
    language: 'en-US',
    page: '1',
  },
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_MOVIE_API_KEY,
  },
};

const fetchTopRated = async (): Promise<MovieType[]> => {
  try {
    const response: AxiosResponse<ResponseType> = await axios.request(options);

    return isMovieArr(response.data.results) ? response.data.results : [];
  } catch {
    throw new Error('Something went wrong with request (Top rated films)');
  }
};

export const useTopRatedMoviesQuery = (): UseQueryResult<MovieType[]> => {
  return useQuery({
    queryKey: [TOP_RATED_QUERY],
    queryFn: async () => {
      return await fetchTopRated();
    },
  });
};
