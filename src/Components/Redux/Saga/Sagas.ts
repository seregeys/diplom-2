import { all, call, put} from 'redux-saga/effects';
import axios from 'axios';
import { fetchMovies, fetchMovieDetails, fetchMovieDetailsSuccess, fetchMoviesSuccess, fetchFavMovieDetailsSuccess } from '../Actions/Actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function* fetchMoviesSaga(action: ReturnType<typeof fetchMovies>): Generator<any, void, any> {
  try {
    const { searchTerm, year, genre, page } = action.payload;

    let url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=46ecb653&page=${page}`;
    if (year) {
      url += `&y=${year}`;
    }
    if (genre) {
      url += `&g=${genre}`;
    }

    const response = yield call(axios.get, url);

  
    if (response.data.Response === 'True') {
      const movieDetailsPromises = response.data.Search.map((movie: any) =>
        call(axios.get, `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=46ecb653`)
      );
      const movies = yield all(movieDetailsPromises);
      yield put(fetchMoviesSuccess(movies.map((response: any) => response.data)));
    } else {
      console.log('Not updating the component');
      toast.error('Ошибка поиска');
      toast.info('Используйте английский язык,или проверьте правильность запроса')
    }
  } catch (error) {
    console.error(error);
  }
}




export default fetchMoviesSaga;

export function* fetchMovieDetailsSaga(action: ReturnType<typeof fetchMovieDetails>): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.get,
      `https://www.omdbapi.com/?i=${action.payload}&apikey=46ecb653`
    );
    yield put(fetchMovieDetailsSuccess(response.data));
  } catch (error) {
    console.error(error);
  }
}

export function* fetchFavMovieDetailsSaga(): Generator<any, void, any> {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const movieKeys = Object.keys(user).filter(key => key.startsWith('tt'));


    const movieDetailsPromises = movieKeys.map((key: string) =>
      call(axios.get, `https://www.omdbapi.com/?i=${key}&apikey=46ecb653`)
    );

 
    const movies = yield all(movieDetailsPromises);

  
    yield put(fetchFavMovieDetailsSuccess(movies.map((response: any) => response.data)));
  } catch (error) {
    console.error(error);
  }
}
