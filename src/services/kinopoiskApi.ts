import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Movie } from '../components/ui/MoviesList/MoviesList';

const kinopoiskKey = import.meta.env.VITE_KINOPOISK_API_KEY;

const excludeGenres = ['', 'новости', 'церемония'];

export const kinopoiskApi = createApi({
  reducerPath: 'kinopoiskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://kinopoiskapiunofficial.tech/api',
    prepareHeaders: headers => {
      headers.set('X-API-KEY', kinopoiskKey);
      headers.set('Content-Type', 'application/json');
    },
  }),
  endpoints: builder => ({
    getMoviesTop: builder.query({
      query: ({ type, page }: { type: string; page: number }) =>
        `/v2.2/films/collections?type=${type}&page=${page}`,
    }),
    getMovies: builder.query({
      query: ({
        countries,
        genreId,
        order = 'NUM_VOTE',
        type = 'FILM',
        year,
        page,
        keyword = '',
      }) =>
        `/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&yearFrom=${year}&yearTo=${year}&page=${page}&keyword=${keyword}`,
    }),
    getGenresAndCountries: builder.query({
      query: () => 'v2.2/films/filters',
      transformResponse: (response: {
        genres: { id: string; genre: string }[];
        countries: { id: string; country: string }[];
      }) => ({
        ...response,
        genres: response.genres.filter(
          genre => !excludeGenres.includes(genre.genre),
        ),
      }),
    }),
    getMovie: builder.query({
      query: id => `/v2.2/films/${id}`,
    }),
    getSequelsAndPrequels: builder.query({
      query: id => `/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse: (response: Movie[]) =>
        response.map(el => ({ ...el, kinopoiskId: el.filmId })),
    }),
    getStaff: builder.query({
      query: id => `/v1/staff?filmId=${id}`,
    }),
    getStaffById: builder.query({
      query: id => `/v1/staff/${id}`,
    }),
  }),
});

export const {
  useGetMoviesTopQuery,
  useGetMoviesQuery,
  useGetGenresAndCountriesQuery,
  useGetMovieQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
  useGetStaffByIdQuery,
} = kinopoiskApi;
