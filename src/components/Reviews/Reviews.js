import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesApi from '../../services/movie-api';

const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    moviesApi.fetchMovieReviews(movieId).then(review => {
      setReviews(review);
    });
  }, [movieId]);

  return (
    <>
      {reviews && !reviews.total_pages ? (
        <p>We don't have any reviews for this movies</p>
      ) : (
        <ul>
          {reviews &&
            reviews.results.map(({ id, author, content }) => {
              return (
                <li key={id}>
                  <h4>Author: {author}</h4>
                  <p>{content}</p>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
};

export default Reviews;
