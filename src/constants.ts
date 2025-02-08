import {
  AutoAwesome,
  Bloodtype,
  FamilyRestroom,
  Fort,
  LiveTv,
  LocalMovies,
  MenuBook,
  MoodBad,
  Pool,
  Reorder,
  StarPurple500,
  VolunteerActivism,
} from '@mui/icons-material';

export const iconComponents = {
  AutoAwesome: AutoAwesome,
  Bloodtype,
  FamilyRestroom,
  LiveTv,
  MenuBook,
  MoodBad,
  Pool,
  StarPurple500,
  VolunteerActivism,
  LocalMovies,
  Reorder,
  Fort,
};
export const TOP_LISTS = [
  {
    title: 'Top 100 popular movies',
    icon: 'AutoAwesome',
    url: '/popular',
    value: 'TOP_POPULAR_MOVIES',
  },
  {
    title: 'Top 250 best movies',
    icon: 'StarPurple500',
    url: '/best',
    value: 'TOP_250_MOVIES',
  },
  {
    title: 'Vampires',
    icon: 'Bloodtype',
    url: '/vampires',
    value: 'VAMPIRE_THEME',
  },
  {
    title: 'Comics',
    icon: 'MenuBook',
    url: '/comics',
    value: 'COMICS_THEME',
  },
  {
    title: 'TvShows',
    icon: 'FamilyRestroom',
    url: '/tvshows',
    value: 'TOP_250_TV_SHOWS',
  },
  {
    title: 'Romantic',
    icon: 'VolunteerActivism',
    url: '/romantic',
    value: 'LOVE_THEME',
  },
  {
    title: 'TopPopularAll',
    icon: 'MoodBad',
    url: '/toppopularall',
    value: 'TOP_POPULAR_ALL',
  },
  {
    title: 'Disasters',
    icon: 'Pool',
    url: '/disasters',
    value: 'CATASTROPHE_THEME',
  },
  {
    title: 'Popular series',
    icon: 'LiveTv',
    url: '/popular-series',
    value: 'POPULAR_SERIES',
  },
];

export const MOVIE_LISTS = [
  {
    title: 'Movies',
    icon: 'LocalMovies',
    url: '/films',
    value: 'FILM',
  },
  {
    title: 'Series',
    icon: 'Reorder',
    url: '/series',
    value: 'TV_SERIES',
  },
  {
    title: 'Cartoons',
    icon: 'Fort',
    url: '/cartoons',
    value: 'FILM',
  },
];
