import { createContext, useEffect, useState } from 'react';
import { fetchGenres } from 'src/api/fetchGenres';
import { fetchPopular } from 'src/api/fetchPopular';
import { fetchTopRated } from 'src/api/fetchTopRated';
import { fetchUpcoming } from 'src/api/fetchUpcoming';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { PreviewMovie } from 'src/components/PreviewMovie';
import { Section } from 'src/components/Section';
import { GenreType, MovieType } from 'src/types/types';

type GlobalContextType = {
  currentUser: boolean;
  genres: GenreType[];
};

export const GlobalContext = createContext<GlobalContextType>({
  currentUser: false,
  genres: [],
});

export const App = (): JSX.Element => {
  const [popularMovies, setPopularMovies] = useState<MovieType[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const popularFlims = await fetchPopular();
      setPopularMovies(popularFlims);

      const genres = await fetchGenres();
      setGenres(genres);

      const ratedMovies = await fetchTopRated();
      setTopRatedMovies(ratedMovies);

      const upcomingMovies = await fetchUpcoming();
      setUpcomingMovies(upcomingMovies);
    };
    loadData();
  }, []);

  return (
    <GlobalContext.Provider value={{ currentUser, genres }}>
      <div className='container'>
        <Header />
        {popularMovies.length ? <PreviewMovie movie={popularMovies[3]} /> : <div>Loading...</div>}
        {popularMovies.length ? (
          <Section title='Popular films' movies={popularMovies.slice(0, 6)} />
        ) : (
          <div>Loading...</div>
        )}
        {topRatedMovies.length ? (
          <Section title='Top rated films' movies={topRatedMovies.slice(0, 6)} />
        ) : (
          <div>Loading...</div>
        )}
        {upcomingMovies.length ? (
          <Section title='Upcoming films' movies={upcomingMovies.slice(0, 6)} />
        ) : (
          <div>Loading...</div>
        )}
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
};
