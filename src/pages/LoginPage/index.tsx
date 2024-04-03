import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { LoginWindow } from './components/LoginWindow';
import { useState } from 'react';
import { CreateUserWindow } from './components/CreateUserWindow';

export const LoginPage = (): JSX.Element => {
  const [shouldCreateUser, setShouldCreateUser] = useState(false);

  return (
    <div className='login-page'>
      <Header />
      {shouldCreateUser ? (
        <CreateUserWindow setShouldCreateUser={setShouldCreateUser} />
      ) : (
        <LoginWindow setShouldCreateUser={setShouldCreateUser} />
      )}
      <Footer />
    </div>
  );
};
