import { useState } from "react";
import MovieDefaltImage from "../../assets/images/default-movie.png";

type Props = {
  imgUrl: string;
  name: string;
};

const EpisodeCard = ({ name, imgUrl }: Props) => {
  const [imgSrc, setImgSrc] = useState<string>(
    "https://image.tmdb.org/t/p/original" + imgUrl
  );

  return (
    <div className="flex flex-col w-[200px] cursor-pointer items-center">
      <img
        className="object-cover w-full h-[400px]"
        src={imgSrc}
        alt={name}
        onError={() => setImgSrc(MovieDefaltImage)}
      />
      <h4 className="text-center w-[90%] self-center mt-5 font-bold text-lg">{name}</h4>
    </div>
  );
};

export default EpisodeCard;
