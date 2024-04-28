import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from 'src/root';
import { getUsers } from 'src/utils/getUsers';
import { Alert } from '../../../../components/Alert';
import { setCurrentUserStorage } from 'src/utils/setCurrentUserStorage';

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
  const [shouldShowPassword, setShouldShowPassword] = useState(false);
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
    setCurrentUserStorage(loginUser);

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
              <p>Username</p>

              <div className='input-wrapper'>
                <input
                  type='text'
                  className='login-input'
                  onChange={(e) => handleInput(e.currentTarget.value, 'username')}
                  value={loginValues.username}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') login();
                  }}
                />
              </div>
            </div>

            <div className='login-input-label'>
              <p>Password</p>

              <div className='input-wrapper'>
                <input
                  type={shouldShowPassword ? 'text' : 'password'}
                  className='login-input'
                  onChange={(e) => handleInput(e.currentTarget.value, 'password')}
                  value={loginValues.password}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') login();
                  }}
                />
                <img
                  src={
                    shouldShowPassword
                      ? 'https://static.vecteezy.com/system/resources/thumbnails/006/086/018/small/preview-show-interface-icon-free-vector.jpg'
                      : 'https://img.freepik.com/premium-vector/show-password-icon-eye-symbol-vector-vision-hide-from-watch-icon-secret-view-web-design-element_87543-11126.jpg'
                  }
                  alt='icon'
                  className='input-icon'
                  onClick={() => setShouldShowPassword((prev) => !prev)}
                />
              </div>
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
