import { UseInfiniteQueryResult, useInfiniteQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr } from 'src/utils/guards';

type RequestType = {
  results: MovieType[];
};

type ResponseType = {
  pageNumber: number;
} & RequestType;

const fetchPopular = async (pageNumber: number): Promise<ResponseType> => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: {
      language: 'en-US',
      page: pageNumber,
    },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTJmNTE0MjRkN2M1MzhmYTVhNGEyOWY1YWE4MTAyMCIsInN1YiI6IjY0MTRmNjRlMGQ1ZDg1MDBiYTBlYWNkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLlDEny0kvYG4dyIR8TOGf0dBj8cW5LZYHaIWwgmSdg',
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
    queryKey: ['popular_movies'],
    queryFn: async ({ pageParam }) => {
      return await fetchPopular(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (currentPage) => {
      return currentPage.pageNumber + 1 ?? 1;
    },
  });
};
