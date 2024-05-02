import { useState } from 'react';
import { Alert } from '../../../../components/Alert';
import { LoginForm } from './components';

type Props = {
  setShouldCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginWindow = ({ setShouldCreateUser }: Props): JSX.Element => {
  const [shouldShowAlert, setShouldShowAlert] = useState(false);

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
          <LoginForm setShouldCreateUser={setShouldCreateUser} setShouldShowAlert={setShouldShowAlert} />
        </div>
      </div>

      {shouldShowAlert && <Alert text='User not found' setShouldShowAlert={setShouldShowAlert} />}
    </>
  );
};
