import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useGenresQuery } from 'src/api/genres';
import { HomePage } from 'src/pages/HomePage';
import { LoginPage } from 'src/pages/LoginPage';
import { MoviePage } from 'src/pages/MoviePage';
import { MyListPage } from 'src/pages/MyListPage';
import { UserPage } from 'src/pages/UserPage';
import { GenreType, UserData } from 'src/types/types';
import { getCurrentUser } from 'src/utils/getCurrentUser';

type GlobalContextType = {
  currentUser: UserData | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  genres: GenreType[] | undefined;
};

export const GlobalContext = createContext<GlobalContextType>({
  currentUser: null,
  setCurrentUser: () => {
    throw new Error('Global context is not initialized');
  },
  genres: [],
});

export const App = (): JSX.Element => {
  const { data: genres } = useGenresQuery();
  const [currentUser, setCurrentUser] = useState<UserData | null>(getCurrentUser());

  useEffect(() => {
    sessionStorage.setItem('current-user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <GlobalContext.Provider value={{ currentUser, genres, setCurrentUser }}>
      <div className='container'>
        <Router>
          <Routes>
            <Route path='/*' element={<Navigate to='/home' />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/movies' element={<MoviePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/user' element={<UserPage />} />
            <Route path='/my-list' element={<MyListPage />} />
          </Routes>
        </Router>
      </div>
    </GlobalContext.Provider>
  );
};
