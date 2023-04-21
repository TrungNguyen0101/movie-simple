import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, getAPI } from '../../config';
import MovieCard, { MovieCardSkeleton } from './MovieCard';

const MovieList = ({ type = "now_playing" }) => {

   const { data, error } = useSWR(getAPI.MovieList(type), fetcher);
   const isLoading = !data && !error;
   console.log("🚀 ~ file: MovieList.js ~ line 11 ~ MovieList ~ isLoading", isLoading)
   const movies = data?.results || [];

   return (
      <div className="movie-list">
         {isLoading && <>
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
               <SwiperSlide>
                  <MovieCardSkeleton></MovieCardSkeleton>
               </SwiperSlide>
               <SwiperSlide>
                  <MovieCardSkeleton></MovieCardSkeleton>
               </SwiperSlide>
               <SwiperSlide>
                  <MovieCardSkeleton></MovieCardSkeleton>
               </SwiperSlide>
            </Swiper>
         </>}
         {!isLoading &&
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
               {movies.length > 0 && movies.map(item => (
                  <SwiperSlide key={item.id}>
                     <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
               ))}
            </Swiper>
         }
      </div>
   );
};

export default MovieList;