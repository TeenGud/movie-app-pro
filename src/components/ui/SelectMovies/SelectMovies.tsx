import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import { resetQuery, selectQuery } from '../../../features/currentQuerySlice';
import { AppDispatch } from '../../../store/store';

export default function SelectMovies({
  countriesList,
  genresList,
  countries,
  order,
  year,
  genreId,
}) {
  const dispatch = useDispatch<AppDispatch>();
  const yearList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));
  const orderList = [
    { title: 'By rating', value: 'RATING' },
    { title: 'By votes', value: 'NUM_VOTE' },
  ];
  return (
    <Stack
      mt={2}
      mb={2}
      sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 1 }}
    >
      <FormControl fullWidth size="small">
        <InputLabel>Sort</InputLabel>
        <Select
          label="Order"
          value={order}
          onChange={e => dispatch(selectQuery({ order: e.target.value }))}
        >
          {orderList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Country</InputLabel>
        <Select
          label="Country"
          value={countries}
          onChange={e => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {countriesList.map(country => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Genre</InputLabel>
        <Select
          label="Genre"
          value={genreId}
          onChange={e => dispatch(selectQuery({ genreId: e.target.value }))}
        >
          {genresList.map(genre => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel>Year</InputLabel>
        <Select
          label="Year"
          onChange={e => dispatch(selectQuery({ year: e.target.value }))}
          value={year}
        >
          {yearList.map(year => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        <Button
          variant="outlined"
          startIcon={<CloseIcon />}
          onClick={() => dispatch(resetQuery())}
        >
          Reset
        </Button>
      </Box>
    </Stack>
  );
}
