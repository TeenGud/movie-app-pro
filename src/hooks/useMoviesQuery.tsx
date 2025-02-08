import { useSelector } from 'react-redux';

import { TOP_LISTS } from '../constants';
import {
  useGetMoviesQuery,
  useGetMoviesTopQuery,
} from '../services/kinopoiskApi';
import { RootState } from '../store/store';

export default function useMoviesQuery() {
  const page = useSelector((state: RootState) => state.currentQuery.page);
  const { countries, order, year } = useSelector(
    (state: RootState) => state.currentQuery,
  );
  const responsePopular = useGetMoviesTopQuery({
    type: TOP_LISTS[0].value,
    page,
  });
  const responseBest = useGetMoviesTopQuery({
    type: TOP_LISTS[1].value,
    page,
  });
  const responseMovies = useGetMoviesQuery({
    type: 'FILM',
    countries,
    genreId: '1',
    order,
    year,
    page,
  });
  const responseSeries = useGetMoviesQuery({
    type: 'TV_SERIES',
    countries,
    genreId: '1',
    order,
    year,
    page,
  });
  const responseCartoons = useGetMoviesQuery({
    type: 'FILM',
    countries,
    genreId: 18,
    order,
    year,
    page,
  });

  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseMovies.isFetching ||
    responseSeries.isFetching ||
    responseCartoons.isFetching;
  const hasError =
    responsePopular.isError ||
    responseBest.isError ||
    responseMovies.isError ||
    responseSeries.isError ||
    responseCartoons.isError;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseMovies,
    responseSeries,
    responseCartoons,
  };
}
