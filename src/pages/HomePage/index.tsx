import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { PreviewMovie } from 'src/pages/HomePage/components/PreviewMovie';
import { Section } from 'src/components/Section';
import { Loader } from 'src/components/Loader';
import { useTopRatedMoviesQuery } from 'src/api/topRatedMovies';
import { useUpComingMoviesQuery } from 'src/api/upComingMovies';
import { usePopularMoviesInfiniteQuery } from 'src/api/popularMovies';

export const HomePage = (): JSX.Element => {
  const { data: popularMoviesResponse, isLoading: isLoadingPopularMovies } = usePopularMoviesInfiniteQuery();
  const { data: topRatedMovies, isLoading: isLoadingRatedMovies } = useTopRatedMoviesQuery();
  const { data: upcomingMovies, isLoading: isLoadingUpComingMovies } = useUpComingMoviesQuery();

  const popularMovies = popularMoviesResponse?.pages.flatMap((el) => el.results);

  const isLoading = isLoadingPopularMovies || isLoadingRatedMovies || isLoadingUpComingMovies;

  return (
    <div className='home-page'>
      <Header />
      {popularMovies?.length && <PreviewMovie movie={popularMovies[0]} />}
      {popularMovies?.length && <Section title='Popular films' movies={popularMovies.slice(0, 6)} />}
      {topRatedMovies?.length && <Section title='Top rated films' movies={topRatedMovies.slice(0, 6)} />}
      {upcomingMovies?.length && <Section title='Upcoming films' movies={upcomingMovies.slice(0, 6)} />}
      {isLoading && <Loader />}
      <Footer />
    </div>
  );
};
