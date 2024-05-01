import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr } from 'src/utils/guards';
import { BASE_URL, POPULARS_QUERY } from './constants';

type RequestType = {
  results: MovieType[];
};

type ResponseType = {
  pageNumber: number;
} & RequestType;

const fetchPopular = async (pageNumber: number): Promise<ResponseType> => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/popular`,
    params: {
      language: 'en-US',
      page: pageNumber,
    },
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_MOVIE_API_KEY,
    },
  };

  try {
    const response: AxiosResponse<RequestType> = await axios.request(options);

    return isMovieArr(response.data.results)
      ? { results: response.data.results, pageNumber }
      : { results: [], pageNumber };
  } catch {
    throw new Error('Something went wrong with request (Popular films)');
  }
};

export const usePopularMoviesInfiniteQuery = (): UseInfiniteQueryResult<
  { pages: ResponseType[] } | undefined,
  Error
> => {
  return useInfiniteQuery({
    queryKey: [POPULARS_QUERY],
    queryFn: async ({ pageParam }) => {
      return await fetchPopular(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (currentPage) => {
      return currentPage.pageNumber + 1 ?? 1;
    },
  });
};
