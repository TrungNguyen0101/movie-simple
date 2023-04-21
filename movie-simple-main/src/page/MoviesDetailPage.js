import React from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/scss"
import useSWR from 'swr';
import { apiKey, fetcher, getAPI } from '../config';
import styled, { css } from "styled-components";
import MovieCard from '../components/movies/MovieCard';


////https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>

const MoviesDetailPage = () => {
	const { movieId } = useParams()
	const { data, error } = useSWR(getAPI.MovieDetail(movieId), fetcher)
	if (!data) return null;
	const { backdrop_path, poster_path, title, genres, overview } = data;
	// console.log("🚀 ~ file: MoviesDetailPage.js ~ line 12 ~ MoviesDetailPage ~ data", data)
	return (
		<div className="px-5 py-10">
			<div className="w-full h-[500px] relative ">
				<div className="absolute inset-0 bg-black opacity-50"></div>
				<div className="w-full h-full bg-cover bg-no-repeat" style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`
				}}>
				</div>
			</div>
			<div className="w-[800px] h-[400px] m-auto -mt-[300px] relative z-10 pb-10">
				<img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt="" className="w-full h-full object-cover object-top rounded-lg" />
			</div>
			<h2 className="font-bold text-4xl text-center mb-10">{title}</h2>
			{genres.length > 0 && <div className="flex items-center justify-center gap-x-5 mb-10">
				{genres.map(item => (
					<span className="border border-primary px-4 py-2 rounded text-center text-primary " key={item.id}>{item.name}</span>
				))}
			</div>}
			<p className="text-center max-w-[500px] m-auto leading-relaxed mb-10">{overview}</p>
			<MovieCredits></MovieCredits>
			<MovieVideos></MovieVideos>
			<MovieSimilar></MovieSimilar>
		</div>
	)
};

function MovieCredits() {
	//https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>
	const { movieId } = useParams()
	const { data, error } = useSWR(getAPI.MovieCredits(movieId), fetcher)
	if (!data) return null;
	const { cast } = data

	if (!cast || cast.length <= 0) return null;
	// console.log("🚀 ~ file: MoviesDetailPage.js ~ line 41 ~ MovieCredits ~ data", data)
	return (
		<div className="text-center text-2xl pb-10">Casts
			<div className="list-cast mt-10 select-none">
				<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={4}>
					{cast.length > 0 && cast.map(item => (
						<SwiperSlide key={item.id} >
							<div className="card-item ">
								<img src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`} alt="" className="w-full h-[350px]" />
							</div>
							<h2 className="mt-5">{item.name}</h2>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}
function MovieVideos() {
	//https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>> 
	const { movieId } = useParams()
	const { data, error } = useSWR(getAPI.MovieVideos(movieId), fetcher)
	// console.log("🚀 ~ file: MoviesDetailPage.js ~ line 73 ~ MovieVideos ~ data", data)
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<div className="flex flex-col gap-y-10">
				{results.length > 0 && results.slice(0, 3).map(item => {
					return (
						<div key={item.id} className={item.className}>
							<h3 className="text-center text-2xl mb-5 font-bold p-3 bg-primary inline-block m-auto rounded-lg">{item.name}</h3>
							<div className="w-full aspect-video" >
								<iframe width="1094" height="480" src={`https://www.youtube.com/embed/${item.key}`} title="(Ao Làng Champions League #1) Đội hình Tottenham hủy diệt giải Ao làng gặp ngay đối cứng." frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
									className="w-full h-full object-fill"></iframe>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

function MovieSimilar() {
	//https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>
	const { movieId } = useParams() // lat ra blug or id
	const { data, error } = useSWR(getAPI.MovieSimilar(movieId), fetcher)
	console.log("🚀 ~ file: MoviesDetailPage.js ~ line 73 ~ MovieVideos ~ data", data)
	if (!data) return null;
	const { results } = data;
	if (!results || results.length <= 0) return null;
	return (
		<div className="py-10">
			<div className="text-3xl text-center font-bold">Similar Movies</div>
			<div className="movie-list">
				<Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
					{results.length > 0 && results.map(item => (
						<SwiperSlide key={item.id}>
							<MovieCard item={item}></MovieCard>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	)
}
export default MoviesDetailPage;