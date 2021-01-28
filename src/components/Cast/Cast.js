import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../../services/movie-api';
import defaultImg from '../../img/defaultImg.jpg';
const Cast = () => {
  const [actors, setActors] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    moviesApi.fetchMovieCredits(movieId).then(({ cast }) => {
      setActors(cast);
    });
  }, [movieId]);

  return (
    <ul>
      {actors &&
        actors.map(({ id, profile_path, name, character }) => {
          return (
            <li key={id}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w185${profile_path}`
                    : defaultImg
                }
                alt={name}
              />
              <p>{name}</p>
              <p>{character}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default Cast;
