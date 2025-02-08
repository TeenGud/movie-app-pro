import { Pagination, Stack } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import MovieCard from '../MovieCard';

export interface Movie {
  kinopoiskId: number;
  posterUrlPreview: string;
  nameRu: string;
  nameEn: string;
  ratingKinopoisk: number;
  filmId?: number;
}

interface MoviesList {
  movies: any;
  totalPages: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function MoviesList({
  movies,
  totalPages,
  page,
  setPage,
}: MoviesList) {
  console.log(movies, totalPages, page, setPage);
  return (
    <>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {movies.map((movie: Movie) => (
          <MovieCard movie={movie} key={movie.kinopoiskId} />
        ))}
      </Stack>
      <Stack alignItems="center" marginTop="10px">
        <Pagination
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          page={page}
          onChange={(_, value) => setPage(value++)}
        />
      </Stack>
    </>
  );
}
