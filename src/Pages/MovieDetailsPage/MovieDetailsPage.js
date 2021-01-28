import { useState, useEffect, lazy, Suspense } from 'react';
import {
  Route,
  useParams,
  Link,
  useLocation,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';
import * as moviesApi from '../../services/movie-api';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../../components/Cast' /* webpackChunkName: "cast" */),
);
const Reviews = lazy(() =>
  import('../../components/Reviews' /* webpackChunkName: "reviews" */),
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const { url, path } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    moviesApi.fetchMovieDetails(movieId).then(results => {
      setMovie(results);
    });
  }, [movieId]);

  const handleGoBack = () => {
    const { state } = location;
    if (!state) {
      history.push({
        pathname: '/',
      });
      return;
    }
    history.push(state.from);
  };

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={handleGoBack}>
            {' '}
            Go back
          </button>
          <div className={s.movieCard}>
            <div className={s.moviePicture}>
              <img
                src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div>
              <h2>
                {movie.title}({movie.release_date.substr(0, 4)})
              </h2>
              <p>
                User Score: {`${Math.round((movie.vote_average * 100) / 9.5)}%`}
              </p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(({ id, name }) => {
                  return <li key={id}>{name}</li>;
                })}
              </ul>
            </div>
          </div>
          <div>
            <h4>Additional informaion</h4>
            <ul>
              <li>
                <Link
                  to={{
                    ...location,
                    pathname: `${url}/cast`,
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    ...location,
                    pathname: `${url}/reviews`,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <Suspense fallback={<p>Loading...</p>}>
            <Route path={`${path}/cast`}>
              <Cast />
            </Route>
            <Route path={`${path}/reviews`}>
              <Reviews />
            </Route>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
