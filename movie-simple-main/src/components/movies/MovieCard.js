import LoadingSkeleton from 'components/loading/LoadingSkeleton';
import React from 'react';
import { useNavigate } from "react-router-dom"
import Button from '../button/Button';
//https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png 
//https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>  
const MovieCard = ({ item }) => {
    const { title, release_date, vote_average, poster_path, id } = item
    const navigate = useNavigate(); // dieu huong de trang nao do
    return (
        <div className="movie-card p-3 flex flex-col  bg-slate-800 rounded-lg text-white h-full select-none">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path} `} alt="" className="w-full object-cover rounded-lg
             h-[200px] mb-5" />
            <div className="flex flex-1 flex-col">
                <h3 className="font-bold text-[18px] mb-2">{title}</h3>
                <div className="flex items-center justify-between opacity-50 text-[14px] mb-5">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span>{vote_average}</span>
                </div>
                <Button
                    onClick={() => {
                        return navigate(`/movie/${id}`)
                    }}

                >Watch now
                </Button>
            </div>
        </div>
    );
};

export default MovieCard;
export const MovieCardSkeleton = () => {
    return (
        <div className="movie-card p-3 flex flex-col   bg-slate-800 rounded-lg text-white h-full select-none">
            <LoadingSkeleton
                width="100%" height="200px" radius="8px" className="mb-5">
            </LoadingSkeleton>
            <div className="flex flex-1  flex-col h-[100px] ">
                <h3 className="font-bold text-[18px] mb-4 mt-2">
                    <LoadingSkeleton
                        width="100%" height="20px">
                    </LoadingSkeleton>
                </h3>
                <div className="flex items-center justify-between opacity-50 text-[14px] mb-5">
                    <span>
                        <LoadingSkeleton
                            width="50px" height="10px">
                        </LoadingSkeleton>
                    </span>
                    <span>
                        <LoadingSkeleton
                            width="30px" height="10px">
                        </LoadingSkeleton>
                    </span>
                </div>
                <LoadingSkeleton
                    width="100%" height="50px" className="mt-auto rounded-lg">
                </LoadingSkeleton>
            </div>
        </div>
    )
}
