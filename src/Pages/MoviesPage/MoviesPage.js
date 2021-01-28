import { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import * as moviesApi from '../../services/movie-api';

import { toast } from 'react-toastify';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  const location = useLocation();
  const history = useHistory();

  const handleQueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const queryValue =
    new URLSearchParams(location.search).get('searchQuery') ?? '';

  useEffect(() => {
    queryValue &&
      moviesApi.fetchSearchMovies(queryValue).then(({ results }) => {
        if (results.length === 0) {
          toast.error(`${queryValue} not found!`);
          return;
        }
        setMovies(results);
      });
  }, [queryValue]);

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Enter query!');
      return;
    }

    history.push({
      ...location,
      search: `searchQuery=${query}`,
    });
    setQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleQueryChange} />

        <button>Search</button>
      </form>
      {movies && (
        <ul>
          {movies &&
            movies.map(({ id, title }) => {
              return (
                <li key={id}>
                  <Link
                    to={{
                      pathname: `movies/${id}`,
                      state: { from: location },
                    }}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
};

export default MoviesPage;
