import React, { Fragment } from 'react';
import Banner from '../components/banner/Banner';
import MovieList from '../components/movies/MovieList';

const HomePage = () => {
   return (
      <Fragment>
         <section className="banner page-container h-[400px] mb-10 overflow-hidden ">
            <Banner></Banner>
         </section>
         <section className="movies-layout page-container pb-10">
            <h2 className="capitalize font-bold text-3xl text-white pb-10">Now Playing</h2>
            <MovieList></MovieList>
         </section>
         <section className="movies-layout page-container pb-10">
            <h2 className="capitalize font-bold text-3xl text-white pb-10">Top rated movies</h2>
            <MovieList type={"top_rated"}></MovieList>
         </section>
         <section className="movies-layout page-container pb-10">
            <h2 className="capitalize font-bold text-3xl text-white pb-10">Top trending</h2>
            <MovieList type={"popular"}></MovieList>
         </section>
      </Fragment>
   );
};

export default HomePage;