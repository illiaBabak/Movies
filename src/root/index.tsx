import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { fetchGenres } from 'src/api/fetchGenres';
import { fetchPopular } from 'src/api/fetchPopular';
import { fetchTopRated } from 'src/api/fetchTopRated';
import { fetchUpcoming } from 'src/api/fetchUpcoming';
import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { MoviePage } from 'src/pages/MoviePage';
import { MyListPage } from 'src/pages/MyListPage';
import { UserPage } from 'src/pages/UserPage';
import { GenreType, MovieType, UserData } from 'src/types/types';
import { isUserData } from 'src/utils/guards';

type GlobalContextType = {
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  genres: GenreType[];
  popularMovies: MovieType[];
  topRatedMovies: MovieType[];
  upcomingMovies: MovieType[];
};

export const GlobalContext = createContext<GlobalContextType>({
  currentUser: null,
  setCurrentUser: () => {
    throw new Error('Global context is not initialized');
  },
  genres: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
});

const getCurrentUser = (): UserData | null => {
  const userSessionStorage = sessionStorage.getItem('current-user');
  const userData: unknown = userSessionStorage ? JSON.parse(userSessionStorage) : '';
  const parsedUser = isUserData(userData) ? userData : null;

  return parsedUser;
};

export const App = (): JSX.Element => {
  const [popularMovies, setPopularMovies] = useState<MovieType[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<MovieType[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<MovieType[]>([]);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(getCurrentUser());

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
    <GlobalContext.Provider
      value={{ currentUser, genres, popularMovies, topRatedMovies, upcomingMovies, setCurrentUser }}
    >
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/movies' element={<MoviePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/my-list' element={<MyListPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GlobalContext.Provider>
  );
};
