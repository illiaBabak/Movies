export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

export type GenreType = {
  id: number;
  name: string;
};

export type UserData = {
  id: number;
  username: string;
  password: string;
  location: string;
  profilePicture: string;
  created_date: string;
};
