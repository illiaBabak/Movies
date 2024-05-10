import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { PreviewMovie } from 'src/pages/HomePage/components/PreviewMovie';
import { Section } from 'src/components/Section';
import { Loader } from 'src/components/Loader';
import { useTopRatedMoviesQuery } from 'src/api/topRatedMovies';
import { useUpComingMoviesQuery } from 'src/api/upComingMovies';
import { usePopularMoviesInfiniteQuery } from 'src/api/popularMovies';

const DEFAULT_CARD_WIDTH = 202;

const COUNT_CARDS =
  Math.floor(window.innerWidth / DEFAULT_CARD_WIDTH) - 1 === 0
    ? 1
    : Math.floor(window.innerWidth / DEFAULT_CARD_WIDTH) - 1;

export const HomePage = (): JSX.Element => {
  const {
    data: popularMoviesResponse,
    isLoading: isLoadingPopularMovies,
    fetchNextPage,
  } = usePopularMoviesInfiniteQuery();
  const { data: topRatedMovies, isLoading: isLoadingRatedMovies } = useTopRatedMoviesQuery();
  const { data: upcomingMovies, isLoading: isLoadingUpComingMovies } = useUpComingMoviesQuery();

  const popularMovies = popularMoviesResponse?.pages.flatMap((el) => el.results);

  if (!popularMovies?.length) fetchNextPage();

  const isLoading = isLoadingPopularMovies || isLoadingRatedMovies || isLoadingUpComingMovies;

  return (
    <div className='home-page'>
      <Header />
      {popularMovies?.length && <PreviewMovie movie={popularMovies[0]} />}
      {popularMovies?.length && <Section title='Popular films' movies={popularMovies.slice(0, COUNT_CARDS)} />}
      {topRatedMovies?.length && <Section title='Top rated films' movies={topRatedMovies.slice(0, COUNT_CARDS)} />}
      {upcomingMovies?.length && <Section title='Upcoming films' movies={upcomingMovies.slice(0, COUNT_CARDS)} />}
      {isLoading && <Loader />}
      <Footer />
    </div>
  );
};
