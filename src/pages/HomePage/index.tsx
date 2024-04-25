import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { PreviewMovie } from 'src/pages/HomePage/components/PreviewMovie';
import { Section } from 'src/components/Section';
import { useContext } from 'react';
import { GlobalContext } from 'src/root';
import { Loader } from 'src/components/Loader';

export const HomePage = (): JSX.Element => {
  const { popularMovies, upcomingMovies, topRatedMovies } = useContext(GlobalContext);

  return (
    <div className='home-page'>
      <Header />
      {popularMovies?.length ? <PreviewMovie movie={popularMovies[0]} /> : <Loader />}
      {popularMovies?.length ? <Section title='Popular films' movies={popularMovies.slice(0, 6)} /> : <Loader />}
      {topRatedMovies?.length ? <Section title='Top rated films' movies={topRatedMovies.slice(0, 6)} /> : <Loader />}
      {upcomingMovies?.length ? <Section title='Upcoming films' movies={upcomingMovies.slice(0, 6)} /> : <Loader />}
      <Footer />
    </div>
  );
};
