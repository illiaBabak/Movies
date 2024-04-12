import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from 'src/root';
import { getUsers } from 'src/utils/getUsers';
import { Alert } from '../../../../components/Alert';

type Props = {
  setShouldCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginWindow = ({ setShouldCreateUser }: Props): JSX.Element => {
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const { setCurrentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleInput = (val: string, field: string) => {
    setLoginValues((prev) => ({ ...prev, [field]: val }));

    setIsFormValid(
      !!(loginValues.password && val && field === 'username') || !!(loginValues.username && val && field === 'password')
    );
  };

  const login = () => {
    const users = getUsers();

    const loginUser = users.find(
      (user) => user.username === loginValues.username && user.password === loginValues.password
    );

    if (!loginUser) {
      setShouldShowAlert(true);
      return;
    }

    setCurrentUser(loginUser);
    sessionStorage.setItem('current-user', JSON.stringify(loginUser));

    navigate('/user');
  };

  return (
    <>
      <div className='login-block'>
        <div className='left-col'>
          <div className='left-col-content'>
            <h1 className='login-title'>Welcome!</h1>
            <hr />
            <p className='login-description'>
              Register or log in to your existing account to save movies to your list!
            </p>
          </div>
        </div>
        <div className='right-col'>
          <div className='login-window'>
            <h1 className='login-window-title'>Sign in</h1>

            <div className='login-input-label'>
              <p>User name</p>
              <input
                type='text'
                className='login-input'
                onChange={(e) => handleInput(e.currentTarget.value, 'username')}
                value={loginValues.username}
              />
            </div>

            <div className='login-input-label'>
              <p>Password</p>
              <input
                type='password'
                className='login-input'
                onChange={(e) => handleInput(e.currentTarget.value, 'password')}
                value={loginValues.password}
              />
            </div>

            <div className={`submit-btn ${!isFormValid ? 'disabled-btn' : ''}`} onClick={login}>
              Submit
            </div>

            <div className='sign-up'>
              Don't have account?
              <span className='sign-up-btn' onClick={() => setShouldCreateUser(true)}>
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>

      {shouldShowAlert && <Alert text='User not found' setShouldShowAlert={setShouldShowAlert} />}
    </>
  );
};
