export const parsePlaces = (placeDetails: google.maps.places.PlaceResult): string => {
  const { address_components } = placeDetails ?? {};

  if (address_components && address_components.length > 0) {
    const longNames = address_components.map((item) => item.long_name);

    return longNames.join(' ');
  }

  return '';
};
