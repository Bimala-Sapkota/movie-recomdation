import React, { useEffect, useState } from "react";
import CardImg from "../assets/cardimg.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";

const CardList = ({ title, category }) => {
  const [data, setData] = useState([]);

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
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setData(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

      <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
        {data.map((item, index) => (
          <SwiperSlide key={index} className="max-w-72">
            <Link to={`/movie/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                alt="bg-img"
                className="h-44 w-full object-center object-contain"
              />
              <p className="text-center pt-2"> {item.original_title}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardList;
