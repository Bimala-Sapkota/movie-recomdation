import React, { useEffect, useState } from "react";

import { Bookmark, BookMarked, Play } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  const [movie, setMovie] = useState(null);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGY2OTQ4MDg0M2I1N2YyNmJhZGE2MTE0YTI2ZjcyMyIsIm5iZiI6MTc1NjM2NjQzNi41Mywic3ViIjoiNjhiMDA2NjQwNTg0NjRlM2VmYThhODlkIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.DbRsFu7w2Kyrdq8bFTnDB5zBbTepXY1CER7jImfwFTg",
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!movie) {
    return <p> Loading...</p>;
  }
  return (
    <div className="text-white relative">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="bg-img"
        className=" w-full  rounded-2xl h-[480px] object-center object-cover "
      />
      <div className="flex space-x-4 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium">
        <button className="flex justify-center bg-white hover:bg-gray-200 text-red-500 py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for Later
        </button>
        <Link to={`/movie/${movie.id}`}>
          <button className="flex justify-center bg-red-500 hover:bg-black text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
            <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Watch Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
