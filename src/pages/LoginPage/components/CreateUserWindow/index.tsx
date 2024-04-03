import { useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

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
  const [searchVal, setSearchVal] = useState('');
  const [inputValues, setInputValues] = useState({
    username: '',
    password: '',
    profilePicture: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

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

    setIsFormValid(
      !!(
        (inputValues.username && fieldName === 'password' && val) ||
        !!(inputValues.password && fieldName === 'username' && val)
      )
    );
  };

  const handleSearch = (placeId: string) => {
    placesService?.getDetails(
      {
        placeId,
      },
      (placeDetails) => {
        if (!placeDetails) return;

        setSearchVal(parseData(placeDetails));
        getPlacePredictions({ input: '' });
      }
    );
  };

  return (
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
            <input
              className='create-input'
              type='text'
              value={inputValues.profilePicture}
              onChange={(e) => handleInput(e.currentTarget.value, 'profilePicture')}
              placeholder='Type url here'
            />

            <p>or</p>

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
                setSearchVal(e.currentTarget.value);
                getPlacePredictions({ input: e.currentTarget.value });
              }}
              value={searchVal}
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

      <div className={`create-btn ${!isFormValid ? 'disabled-btn' : ''}`}>Create user</div>

      <div className='sign-in'>
        Already have an account?
        <span className='sign-in-btn' onClick={() => setShouldCreateUser(false)}>
          Sign up
        </span>
      </div>
    </div>
  );
};
