import { ArrowBack } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { MOVIE_LISTS } from '../../../constants';
import {
  useGetGenresAndCountriesQuery,
  useGetMoviesQuery,
} from '../../../services/kinopoiskApi';
import { RootState } from '../../../store/store';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesList from '../../ui/MoviesList';
import SelectMovies from '../../ui/SelectMovies';
import MoviesListMainSkeleton from './MoviesListMainSkeleton';

export default function MoviesListMain() {
  const { countries, order, year, genreId } = useSelector(
    (state: RootState) => state.currentQuery,
  );
  const [page, setPage] = useState(1);
  const location = useLocation();
  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);
  const myGenreId = movieType?.url === '/cartoons' ? 18 : genreId;
  const { data, error, isLoading } = useGetMoviesQuery({
    type: movieType?.value as string,
    page,
    countries,
    order,
    year,
    genreId: myGenreId,
  });
  const responseGenresAndCountries = useGetGenresAndCountriesQuery(0);
  const navigate = useNavigate();
  useEffect(() => {
    setPage(1);
  }, [location]);
  if (error || responseGenresAndCountries.error) return <ErrorMessage />;
  if (isLoading || responseGenresAndCountries.isLoading)
    return <MoviesListMainSkeleton />;
  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} />
        <Typography variant="h4">{movieType?.title}</Typography>
      </Stack>
      <SelectMovies
        countriesList={responseGenresAndCountries.data?.countries}
        genresList={responseGenresAndCountries.data?.genres}
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
      />
      <MoviesList
        movies={data.items}
        totalPages={data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
