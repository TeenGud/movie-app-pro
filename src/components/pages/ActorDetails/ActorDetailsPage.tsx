import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';

export default function ActorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetStaffByIdQuery(id);
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        margin="auto"
      >
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) return <ErrorMessage />;
  console.log(data);
  return (
    <Grid container pt={1}>
      <Grid item xs={12} md={4}>
        <img src={data.posterUrl} style={{ width: '90%' }} alt={data.nameRu} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Stack flexDirection="row">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            color="primary"
          />
          <Stack flexDirection="column">
            <Typography variant="h5">{data.nameRu}</Typography>
            <Typography>{data.nameEn}</Typography>
          </Stack>
        </Stack>
        <Typography gutterBottom variant="h5" mt="2">
          About actor
        </Typography>
        <Grid container>
          <Grid xs={6}>
            <Typography gutterBottom>Карьера</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>{data.profession}</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>Рост</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>{data.growth}</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>Дата рождения</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>
              {data.birthday} ({data.age} лет)
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>Всего фильмов</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>{data.films.length}</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography gutterBottom>Факты</Typography>
          </Grid>
          <Grid xs={12}>
            {data.facts.map(fact => (
              <Typography gutterBottom key={fact}>
                {fact}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Movies
        </Typography>
      </Grid>
      <Stack>
        {data.films
          .filter(
            (item, index, self) =>
              index === self.findIndex(el => el.filmId === item.filmId),
          )
          .map((film, index) => (
            <Stack
              key={film.filmId}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography>{index + 1}</Typography>
              <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              <Typography>{film.rating}</Typography>
            </Stack>
          ))}
      </Stack>
    </Grid>
  );
}
