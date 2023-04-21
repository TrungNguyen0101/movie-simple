export const fetcher = (...args) => fetch(...args).then(res => res.json())
export const apiKey = "1aea809a02fca4bbeaa9356d0a8ff249";

export const getAPI = {
    MovieList: (type) => `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}`,
    MovieDetail: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    MovieCredits: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    MovieVideos: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    MovieSimilar: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
}