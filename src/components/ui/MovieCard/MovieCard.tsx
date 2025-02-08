import { Box, Link, Rating, Stack, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Movie } from '../MoviesList/MoviesList';
import styles from './MovieCard.module.css';

interface MovieCard {
  movie: Movie;
  reload?: boolean;
}

export default function MovieCard({ movie, reload = false }: MovieCard) {
  console.log(movie);
  const linkProps = reload
    ? { component: RouterLink, to: `/movie/${movie.kinopoiskId}` }
    : { component: RouterLink, to: `/movie/${movie.kinopoiskId}` };
  return (
    <Stack key={movie.kinopoiskId}>
      <Link {...linkProps}>
        <img
          src={movie.posterUrlPreview}
          alt={movie.nameEn}
          className={styles.img}
        />
        <Link textAlign="center" width={200}>
          <Typography textAlign="center">
            {movie.nameRu ? movie.nameRu : movie.nameEn}
          </Typography>
        </Link>
      </Link>
      {movie.ratingKinopoisk && (
        <Stack alignItems="center">
          <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
            <Box>
              <Rating
                name="read-only"
                value={movie.ratingKinopoisk / 2}
                readOnly
                precision={0.1}
              />
            </Box>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
}
