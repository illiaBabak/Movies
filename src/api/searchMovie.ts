import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr, isMovieType } from 'src/utils/guards';
import { SEARCH_QUERY, SEARCH_URL } from './constants';

type ResponseType = {
  results: MovieType[];
};

const searchMovie = async (query: string): Promise<MovieType[]> => {
  const options = {
    method: 'GET',
    url: `${SEARCH_URL}${query}`,
    params: {
      language: 'en-US',
      page: 1,
    },
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_MOVIE_API_KEY,
    },
  };

  try {
    const response: AxiosResponse<ResponseType> = await axios.request(options);
    const filteredArr = response.data.results.filter((el) => isMovieType(el));

    return isMovieArr(filteredArr) ? filteredArr : [];
  } catch {
    throw new Error('Something went wrong with request (search)!');
  }
};

export const useSearchMovie = (query: string): UseQueryResult<MovieType[]> => {
  return useQuery({
    queryKey: [SEARCH_QUERY],
    queryFn: async () => {
      return await searchMovie(query);
    },
  });
};
