import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MOVIE_LISTS, TOP_LISTS } from '../constants';
import Layout from './Layout';
import ActorDetailsPage from './pages/ActorDetails/ActorDetailsPage';
import MovieDetailsPage from './pages/MovieDetails/MovieDetailsPage';
import MoviesPage from './pages/Movies/MoviesPage';
import MoviesListMain from './pages/MoviesListMain';
import MoviesListTop from './pages/MoviesListTop';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MoviesPage />,
        },
        ...TOP_LISTS.map(genre => ({
          path: genre.url,
          element: <MoviesListTop />,
        })),
        ...MOVIE_LISTS.map(movie => ({
          path: movie.url,
          element: <MoviesListMain />,
        })),
        {
          path: '/movie/:id',
          element: <MovieDetailsPage />,
        },
        {
          path: '/actor/:id',
          element: <ActorDetailsPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
