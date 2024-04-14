import { useContext } from 'react';
import { GlobalContext } from 'src/root';
import { MovieType } from 'src/types/types';
import { roundVote } from 'src/utils/format';

type Props = {
  movie: MovieType;
};

export const Movie = ({ movie }: Props): JSX.Element => {
  const { genres } = useContext(GlobalContext);

  return (
    <div className='movie-card'>
      <img src={`http://image.tmdb.org/t/p/original${movie.poster_path}`} alt='poster' className='movie-poster' />
      <h4 className='movie-title'>{movie.original_title}</h4>

      <div className='card-info'>
        <div className='card-genres'>
          {movie.genre_ids.map((id, index) => {
            if (index >= 2) return;

            const genre = genres.find((el) => el.id === id)?.name;
            return (
              <p
                className='movie-genre'
                key={`genre-${id}`}
              >{`${genre ?? ''}${index == 0 && movie.genre_ids.length !== 1 ? ',' : ''}`}</p>
            );
          })}
        </div>

        <div className='movie-vote-row'>
          <img className='movie-vote-img' src='https://pngfre.com/wp-content/uploads/star-png-image-pngfre-2.png' />
          <p className='movie-vote'>{roundVote(movie.vote_average)}</p>
        </div>
      </div>
    </div>
  );
};
