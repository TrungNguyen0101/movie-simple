import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import MovieCard from 'components/movies/MovieCard';
import { apiKey, fetcher } from 'config';
import useDebounce from 'hooks/useDebounce';
import ReactPaginate from 'react-paginate';

// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>

const itemsPerPage = 20 // số lượng sản phẩm hiển thị
const MoviesPage = () => {

	const [pageCount, setPageCount] = useState(0);
	// console.log("🚀 ~ file: MoviesPage.js ~ line 15 ~ MoviesPage ~ pageCount", pageCount)
	const [itemOffset, setItemOffset] = useState(0);
	// console.log("🚀 ~ file: MoviesPage.js ~ line 17 ~ MoviesPage ~ itemOffset", itemOffset)


	const [nextPage, setNextPage] = useState(1)
	const [filter, setFilter] = useState(""); // set value input
	const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=1aea809a02fca4bbeaa9356d0a8ff249&page=${nextPage}`);
	const filterDebounce = useDebounce(filter, 1000) // delay thoi gian lay value)
	const handelInput = (e) => {
		setFilter(e.target.value)
	}
	const { data, error } = useSWR(url, fetcher);
	console.log("🚀 ~ file: MoviesPage.js ~ line 28 ~ MoviesPage ~ data", data)

	const loading = !data && !error
	const movies = data?.results || [];

	useEffect(() => {
		if (filterDebounce.debounceValue.length !== 0) {
			setUrl(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${filterDebounce.debounceValue}&page=${nextPage}`
			);
		}
		else {
			setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=1aea809a02fca4bbeaa9356d0a8ff249&page=${nextPage}`)
		}
		// console.log(nextPage)
	}, [filterDebounce, nextPage])






	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	useEffect(() => {
		if (!data || !data.total_results) return;
		else {
			setPageCount(Math.ceil(data.total_results / itemsPerPage)); // tổng số page
		}
	}, [data, itemOffset]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		// hiển thị dấu ... khi click vào trang khác
		const newOffset = (event.selected * itemsPerPage) % data.total_results;
		// console.log("🚀 ~ file: MoviesPage.js ~ line 62 ~ handlePageClick ~ event.selected", event.selected) // số trang đang click -1
		setItemOffset(newOffset);
		setNextPage(event.selected + 1)
	};


	// if (!data) return null;
	// const { page, total_pages } = data

	return (
		<div className="py-10 page-container">
			<div className="flex p-2">
				<div className="flex flex-1">
					<input onChange={handelInput} type="text" className="w-full p-2 rounded-lg bg-slate-800 
                    text-white" placeholder="Search movies..." />
				</div>
				<button className="ml-2 p-3 rounded-lg bg-primary">
					<svg
						xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</button>
			</div>
			{loading && <div className="border-4 rounded-full border-primary w-10 h-10 border-t-transparent animate-spin mx-auto "></div>}
			{!loading &&
				<div className="grid grid-cols-4 gap-10 p-2">
					{movies.length > 0 && movies.map(item => (
						<MovieCard key={item.id} item={item}></MovieCard>
					))}
				</div>
			}
			<div className="mt-10">
				<ReactPaginate
					breakLabel="..."
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={pageCount}
					previousLabel="< previous"
					renderOnZeroPageCount={null}
					className="pagination"
				/></div>
		</div>
	);
};

export default MoviesPage;