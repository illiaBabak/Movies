import { useContext, useEffect, useState } from 'react';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { Movie } from 'src/components/Movie';
import { GlobalContext } from 'src/root';
import { MovieType } from 'src/types/types';
import { getFavourites } from 'src/utils/getFavouritesMovies';

export const MyListPage = (): JSX.Element => {
  const { currentUser } = useContext(GlobalContext);
  const [favouritesMovies, setFavouritesMovies] = useState<MovieType[]>([]);

  useEffect(() => {
    const favourites = getFavourites();
    const favouritesCurrentUser = favourites[currentUser?.id ?? 0];

    setFavouritesMovies(favouritesCurrentUser.movies);
  }, [currentUser]);

  return (
    <div className='my-list-page'>
      <Header />
      <div className='my-list-content'>
        <h1 className='my-list-title'>My list</h1>
        <div className='my-list-movies'>
          {favouritesMovies.length ? (
            favouritesMovies.map((movie) => <Movie key={`my-list-fav-movie-${movie.id}`} movie={movie} />)
          ) : (
            <h3>List is empty</h3>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
