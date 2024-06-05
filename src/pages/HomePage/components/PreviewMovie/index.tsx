import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InfoWindow } from 'src/components/InfoWindow';
import { GlobalContext } from 'src/root';
import { FavouritesList, MovieType } from 'src/types/types';
import { roundVote } from 'src/utils/format';
import { getFavourites } from 'src/utils/getFavouritesMovies';

type Props = {
  movie: MovieType;
};

export const PreviewMovie = ({ movie }: Props): JSX.Element => {
  const { genres, currentUser } = useContext(GlobalContext);
  const [shouldShowInfo, setShouldShowInfo] = useState(false);
  const [favouritesMovies, setFavouritesMovies] = useState<MovieType[]>([]);
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
      <div className='preview-movie'>
        <img className='background-preview' src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} />

        <div className='preview-content'>
          <div className='left-col'>
            <img src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} className='preview-img' />
          </div>

          <div className='right-col'>
            <h1 className='movie-title'>{movie.original_title}</h1>

            <div className='preview-genre-list'>
              {movie.genre_ids.map((id, index) => {
                const genre = genres?.find((el) => el.id === id)?.name;

                return <p key={`genre-${id}`}>{`${genre ?? ''}${index < movie.genre_ids.length - 1 ? ',' : ''}`}</p>;
              })}
            </div>

            <div className='vote-row'>
              <img className='vote-star-img' src='https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png' />
              <p className='vote'>{roundVote(movie.vote_average)}</p>

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

            <p className='preview-overview'>{movie.overview}</p>

            <div
              onClick={() => {
                document.body.style.overflow = 'hidden';
                setShouldShowInfo(true);
              }}
              className='info-btn'
            >
              Info
            </div>
          </div>
        </div>
      </div>

      {shouldShowInfo && <InfoWindow movie={movie} setShouldShowInfo={setShouldShowInfo} />}
    </>
  );
};
