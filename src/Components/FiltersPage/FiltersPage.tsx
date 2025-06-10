import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'; 
import { fetchMovies } from '../Redux/Actions/Actions';
import MovieCardXX from "../HomePage/MovieList/FiltredCardsRender";
import closeicon from './assets/interfaceclose.svg'
import 'react-toastify/dist/ReactToastify.css';
import './FiltersPage.css'

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

// Типизация состояния Redux 
interface RootState {
  searchTerm: string;
  movies: Movie[];
}

const FiltersPage: FunctionComponent = () => {
  const dispatch = useDispatch();

  // Получение данных из Redux
  const searchTerm = useSelector((state: RootState) => state.searchTerm);
  const movies = useSelector((state: RootState) => state.movies);

  // Локальные состояния фильтров
  const [genre, setGenre] = useState<string>("");
  const [year, setYear] = useState<string>("");

  // Обработчик для показа результатов
  const handleShowResults = () => {
    if (genre && year) {
      dispatch(fetchMovies(searchTerm, year, genre));
    } else {
      alert("Please select both genre and year");
    }
  };

  // Обработчик закрытия фильтров
  const handleCloseFilters = () => {
    setGenre('');
    setYear('');
  };

  return (
    <div className="filters-page__background">
      <div className="filters-page__mobile-frame">
        <img
          className="filters-page__background-image"
          alt=""
          src="/rectangle-320.svg"
        />
        <main className="filters-page__content">
          <div className="filters-page__header">
            <div className="filters-page__title">Filters</div>
            <Link to="/" onClick={handleCloseFilters}>
              <img
                className="filters-page__close-icon"
                loading="lazy"
                alt="Close"
                src={closeicon}
              />
            </Link>
          </div>

          {/* Выбор жанра */}
          <section className="filters-page__genre-section">
            <div className="filters-page__label">Genre</div>
            <div className="filters-page__genre-select-wrapper">
              <select 
                className="filters-page__genre-select"
                value={genre} 
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">Select genre</option>
                <option className="filters-page__option" value="movie">Movie</option>
                <option className="filters-page__option" value="series">Series</option>
                <option className="filters-page__option" value="episode">Episode</option>
                <option className="filters-page__option" value="game">Game</option>
              </select>
            </div>
          </section>

          {/* Ввод года */}
          <section className="filters-page__year-section">
            <div className="filters-page__label">Year</div>
            <div className="filters-page__year-input-wrapper">
              <input 
                className="filters-page__year-input" 
                placeholder="Type search year here" 
                type="text" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} 
              />
            </div>
          </section>

          {/* Кнопки */}
          <section className="filters-page__actions">
            <div className="filters-page__buttons">
              <button className="filters-page__show-results-button" onClick={handleShowResults}>
                <div className="filters-page__button-text">Show results</div>
              </button>
              {/* Кнопка закрытия фильтров */}
              <Link to="/" onClick={handleCloseFilters}>
                <button className="filters-page__clear-filters-button">
                  <div className="filters-page__button-text">Close filter</div>
                </button>
              </Link>
            </div>
          </section>

          {/* Карточки фильмов */}
          <div className="filters-page__movie-cards">
            {movies.length > 0 ? (
              movies.map((movie: Movie) => (
                // Используем imdbID как уникальный ключ
                <MovieCardXX key={movie.imdbID} movie={movie} />
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FiltersPage;