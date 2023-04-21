import { Fragment, lazy, Suspense } from 'react'
import './App.css'
import "swiper/scss"
import Header from './components/layout/Header';
import { Route, Routes } from 'react-router-dom';
// import HomePage from './page/HomePage';
// import MoviesPage from './page/MoviesPage';
// import MoviesDetailPage from './page/MoviesDetailPage';

const HomePage = lazy(() => import('./page/HomePage'));
const MoviesPage = lazy(() => import('./page/MoviesPage'));
const MoviesDetailPage = lazy(() => import('./page/MoviesDetailPage'));
// lazy, Suspense : reload 1 trang duy nhat giup load nhanh hon
function App() {

  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Header></Header>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movie" element={<MoviesPage></MoviesPage>}></Route>
            <Route path="/movie/:movieId" element={<MoviesDetailPage></MoviesDetailPage>}></Route>
            <Route path="*" element={<>Not found</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>

  )
}
export default App
