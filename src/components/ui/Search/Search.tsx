import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSearchQuery } from '../../../features/searchQuerySlice';
import { useGetMoviesQuery } from '../../../services/kinopoiskApi';
import { AppDispatch, RootState } from '../../../store/store';

const movieTypes = {
  FILM: 'Фильм',
  TV_SERIES: 'Сериал',
  TV_SHOW: 'ТВ-Шоу',
  MINI_SERIES: 'Мини-сериал',
};

export default function Search() {
  const navigate = useNavigate();
  const { keyword, countries, genreId, order, type, year, page } = useSelector(
    (state: RootState) => state.searchQuerySlice,
  );
  const dispatch = useDispatch<AppDispatch>();
  const [input, setInput] = useState('');
  const { data } = useGetMoviesQuery({
    keyword,
    countries,
    genreId,
    order,
    type,
    year,
    page,
  });
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);
    return () => clearTimeout(setTimeoutId);
  }, [input]);
  return (
    <Autocomplete
      freeSolo
      sx={{ width: 300, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
      getOptionLabel={(option: {
        nameRu: string;
        year: string;
        type: string;
      }) => {
        return `${option.nameRu} ${option.year} ${movieTypes[option.type]}`;
      }}
      options={data ? data.items : []}
      onChange={(_, value: { kinopoiskId: string }) => {
        navigate(`/movie/${value?.kinopoiskId}`);
      }}
      renderInput={params => <TextField {...params} label="Search" />}
      onInputChange={(_, value) => {
        setInput(value);
      }}
    />
  );
}
