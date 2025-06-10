import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from '../../themes/themeContext';
import './MovieList.css';

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const MovieCardXX: FunctionComponent<{ movie: Movie }> = ({ movie }) => {
  const { theme } = useContext(ThemeContext);

  const textColor = theme.background === '#eeeeee' ? '#000000' : theme.foreground;

  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="film-card" style={{ display: 'flex', flexDirection: 'column-reverse' }}>
        <h2
          className="film-card__title"
          style={{ color: textColor }}
        >
          {movie.Title}
        </h2>
        <img
          className="film-card__poster"
          src={movie.Poster}
          alt={movie.Title}
        />
      </div>
    </Link>
  );
};

export default MovieCardXX;