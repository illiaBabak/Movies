import { useContext } from 'react';
import { GlobalContext } from 'src/root';
import { MovieType } from 'src/types/types';
import { roundVote } from 'src/utils/format';

type Props = {
  movie: MovieType;
};

export const PreviewMovie = ({ movie }: Props): JSX.Element => {
  const { genres } = useContext(GlobalContext);

  return (
    <div className='preview-movie'>
      <img className='background-preview' src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`} />

      <div className='preview-content'>
        <div className='left-col'>
          <img src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`} className='preview-img' />
        </div>

        <div className='right-col'>
          <h1>{movie.original_title}</h1>

          <div className='preview-genre-list'>
            {movie.genre_ids.map((id, index) => {
              const genre = genres.find((el) => el.id === id)?.name;
              return <p key={`genre-${id}`}>{`${genre ?? ''}${index < movie.genre_ids.length - 1 ? ',' : ''}`}</p>;
            })}
          </div>

          <div className='vote-row'>
            <img src='https://pngfre.com/wp-content/uploads/star-png-image-pngfre-2.png' />
            <p>{roundVote(movie.vote_average)}</p>
          </div>

          <p className='preview-overview'>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};
