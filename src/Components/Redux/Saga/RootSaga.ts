import { takeLatest, all } from 'redux-saga/effects';
import { FETCH_MOVIES, FETCH_MOVIE_DETAILS, FETCH_FAV_MOVIE_DETAILS } from "../Actions/Actions";
import fetchMoviesSaga, { fetchMovieDetailsSaga, fetchFavMovieDetailsSaga } from "./Sagas";

// Следит за действием FETCH_MOVIES и вызывает соответствующую сагу
function* watchFetchMovies() {
  yield takeLatest(FETCH_MOVIES, fetchMoviesSaga);
}

// Следит за действием FETCH_MOVIE_DETAILS
function* watchFetchMovieDetails() {
  yield takeLatest(FETCH_MOVIE_DETAILS, fetchMovieDetailsSaga);
}

// Следит за действием FETCH_FAV_MOVIE_DETAILS
function* watchFetchFavMovieDetails() {
  yield takeLatest(FETCH_FAV_MOVIE_DETAILS, fetchFavMovieDetailsSaga);
}

// Объединяет все watcher'ы в один root-сагу
export function* rootSaga() {
  yield all([
    watchFetchMovies(),
    watchFetchMovieDetails(),
    watchFetchFavMovieDetails()
  ]);
}