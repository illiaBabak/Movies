import { useContext, useState } from 'react';
import { GlobalContext } from 'src/root';
import { MovieType } from 'src/types/types';
import { formatDateToWords, roundVote } from 'src/utils/format';

type Props = {
  movie: MovieType;
  setShouldShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InfoWindow = ({ movie, setShouldShowInfo }: Props): JSX.Element => {
  const { genres } = useContext(GlobalContext);
  const [isLoadingBack, setIsLoadingBack] = useState(true);
  const [isLoadingIcon, setIsLoadingIcon] = useState(true);

  return (
    <div className='movie-info-wrapper' onClick={() => setShouldShowInfo(false)}>
      <div
        className='movie-info'
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <img
          src={
            isLoadingBack
              ? 'https://static.vecteezy.com/system/resources/thumbnails/008/174/698/original/animation-loading-circle-icon-loading-gif-loading-screen-gif-loading-spinner-gif-loading-animation-loading-on-black-background-free-video.jpg'
              : `http://image.tmdb.org/t/p/original${movie.backdrop_path}`
          }
          alt='background-img'
          className='background-img'
          onLoad={() => setIsLoadingBack(false)}
        />

        <div className='left-col'>
          <img
            className='info-poster'
            src={
              isLoadingIcon
                ? 'https://i.pinimg.com/originals/2e/60/07/2e60079f1e36b5c7681f0996a79e8af4.jpg'
                : `http://image.tmdb.org/t/p/original${movie.poster_path}`
            }
            alt='movie_img'
            onLoad={() => setIsLoadingIcon(false)}
          />
        </div>

        <div className='right-col'>
          <h2 className='info-title'>Title: {movie.original_title}</h2>
          <p className='release-text'>Release date: {formatDateToWords(movie.release_date)}</p>
          <div className='genres-list'>
            <p>Genres: </p>
            {movie.genre_ids.map((id, index) => {
              const genre = genres?.find((el) => el.id === id)?.name;

              return (
                <p
                  className='movie-genre'
                  key={`genre-${id}`}
                >{`${genre ?? ''}${index < movie.genre_ids.length - 1 ? ',' : ''}`}</p>
              );
            })}
          </div>

          <div className='vote-wrapper'>
            Vote:
            <img className='movie-vote-img' src='https://www.iconpacks.net/icons/2/free-star-icon-2768-thumb.png' />
            <p className='movie-vote'>{roundVote(movie.vote_average)}</p>
          </div>

          <p className='info-text'>Adult: {movie.adult ? 'adult' : 'not an adult'}</p>
          <p className='info-text'>Original language: {movie.original_language}</p>
          <p className='info-text'>Popularity: {movie.popularity}</p>
          <p className='overview'>{movie.overview}</p>
        </div>

        <div
          className='close-btn'
          onClick={() => {
            document.body.style.overflow = '';
            setShouldShowInfo(false);
          }}
        >
          x
        </div>
      </div>
    </div>
  );
};
