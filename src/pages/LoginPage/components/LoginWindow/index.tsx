import { useState } from 'react';

type Props = {
  setShouldCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginWindow = ({ setShouldCreateUser }: Props): JSX.Element => {
  const [loginValues, setLoginValues] = useState({
    username: '',
    password: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInput = (val: string, field: string) => {
    setLoginValues((prev) => ({ ...prev, [field]: val }));

    setIsFormValid(
      !!(loginValues.password && val && field === 'username') || !!(loginValues.username && val && field === 'password')
    );
  };

  return (
    <div className='login-block'>
      <div className='left-col'>
        <div className='left-col-content'>
          <h1 className='login-title'>Welcome!</h1>
          <hr />
          <p className='login-description'>Register or log in to your existing account to save movies to your list!</p>
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

          <div className={`submit-btn ${!isFormValid ? 'disabled-btn' : ''}`}>Submit</div>

          <div className='sign-up'>
            Don't have account?
            <span className='sign-up-btn' onClick={() => setShouldCreateUser(true)}>
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
