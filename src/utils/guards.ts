import { GenreType, MovieType, UserData } from 'src/types/types';

const isMovieType = (data: unknown): data is MovieType => {
  return (
    !!data &&
    typeof data === 'object' &&
    'adult' in data &&
    'backdrop_path' in data &&
    'genre_ids' in data &&
    'id' in data &&
    'original_language' in data &&
    'original_title' in data &&
    'overview' in data &&
    'popularity' in data &&
    'poster_path' in data &&
    'release_date' in data &&
    'vote_average' in data &&
    'vote_count' in data &&
    typeof data.adult === 'boolean' &&
    typeof data.backdrop_path === 'string' &&
    Array.isArray(data.genre_ids) &&
    data.genre_ids.every((el) => typeof el === 'number') &&
    typeof data.id === 'number' &&
    typeof data.original_language === 'string' &&
    typeof data.original_title === 'string' &&
    typeof data.overview === 'string' &&
    typeof data.popularity === 'number' &&
    typeof data.poster_path === 'string' &&
    typeof data.release_date === 'string' &&
    typeof data.vote_average === 'number' &&
    typeof data.vote_count === 'number'
  );
};

export const isMovieArr = (data: unknown): data is MovieType[] => {
  return Array.isArray(data) && data.every((el) => isMovieType(el));
};

const isGenre = (data: unknown): data is GenreType => {
  return (
    !!data &&
    typeof data === 'object' &&
    'id' in data &&
    'name' in data &&
    typeof data.id === 'number' &&
    typeof data.name === 'string'
  );
};

export const isGenreArr = (data: unknown): data is GenreType[] => {
  return Array.isArray(data) && data.every((el) => isGenre(el));
};

export const isUserData = (data: unknown): data is UserData => {
  return (
    !!data &&
    typeof data === 'object' &&
    'username' in data &&
    'password' in data &&
    'location' in data &&
    'profilePicture' in data &&
    'created_date' in data &&
    'id' in data &&
    typeof data.id === 'number' &&
    typeof data.username === 'string' &&
    typeof data.password === 'string' &&
    typeof data.profilePicture === 'string' &&
    typeof data.location === 'string' &&
    typeof data.created_date === 'string'
  );
};

export const isUserDataArr = (data: unknown): data is UserData[] => {
  return Array.isArray(data) && data.every((el) => isUserData(el));
};
