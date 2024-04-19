import { FavouritesList } from 'src/types/types';
import { isFavourites } from './guards';

export const getFavourites = (): FavouritesList[] => {
  const favouritesLocalStorage = localStorage.getItem('favourites');
  const favouriteData: unknown = favouritesLocalStorage ? JSON.parse(favouritesLocalStorage) : '';
  const parsedFavourites = isFavourites(favouriteData) ? favouriteData : [];

  return parsedFavourites;
};
