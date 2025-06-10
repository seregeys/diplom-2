import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMovieDetails } from '../../Redux/Actions/Actions';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../themes/themeContext';
import ClipLoader from 'react-spinners/ClipLoader'; // Спиннер
import './MovieList.css';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre: string;
  imdbRating: string; 
}

interface AppState {
  movies: Movie[];
  loading: boolean;
  searchTerm: string;
}

const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: AppState) => state.movies);
  const loading = useSelector((state: AppState) => state.loading);
  const searchTerm = useSelector((state: AppState) => state.searchTerm);
  
  const { theme } = useContext(ThemeContext);
  const location = useLocation();

  // Эффект для загрузки фильмов при изменении URL или поискового запроса
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const page = Number(urlParams.get('page')) || 1;
    const query = searchTerm || 'new';

    dispatch(fetchMovies(query, undefined, undefined, page));
  }, [dispatch, location, searchTerm]);

  // Функция для определения цвета рейтинга
  const getRatingColor = (ratingStr: string) => {
    const rating = parseFloat(ratingStr);
    if (isNaN(rating)) return 'gray'; // если рейтинг не число
    if (rating <= 5) return 'red';
    if (rating <= 7) return 'orange';
    return 'green';
  };

  // Обработка клика по карточке фильма
  const handleMovieClick = (imdbID: string) => {
    dispatch(fetchMovieDetails(imdbID));
  };

  const defaultPoster = "https://www.aad.co.uk/img/no-photo.jpg";

  return (
    <div
      className="home-page__film-cards"
      style={{ background: theme.background, color: theme.foreground }}
    >
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color={theme.foreground} size={50} />
        </div>
      ) : (
        movies.map((movie) => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}
            onClick={() => handleMovieClick(movie.imdbID)}
          >
            <div className="film-card">
              <img
                className="film-card__poster"
                src={movie.Poster === "N/A" ? defaultPoster : movie.Poster}
                alt={movie.Title}
              />
              <div className="film-card__info">
                <h2
                  className="film-card__title"
                  style={{
                    color:
                      theme.background === '#eeeeee'
                        ? '#000000'
                        : theme.foreground,
                  }}
                >
                  {movie.Title}
                </h2>
                <p className="film-card__genre">{movie.Genre}</p>
              </div>
              <p
                className="Mmovie-imdb-rating"
                style={{
                  backgroundColor: getRatingColor(movie.imdbRating),
                }}
              >
                {movie.imdbRating}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MoviesList;