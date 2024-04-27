import { GenreType, MovieType, UserData, FavouritesList } from 'src/types/types';

const isObj = (data: unknown): data is object => !!data && typeof data === 'object';

const isNumber = (data: unknown): data is number => typeof data === 'number';

const isString = (data: unknown): data is string => typeof data === 'string';

const isBool = (data: unknown): data is boolean => typeof data === 'boolean';

const hasFieldsMovie = (data: object): data is MovieType => {
  return (
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
    'vote_count' in data
  );
};

export const isMovieType = (data: unknown): data is MovieType => {
  return (
    isObj(data) &&
    hasFieldsMovie(data) &&
    isBool(data.adult) &&
    isString(data.backdrop_path) &&
    Array.isArray(data.genre_ids) &&
    data.genre_ids.every((el) => isNumber(el)) &&
    isNumber(data.id) &&
    isNumber(data.vote_count) &&
    isNumber(data.vote_average) &&
    isNumber(data.popularity) &&
    isString(data.original_language) &&
    isString(data.original_title) &&
    isString(data.overview) &&
    isString(data.poster_path) &&
    isString(data.release_date)
  );
};

export const isMovieArr = (data: unknown): data is MovieType[] => {
  return Array.isArray(data) && data.every((el) => isMovieType(el));
};

const isGenre = (data: unknown): data is GenreType => {
  return isObj(data) && 'id' in data && 'name' in data && isNumber(data.id) && isString(data.name);
};

export const isGenreArr = (data: unknown): data is GenreType[] => {
  return Array.isArray(data) && data.every((el) => isGenre(el));
};

const hasFieldsUser = (data: object): data is UserData => {
  return (
    'username' in data &&
    'password' in data &&
    'location' in data &&
    'profilePicture' in data &&
    'created_date' in data &&
    'id' in data
  );
};

export const isUserData = (data: unknown): data is UserData => {
  return (
    isObj(data) &&
    hasFieldsUser(data) &&
    isNumber(data.id) &&
    isString(data.created_date) &&
    isString(data.location) &&
    isString(data.password) &&
    isString(data.profilePicture) &&
    isString(data.username)
  );
};

export const isUserDataArr = (data: unknown): data is UserData[] => {
  return Array.isArray(data) && data.every((el) => isUserData(el));
};

const isFavourite = (data: unknown): data is FavouritesList => {
  return isObj(data) && 'userId' in data && isNumber(data.userId) && 'movies' in data && isMovieArr(data.movies);
};

export const isFavourites = (data: unknown): data is FavouritesList[] => {
  return Array.isArray(data) && data.every((el) => isFavourite(el));
};
