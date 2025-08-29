import { Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

const Moviepage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [recommendation, setRecommendation] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGY2OTQ4MDg0M2I1N2YyNmJhZGE2MTE0YTI2ZjcyMyIsIm5iZiI6MTc1NjM2NjQzNi41Mywic3ViIjoiNjhiMDA2NjQwNTg0NjRlM2VmYThhODlkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.DbRsFu7w2Kyrdq8bFTnDB5zBbTepXY1CER7jImfwFTg",
    },
  };

  useEffect(() => {
    // First fetch for the main movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => setMovie(res))
      .catch((err) => console.error(err));

    // Second fetch for additional movie information (if applicable)
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setRecommendation(res.results || []))
      .catch((err) => console.error(err));

    // Fetch movie trailers
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const trailer = res.results?.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer" // Corrected spelling
        );
        setTrailerKey(trailer?.key || null);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        {" "}
        <span className="text-x1 text-red-500"> Loading....</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div
        className="relative h-[60vh] flex items-end"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent"></div>
        <div className="relative z-10 flex items-end p-8 gap-8">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            className="rounded-lg shadow-lg w-48 hidden md:block"
          />
          <div>
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <div className="flex items-center gap-4">
              <span>⭐{movie.vote_average?.toFixed(1)}</span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} min</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="max-w-2xl text-gray-200">{movie.overview}</p>
            <a
              href={`https://www.youtube.com/watch?v=${trailerKey}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="flex justify-center bg-red-500 hover:bg-black
               text-white py-3 px-4 rounded-full cursor-pointer text-sm mt-2"
              >
                <Play className="mr-2 w-4 h-5" /> Watch Now
              </button>
            </a>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>
        <div className="bg-black rounded-b-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <ul className="text-gray-300 space-y-3">
              <li>
                <span className="font-semibold text-white">Status:</span>
                <span className="ml-2">{movie.status}</span>
              </li>
              <li>
                <span className="font-semibold text-white">Released Date:</span>
                <span className="ml-2">{movie.release_date}</span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Original Language:
                </span>
                <span className="ml-2">
                  {movie.original_language?.toUpperCase()}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Budget:</span>
                <span className="ml-2">
                  {movie.budget ? `$${movie.budget}` : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">Revenue:</span>
                <span className="ml-2">
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Production Companies:
                </span>
                <span className="ml-2">
                  {movie.production_companies.length > 0
                    ? movie.production_companies.map((c) => c.name).join(", ")
                    : "N/A"}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">
                  Spoken Languages:
                </span>
                <span className="ml-2">
                  {movie.spoken_languages.length > 0
                    ? movie.spoken_languages
                        .map((l) => l.english_name)
                        .join(", ")
                    : "N/A"}
                </span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-2">Tagline</h3>
            <p className="italic text-gray-400 mb-6">
              {movie.tagline || "No tagline available."}
            </p>
            <h3 className="font-semibold text-white mb-2">Overview</h3>
            <p className="text-gray-200">
              {movie.overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>

      {recommendation.length > 0 && (
        <div className="text-2xl font-semibold mb-4">
          <h2>You might also like:</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-4 gap-4">
            {recommendation.slice(0, 10).map((rec) => (
              <div
                key={rec.id}
                className="bg-gray-800 rounded-lg p-4 overflow-hidden hover:scale-105 
                transition"
              >
                <Link to={`/movie/${rec.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                    alt={rec.title}
                    className="rounded mb-2 w-full h-48 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold">{rec.title}</h3>
                    <span className="text-xs text-gray-400">
                      {rec.release_date.slice(0, 4)}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Moviepage;
