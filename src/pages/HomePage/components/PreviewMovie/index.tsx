import { useContext, useState } from 'react';
import { InfoWindow } from 'src/components/InfoWindow';
import { GlobalContext } from 'src/root';
import { MovieType } from 'src/types/types';
import { roundVote } from 'src/utils/format';

type Props = {
  movie: MovieType;
};

export const PreviewMovie = ({ movie }: Props): JSX.Element => {
  const { genres } = useContext(GlobalContext);
  const [shouldShowInfo, setShouldShowInfo] = useState(false);

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
            </div>

            <p className='preview-overview'>{movie.overview}</p>

            <div onClick={() => setShouldShowInfo(true)} className='info-btn'>
              Info
            </div>
          </div>
        </div>
      </div>

      {shouldShowInfo && <InfoWindow movie={movie} setShouldShowInfo={setShouldShowInfo} />}
    </>
  );
};
