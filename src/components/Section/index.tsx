import { MovieType } from 'src/types/types';
import { Movie } from '../Movie';

type Props = {
  title: string;
  movies: MovieType[];
};

export const Section = ({ title, movies }: Props): JSX.Element => (
  <div className='section'>
    <h2 className='section-title'>{title}</h2>
    <hr className='section-line' />
    <div className='cards'>
      {movies.map((movie, index) => (
        <Movie movie={movie} key={`movie-section-${index}`} />
      ))}
    </div>
  </div>
);
