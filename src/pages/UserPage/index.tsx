import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { GlobalContext } from 'src/root';
import { getUsers } from 'src/utils/getUsers';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const apiKey = 'AIzaSyADtDVmDwsAktE9k8TKx9mlHxyT9NB73UQ';

const parseData = (placeDetails: google.maps.places.PlaceResult) => {
  const { address_components } = placeDetails ?? {};

  if (address_components && address_components.length > 0) {
    const longNames = address_components.map((item) => item.long_name);

    return longNames.join(' ');
  }

  return '';
};

export const UserPage = (): JSX.Element => {
  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey,
  });
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [isPfp, setIsPfp] = useState(false);
  const [shouldEdit, setShouldEdit] = useState(false);
  const navigate = useNavigate();

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files) return;

    const url = window.URL.createObjectURL(files[0]);
    setCurrentUser((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        profilePicture: url,
      };
    });
  };

  const handleSearch = (placeId: string) => {
    placesService?.getDetails(
      {
        placeId,
      },
      (placeDetails) => {
        if (!placeDetails) return;

        setCurrentUser((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            location: parseData(placeDetails),
          };
        });
        getPlacePredictions({ input: '' });
      }
    );
  };

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
          {shouldEdit && (
            <div className='input-file-wrapper'>
              <input type='file' name='file' className='input-file' onChange={(e) => handleInputFile(e)} />
              <label htmlFor='input-file-label'>Change image</label>
            </div>
          )}
          {!shouldEdit && <h1 className='username'>{currentUser?.username}</h1>}
        </div>

        <div className='user-page-info'>
          {shouldEdit ? (
            <div className='input-wrapper'>
              <p>Username: </p>
              <input
                className='user-info-input'
                type='text'
                onChange={(e) => {
                  const val = e.currentTarget.value;

                  setCurrentUser((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      username: val,
                    };
                  });
                }}
                value={currentUser?.username}
              />
            </div>
          ) : (
            <p>Username: {currentUser?.username}</p>
          )}

          {shouldEdit && (
            <div className='input-wrapper'>
              <p>Password: </p>
              <input
                className='user-info-input'
                type='text'
                onChange={(e) => {
                  const val = e.currentTarget.value;

                  setCurrentUser((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      password: val,
                    };
                  });
                }}
                value={currentUser?.password}
              />
            </div>
          )}

          {shouldEdit ? (
            <div className='input-wrapper'>
              <p>Location: </p>
              <input
                className='user-info-input'
                onChange={(e) => {
                  const val = e.currentTarget.value;

                  setCurrentUser((prev) => {
                    if (!prev) return prev;

                    return {
                      ...prev,
                      location: val,
                    };
                  });

                  getPlacePredictions({ input: val });
                }}
                value={currentUser?.location}
              />
              <div className='list'>
                {placePredictions.map((el, index) => (
                  <div className='list-el' key={`list-${index}`} onClick={() => handleSearch(el.place_id)}>
                    {el.description}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Location: {currentUser?.location ?? 'has no value'}</p>
          )}

          {!shouldEdit && <p>Created: {currentUser?.created_date}</p>}

          <div className='container-btn-user'>
            {shouldEdit ? (
              <div
                onClick={() => {
                  setShouldEdit(false);

                  if (!currentUser) return;

                  sessionStorage.setItem('current-user', JSON.stringify(currentUser));

                  const uptadedUsers = getUsers().filter((user) => user.id !== currentUser.id);

                  uptadedUsers.push(currentUser);

                  localStorage.setItem('users', JSON.stringify(uptadedUsers));
                }}
              >
                Save
              </div>
            ) : (
              <div onClick={() => setShouldEdit(true)}>Edit user info</div>
            )}

            <div
              onClick={() => {
                setCurrentUser(null);
                sessionStorage.setItem('current-user', JSON.stringify(''));
                navigate('/home');
              }}
            >
              Log out
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
