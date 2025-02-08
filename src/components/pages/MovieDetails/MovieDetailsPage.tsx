import { ArrowBack, Language, Movie } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import {
  useGetMovieQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MovieCard from '../../ui/MovieCard';
import { Movie as MovieInterface } from '../../ui/MoviesList/MoviesList';
import VideoPlayer from '../../ui/VideoPlayer/VideoPlayer';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const filmResponse = useGetMovieQuery(id);
  const sequelsAndPrequelsResponse = useGetSequelsAndPrequelsQuery(id);
  const staffResponse = useGetStaffQuery(id);
  console.log(filmResponse);
  console.log(sequelsAndPrequelsResponse);
  console.log(staffResponse);

  if (
    filmResponse.isLoading ||
    sequelsAndPrequelsResponse.isLoading ||
    staffResponse.isLoading
  )
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="6rem" />
      </Box>
    );
  if (filmResponse.error || staffResponse.error)
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <ErrorMessage />
      </Box>
    );
  return (
    <>
      <Grid container spacing={2} mt={2}>
        <Grid item md={4} sm={12}>
          <img
            src={filmResponse.data.posterUrl}
            alt={filmResponse.data.nameRu}
            width="100%"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <Grid container>
            <Grid item xs={2}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid item xs={4} alignContent="center">
              <Typography variant="h5">{filmResponse.data.nameRu}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              Year
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{filmResponse.data.year}</Typography>
            </Grid>
            <Grid item xs={6}>
              Country
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {filmResponse.data.countries.map(({ country }) => (
                  <Typography key={country}>{country}</Typography>
                ))}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Genres
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {filmResponse.data.genres.map(({ genre }) => (
                  <Typography key={genre}>{genre}</Typography>
                ))}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Directors
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {staffResponse.data
                  .filter(el => el.professionText === 'Режиссеры')
                  .map(({ nameRu }) => (
                    <Typography key={nameRu}>{nameRu}</Typography>
                  ))}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              Time
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {filmResponse.data.filmLength} min
              </Typography>
            </Grid>
            <Grid item xs={12}>
              Description
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {filmResponse.data.description
                  ? filmResponse.data.description
                  : 'No description'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="h6">Main cast</Typography>
          {staffResponse.data
            .filter(el => el.professionText === 'Актеры')
            .slice(0, 10)
            .map(({ nameRu, staffId }) => (
              <div key={nameRu}>
                <Link
                  component={RouterLink}
                  gutterBottom
                  to={`/actor/${staffId}`}
                >
                  {nameRu}
                </Link>
              </div>
            ))}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              target="_blank"
              href={filmResponse.data.webUrl}
              endIcon={<Language />}
            >
              Kinopoisk
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${filmResponse.data.imdbId}`}
              endIcon={<Movie />}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}></Grid>
        <Typography variant="h5">Watch online</Typography>
        <VideoPlayer />
      </Grid>
      {sequelsAndPrequelsResponse.data ? (
        <Stack alignItems="center">
          <Typography variant="h5">Sequels and prequels</Typography>
          <Stack direction="row" flexWrap="wrap" sx={{ gap: 2 }}>
            {sequelsAndPrequelsResponse.data?.map(el => (
              <MovieCard
                key={el.filmId}
                movie={el as MovieInterface}
                reload={true}
              />
            ))}
          </Stack>
        </Stack>
      ) : (
        ''
      )}
    </>
  );
}
