import { UseQueryResult, useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { GenreType } from 'src/types/types';
import { isGenreArr } from 'src/utils/guards';
import { GENRES_QUERY, GENRES_URL } from './constants';

type ResponseType = {
  genres: GenreType[];
};

const options = {
  method: 'GET',
  url: GENRES_URL,
  params: {
    language: 'en-US',
  },
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_MOVIE_API_KEY,
  },
};

const fetchGenres = async (): Promise<GenreType[]> => {
  try {
    const response: AxiosResponse<ResponseType> = await axios.request(options);
    const genresArr = Object.values(response.data)[0];

    return isGenreArr(genresArr) ? genresArr : [];
  } catch {
    throw new Error('Something went wrong with API (genres)');
  }
};

export const useGenresQuery = (): UseQueryResult<GenreType[]> => {
  return useQuery({
    queryKey: [GENRES_QUERY],
    queryFn: async () => {
      return await fetchGenres();
    },
  });
};
