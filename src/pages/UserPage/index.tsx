import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from 'src/components/Footer';
import { Header } from 'src/components/Header';
import { GlobalContext } from 'src/root';
import { getUsers } from 'src/utils/getUsers';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { parsePlaces } from 'src/utils/parsePlaces';
import { isString } from 'src/utils/guards';

export const UserPage = (): JSX.Element => {
  const { placesService, placePredictions, getPlacePredictions } = usePlacesService({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  const [isPfp, setIsPfp] = useState(false);
  const [shouldEdit, setShouldEdit] = useState(false);
  const navigate = useNavigate();

  const isValidCurrentUser = currentUser?.username && currentUser?.password;

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result;
      if (isString(base64Image)) {
        setCurrentUser((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            profilePicture: base64Image,
          };
        });
      }
    };

    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
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
            location: parsePlaces(placeDetails),
          };
        });
        getPlacePredictions({ input: '' });
      }
    );
  };

  const saveData = () => {
    setShouldEdit(false);

    if (!currentUser) return;

    setCurrentUser(currentUser);

    const updatedUsers = getUsers().filter((user) => user.id !== currentUser.id);

    updatedUsers.push(currentUser);

    localStorage.setItem('users', JSON.stringify(updatedUsers));
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveData();
                }}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveData();
                }}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveData();
                }}
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
                onClick={isValidCurrentUser ? () => saveData() : () => {}}
                className={isValidCurrentUser ? '' : 'disabled'}
              >
                Save
              </div>
            ) : (
              <div onClick={() => setShouldEdit(true)}>Edit user info</div>
            )}

            <div
              onClick={() => {
                setCurrentUser(null);
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
