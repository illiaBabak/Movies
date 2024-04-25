import { useContext } from 'react';
import { GlobalContext } from 'src/root';
import { MovieType } from 'src/types/types';
import { formatDateToWords, roundVote } from 'src/utils/format';

type Props = {
  movie: MovieType;
  setShouldShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InfoWindow = ({ movie, setShouldShowInfo }: Props): JSX.Element => {
  const { genres } = useContext(GlobalContext);

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
          src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt='background-img'
          className='background-img'
        />

        <div className='left-col'>
          <img className='info-poster' src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt='movie_img' />
        </div>

        <div className='right-col'>
          <h2>Title: {movie.original_title}</h2>
          <p>Release date: {formatDateToWords(movie.release_date)}</p>
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
            <img className='movie-vote-img' src='https://pngfre.com/wp-content/uploads/star-png-image-pngfre-2.png' />
            <p className='movie-vote'>{roundVote(movie.vote_average)}</p>
          </div>

          <p>Adult: {movie.adult ? 'adult' : 'not an adult'}</p>
          <p>Original language: {movie.original_language}</p>
          <p>Popularity: {movie.popularity}</p>
          <p className='overview'>{movie.overview}</p>
        </div>

        <div className='close-btn' onClick={() => setShouldShowInfo(false)}>
          x
        </div>
      </div>
    </div>
  );
};
