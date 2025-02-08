import { Link } from '@mui/material';
import { Stack } from '@mui/system';
import BearCarousel, { BearSlideImage } from 'bear-react-carousel';
import { Link as RouterLink } from 'react-router-dom';

import useMoviesQuery from '../../../hooks/useMoviesQuery';
import ErrorMessage from '../../ui/ErrorMessage';
import MoviesSkeleton from './MoviesSkeleton';

export default function MoviesPage() {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseMovies,
    responseSeries,
    responseCartoons,
  } = useMoviesQuery();

  if (isLoading) return <MoviesSkeleton />;
  if (hasError) return <ErrorMessage />;

  const serializeDataForCarousel = (
    data: {
      imdbId: string;
      name: string;
      posterUrlPreview: string;
      kinopoiskId: string;
    }[],
  ) => {
    return data.map(
      (row: {
        imdbId: string;
        name: string;
        posterUrlPreview: string;
        kinopoiskId: string;
      }) => (
        <RouterLink key={row.imdbId} to={`/movie/${row.kinopoiskId}`}>
          <BearSlideImage imageUrl={row.posterUrlPreview} />
        </RouterLink>
      ),
    );
  };
  const carouselArr = [
    {
      title: 'Popular movies',
      url: '/popular',
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: 'Best movies',
      url: '/best',
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: 'Films',
      url: '/films',
      data: serializeDataForCarousel(responseMovies.data.items),
    },
    {
      title: 'Series',
      url: '/series',
      data: serializeDataForCarousel(responseSeries.data.items),
    },
    {
      title: 'Cartoons',
      url: '/cartoons',
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];
  console.log(responsePopular.data.items);
  return (
    <div>
      {carouselArr.map(element => (
        <Stack key={element.title}>
          <Link
            sx={{ mt: 2, mb: 2 }}
            variant="h4"
            component={RouterLink}
            to={element.url}
          >
            {element.title}
          </Link>
          <BearCarousel
            data={element.data}
            slidesPerView={1}
            slidesPerGroup={1}
            enableNavButton
            isEnableNavButton
            isEnableLoop
            autoPlayTime={5000}
            isEnableAutoPlay
            breakpoints={{
              500: {
                autoPlayTime: 0,
              },
              768: {
                slidesPerView: 5,
              },
            }}
          />
        </Stack>
      ))}
    </div>
  );
}
