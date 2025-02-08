import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TOP_LISTS } from '../../../constants';
import { useGetMoviesTopQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import MoviesListTopSkeleton from './MoviesListTopSkeleton';

export default function MoviesListTop() {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const movieType = TOP_LISTS.find(el => el.url === location.pathname);
  const { data, error, isLoading } = useGetMoviesTopQuery({
    type: movieType?.value as string,
    page,
  });
  const navigate = useNavigate();
  useEffect(() => {
    setPage(1);
  }, [location]);
  if (error) return <ErrorMessage />;
  if (isLoading) return <MoviesListTopSkeleton />;
  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType?.title}</Typography>
      </Stack>
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
