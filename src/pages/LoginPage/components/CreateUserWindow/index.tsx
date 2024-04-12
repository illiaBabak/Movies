import { useContext, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'src/components/Alert';
import { GlobalContext } from 'src/root';
import { getUsers } from 'src/utils/getUsers';

const apiKey = 'AIzaSyADtDVmDwsAktE9k8TKx9mlHxyT9NB73UQ';

type Props = {
  setShouldCreateUser: React.Dispatch<React.SetStateAction<boolean>>;
};

const parseData = (placeDetails: google.maps.places.PlaceResult) => {
  const { address_components } = placeDetails ?? {};

  if (address_components && address_components.length > 0) {
    const longNames = address_components.map((item) => item.long_name);

    return longNames.join(' ');
  }

  return '';
};

export const CreateUserWindow = ({ setShouldCreateUser }: Props): JSX.Element => {
  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey,
  });
  const [location, setLocation] = useState('');
  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
    profilePicture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [shouldShowAlert, setShouldShowAlert] = useState(false);
  const { setCurrentUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files) return;

    const url = window.URL.createObjectURL(files[0]);
    setInputValues((prev) => ({ ...prev, profilePicture: url }));
  };

  const handleInput = (val: string, fieldName: string) => {
    setInputValues((prevState) => ({
      ...prevState,
      [fieldName]: val,
    }));

    if (fieldName === 'profilePicture') return;

    setIsFormValid(
      !!(inputValues.username && fieldName === 'password' && val) ||
        !!(inputValues.password && fieldName === 'username' && val)
    );
  };

  const handleSearch = (placeId: string) => {
    placesService?.getDetails(
      {
        placeId,
      },
      (placeDetails) => {
        if (!placeDetails) return;

        setLocation(parseData(placeDetails));
        getPlacePredictions({ input: '' });
      }
    );
  };

  const clearWindow = () => {
    setInputValues({
      username: '',
      password: '',
      profilePicture: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    });

    setLocation('');

    setIsFormValid(false);
  };

  const saveUser = () => {
    const userInfo = { ...inputValues, location };

    const users = getUsers();

    if (users.some((user) => user.username === userInfo.username)) {
      setShouldShowAlert(true);
      return;
    }

    localStorage.setItem('users', JSON.stringify([...users, userInfo]));
    sessionStorage.setItem('current-user', JSON.stringify(userInfo));

    clearWindow();

    setCurrentUser(userInfo);
    navigate('/user');
  };

  return (
    <>
      <div className='create-user-window'>
        <h1 className='create-user-title'>Sign up</h1>
        <div className='create-user-content'>
          <div className='input-label-img'>
            <div
              className='set-img'
              style={{
                backgroundImage: `url(${inputValues.profilePicture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <p>Profile picture</p>

            <div className='container-btn'>
              <div className='input-file-wrapper'>
                <input type='file' name='file' className='input-file' onChange={(e) => handleInputFile(e)} />
                <label htmlFor='input-file-label'>Upload image</label>
              </div>
            </div>
          </div>

          <div className='create-user-col'>
            <div className='input-label'>
              <p>Username</p>
              <input
                className='create-input'
                type='text'
                value={inputValues.username}
                onChange={(e) => handleInput(e.currentTarget.value, 'username')}
              />
            </div>

            <div className='input-label'>
              <p>Password</p>
              <input
                className='create-input'
                type='password'
                value={inputValues.password}
                onChange={(e) => handleInput(e.currentTarget.value, 'password')}
              />
            </div>

            <div className='location-label'>
              <p>Location</p>
              <input
                className='search-input create-input'
                onChange={(e) => {
                  setLocation(e.currentTarget.value);
                  getPlacePredictions({ input: e.currentTarget.value });
                }}
                value={location}
              />
              <div className='list'>
                {placePredictions.map((el, index) => (
                  <div className='list-el' key={`list-${index}`} onClick={() => handleSearch(el.place_id)}>
                    {el.description}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`create-btn ${!isFormValid ? 'disabled-btn' : ''}`} onClick={saveUser}>
          Create user
        </div>

        <div className='sign-in'>
          Already have an account?
          <span className='sign-in-btn' onClick={() => setShouldCreateUser(false)}>
            Sign up
          </span>
        </div>
      </div>

      {shouldShowAlert && <Alert text='User had already created' setShouldShowAlert={setShouldShowAlert} />}
    </>
  );
};
