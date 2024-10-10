import { Link } from "react-router-dom";
import MovieDefaltImage from "../../assets/images/default-movie.png";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useState } from "react";

type Props = {
  type: "movie" | "tv";
  id: number;
  title: string;
  imgUrl: string;
};

const MovieCard = ({ id, title, imgUrl, type }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>(imgUrl);
  const [isCardHowered, setIsCardHowered] = useState<boolean>(false);

  const onMouseEnterHandler = () => {
    setIsCardHowered(true);
  };

  const onMouseLeaveHandler = () => {
    setIsCardHowered(false);
  };

  return (
    <div
      className="flex flex-col sm:w-[180px] w-[90px] items-center"
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <Link
        to={`${type === "movie" ? `/movie/${id}` : `/tv/${id}`} `}
        className="rounded-lg overflow-hidden sm:h-[300px] h-[200px] w-full relative"
      >
        <div
          className={`${
            isCardHowered ? "" : "hidden"
          } transition-all bg-black bg-opacity-80 w-full h-full z-30 absolute top-0 left-0 flex justify-center items-center cursor-pointer`}
        >
          <FaRegCirclePlay className="text-main-color text-6xl transition-all" />
        </div>

        <img
          className="w-full h-full object-cover  cursor-pointer"
          src={imgSrc}
          onError={() => setImgSrc(MovieDefaltImage)}
          alt={title}
        />
      </Link>
      <h3 className="w-[80%] text-center truncate mt-5 font-bold text-sm sm:text-lg">
        {title}
      </h3>
    </div>
  );
};

export default MovieCard;
