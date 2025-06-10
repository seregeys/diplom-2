import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchMovieDetails } from '../../Redux/Actions/Actions';
import { Link } from 'react-router-dom';
import './SliderCompStyles.css';
import { ThemeContext } from '../../themes/themeContext';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface AppState {
  movies: Movie[];
}

const SliderList: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const movies = useSelector((state: AppState) => state.movies);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchMovies("star"));
  }, [dispatch]);

  const handleMovieClick = (imdbID: string) => {
    dispatch(fetchMovieDetails(imdbID));
  };

  const handleNextClick = () => {
    if (movies.length > 0) {
      setStartIndex((prevIndex) => (prevIndex + 5) % movies.length);
    }
  };

  const handlePrevClick = () => {
    if (movies.length > 0) {
      setStartIndex((prevIndex) => (prevIndex - 5 + movies.length) % movies.length);
    }
  };

  // Ограничение отображения, если фильмов меньше чем нужно
  const visibleMovies = movies.slice(startIndex, startIndex + 5);

  return (
    <div className='slideWrapp'>
      <div className='rec'>
        <p className='recText'>
          Recommendations
          <button onClick={handlePrevClick} disabled={movies.length <= 5}>←</button>
          <button onClick={handleNextClick} disabled={movies.length <= 5}>→</button>
        </p>
      </div>
      <div className='new-home-page__film-cards'>
        {visibleMovies.map((movie: Movie) => (
          <Link
            key={movie.imdbID}
            to={`/movie/${movie.imdbID}`}
            onClick={() => handleMovieClick(movie.imdbID)}
            className='film-link'
          >
            <div className='new-film-card'>
              <img
                className='new-film-card__poster'
                src={movie.Poster}
                alt={movie.Title}
              />
              <h2
                className='new-film-card__title'
                style={{ background: theme.background, color: theme.foreground }}
              >
                {movie.Title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SliderList;