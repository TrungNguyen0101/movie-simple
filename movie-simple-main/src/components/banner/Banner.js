import React from 'react';
import styled, { css } from "styled-components";
import useSWR from 'swr';
import { fetcher, getAPI } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
const Overlay = styled.div`
position : absolute;
inset:0;
background-image: linear-gradient(to top ,rgba(0,0,0,0.5),rgba(0,0,0,0.5));
border-radius:10px;
`;
const Banner = () => {
   const { data, error } = useSWR(getAPI.MovieList("upcoming"), fetcher);
   // console.log("🚀 ~ file: MovieList.js ~ line 11 ~ MovieList ~ data", data)
   const movies = data?.results || [];
   // console.log("🚀 ~ file: Banner.js ~ line 16 ~ Banner ~ movies", movies)
   return (
      <Swiper grabCursor="true" slidesPerView={"auto"}>
         {movies.length > 0 && movies.map(item => (
            <SwiperSlide key={item.id} >
               <BannerItem item={item}></BannerItem>
            </SwiperSlide>
         ))}
      </Swiper>
   );
}
function BannerItem({ item }) {
   const { title, backdrop_path, id } = item;
   const navigate = useNavigate()
   return (
      <div className="w-full h-full rounded-lg relative ">
         <Overlay className="overlay"></Overlay>
         <img src={`https://image.tmdb.org/t/p/original/${backdrop_path} `} alt="" className="w-full h-full object-cover rounded-lg object-top" />
         <div className="absolute left-5 bottom-5  text-white">
            <h1 className="font-bold text-3xl mb-3">{title}</h1>
            <flex className="flex items-center gap-5 mb-5">
               <span className="py-2 px-4 border border-white rounded-lg">Adventure</span>
               <span className="py-2 px-4 border border-white rounded-lg">Adventure</span>
               <span className="py-2 px-4 border border-white rounded-lg">Adventure</span>
            </flex>
            <Button
               onClick={() => {
                  return navigate(`/movie/${id}`)
               }}
               className="w-auto"
            >Watch now
            </Button>
         </div>
      </div>
   )
}
export default Banner;