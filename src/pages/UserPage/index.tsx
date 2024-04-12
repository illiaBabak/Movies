import { useContext, useState } from 'react';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { GlobalContext } from 'src/root';

export const UserPage = (): JSX.Element => {
  const { currentUser } = useContext(GlobalContext);
  const [isPfp, setIsPfp] = useState(false);

  return (
    <div className='user-page'>
      <Header />
      <div className='user-page-content'>
        <div className='wrapper'>
          <img
            className='icon'
            src={isPfp ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' : currentUser?.profilePicture}
            onError={() => setIsPfp(true)}
          />
          <h1 className='username'>{currentUser?.username}</h1>
        </div>

        {currentUser?.location && <p>Location: {currentUser?.location}</p>}
      </div>
      <Footer />
    </div>
  );
};
