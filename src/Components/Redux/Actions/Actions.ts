// Типы данных
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Genre?: string; // необязательное поле
  // добавьте остальные поля по необходимости
}

interface MoviesResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

// Константы типов
export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';

export const FETCH_FAV_MOVIE_DETAILS = 'FETCH_FAV_MOVIE_DETAILS';
export const FETCH_FAV_MOVIE_DETAILS_SUCCESS = 'FETCH_FAV_MOVIE_DETAILS_SUCCESS';

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

// Action creators
export const fetchMovies = (
    searchTerm: string,
    year: string = '',
    genre: string = '',
    page: number = 1
) => ({
    type: FETCH_MOVIES,
    payload: { searchTerm, year, genre, page },
});

export const fetchMoviesSuccess = (movies: MoviesResponse) => ({
    type: FETCH_MOVIES_SUCCESS,
    payload: movies,
});

export const fetchMoviesFailure = (errorMessage: string) => ({
    type: FETCH_MOVIES_FAILURE,
    payload: errorMessage,
});

export const fetchMovieDetails = (imdbID: string) => ({
    type: FETCH_MOVIE_DETAILS,
    payload: imdbID,
});

export const fetchMovieDetailsSuccess = (movie: Movie) => ({
    type: FETCH_MOVIE_DETAILS_SUCCESS,
    payload: movie,
});

export const fetchFavMovieDetails = (imdbID: string) => ({
    type: FETCH_FAV_MOVIE_DETAILS,
    payload: imdbID,
});

export const fetchFavMovieDetailsSuccess = (movie: Movie) => ({
    type: FETCH_FAV_MOVIE_DETAILS_SUCCESS,
    payload: movie,
});

export const updateSearchTerm = (searchTerm:string) => ({
    type : SET_SEARCH_TERM,
    payload : searchTerm
});