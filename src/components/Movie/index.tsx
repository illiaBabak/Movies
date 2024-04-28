import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from 'src/root';
import { FavouritesList, MovieType } from 'src/types/types';
import { roundVote } from 'src/utils/format';
import { getFavourites } from 'src/utils/getFavouritesMovies';
import { InfoWindow } from '../InfoWindow';

type Props = {
  movie: MovieType;
};

export const Movie = ({ movie }: Props): JSX.Element => {
  const { genres, currentUser } = useContext(GlobalContext);
  const [favouritesMovies, setFavouritesMovies] = useState<MovieType[]>([]);
  const [shouldShowInfo, setShouldShowInfo] = useState(false);
  const [isLoadingIcon, setIsLoadingIcon] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const favourites = getFavourites();

      const favouritesMoviesCurrentUser = favourites[currentUser.id].movies;

      setFavouritesMovies(favouritesMoviesCurrentUser);
    } else setFavouritesMovies([]);
  }, [currentUser]);

  const addMovieToList = () => {
    const favourites = getFavourites();

    const favouritesCurrentUser = favourites[currentUser?.id ?? 0];

    favouritesCurrentUser.movies.push(movie);
    setFavouritesMovies(favouritesCurrentUser.movies);

    const updatedFavourites = favourites.filter((favourite) => favourite.userId !== favouritesCurrentUser.userId);
    localStorage.setItem('favourites', JSON.stringify([...updatedFavourites, favouritesCurrentUser]));
  };

  const removeFromList = () => {
    const favourites = getFavourites();
    const favouritesCurrentUser = favourites[currentUser?.id ?? 0];

    const updatedFavouritesCurrentUser: FavouritesList = {
      userId: favouritesCurrentUser.userId,
      movies: favouritesCurrentUser.movies.filter((el) => el.id !== movie.id),
    };

    setFavouritesMovies(updatedFavouritesCurrentUser.movies);
    localStorage.setItem(
      'favourites',
      JSON.stringify([
        ...favourites.filter((fav) => fav.userId !== favouritesCurrentUser.userId),
        updatedFavouritesCurrentUser,
      ])
    );
  };

  return (
    <>
      <div className='movie-card'>
        <img
          src={
            isLoadingIcon
              ? 'https://i.pinimg.com/originals/2e/60/07/2e60079f1e36b5c7681f0996a79e8af4.jpg'
              : `http://image.tmdb.org/t/p/original${movie.poster_path}`
          }
          alt='poster'
          className='movie-poster'
          onLoad={() => setIsLoadingIcon(false)}
        />
        <h4 className='movie-title'>{movie.original_title}</h4>

        <div className='card-info'>
          <div className='card-genres'>
            {movie.genre_ids.map((id, index) => {
              if (index >= 2) return;

              const genre = genres?.find((el) => el.id === id)?.name;
              return (
                <p
                  className='movie-genre'
                  key={`genre-${id}`}
                >{`${genre ?? ''}${index == 0 && movie.genre_ids.length !== 1 ? ',' : ''}`}</p>
              );
            })}
          </div>

          <div className='movie-vote-row'>
            <img className='movie-vote-img' src='https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png' />
            <p className='movie-vote'>{roundVote(movie.vote_average)}</p>
            <div
              className='add-list-btn'
              onClick={
                currentUser
                  ? favouritesMovies.some((fav) => fav.id === movie.id)
                    ? () => removeFromList()
                    : () => addMovieToList()
                  : () => navigate('/login')
              }
            >
              <img
                className='heart-icon'
                src={
                  favouritesMovies.some((fav) => fav.id === movie.id)
                    ? 'https://www.denizfeyzan.com.tr/wp-content/uploads/2020/05/cropped-heart-icon.png'
                    : 'https://static-00.iconduck.com/assets.00/heart-icon-512x441-zviestnn.png'
                }
              />
            </div>
          </div>

          <div onClick={() => setShouldShowInfo(true)} className='info-btn'>
            Info
          </div>
        </div>
      </div>

      {shouldShowInfo && <InfoWindow movie={movie} setShouldShowInfo={setShouldShowInfo} />}
    </>
  );
};
