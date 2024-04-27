import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { MovieType } from 'src/types/types';
import { isMovieArr, isMovieType } from 'src/utils/guards';

type ResponseType = {
  results: MovieType[];
};

const searchMovie = async (query: string): Promise<MovieType[]> => {
  const options = {
    method: 'GET',
    url: `  https://api.themoviedb.org/3/search/movie?query=${query}`,
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
    queryKey: ['search_movie'],
    queryFn: async () => {
      return await searchMovie(query);
    },
  });
};
