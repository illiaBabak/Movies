import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from 'src/root';

export const Header = (): JSX.Element => {
  const { currentUser } = useContext(GlobalContext);
  const [isPfp, setIsPfp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='header'>
      <h1 className='title'>Movies</h1>

      <div className='header-list'>
        <div className='home-btn' onClick={() => navigate('/home')}>
          Home
        </div>
        <div className='movies-btn' onClick={() => navigate('/movies')}>
          Movies
        </div>
        <div className='list-btn' onClick={currentUser ? () => navigate('/my-list') : () => navigate('/login')}>
          My list
        </div>
        <div className='search'>
          <input className='header-search' />
          <img
            className='search-img'
            src='https://static.vecteezy.com/system/resources/thumbnails/014/441/308/small_2x/magnifying-glass-icon-3d-design-for-application-and-website-presentation-png.png'
          />
        </div>
        <div className='user-btn'>
          {currentUser ? (
            currentUser.profilePicture ? (
              <img
                className='header-pfp'
                src={isPfp ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' : currentUser?.profilePicture}
                onError={() => setIsPfp(true)}
                onClick={() => navigate('/user')}
              />
            ) : (
              <img
                className='header-pfp'
                src='https://cdn-icons-png.flaticon.com/512/149/149071.png'
                onClick={() => navigate('/user')}
              />
            )
          ) : (
            <div onClick={() => navigate('/login')}>Sign in</div>
          )}
        </div>
      </div>
    </div>
  );
};
