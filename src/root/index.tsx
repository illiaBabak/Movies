import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { fetchGenres } from 'src/api/fetchGenres';
import { fetchPopular } from 'src/api/fetchPopular';
import { fetchTopRated } from 'src/api/fetchTopRated';
import { fetchUpcoming } from 'src/api/fetchUpcoming';
import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { MoviePage } from 'src/pages/MoviePage';
import { GenreType, MovieType } from 'src/types/types';

type GlobalContextType = {
  currentUser: boolean;
  genres: GenreType[];
  popularMovies: MovieType[];
  topRatedMovies: MovieType[];
  upcomingMovies: MovieType[];
};

export const GlobalContext = createContext<GlobalContextType>({
  currentUser: false,
  genres: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
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
    <GlobalContext.Provider value={{ currentUser, genres, popularMovies, topRatedMovies, upcomingMovies }}>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/movies' element={<MoviePage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalContext.Provider>
  );
};
