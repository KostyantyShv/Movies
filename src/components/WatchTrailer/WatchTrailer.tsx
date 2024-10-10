import ReactPlayer from "react-player";
import { useGetMovieTrailerQuery } from "../../redux/api/movie.api";
import Loader from "../Loader/Loader";
import { useEffect } from "react";

type Props = {
  id: string;
  isTrailerOpen: boolean;
  setIsTrailerOpen: React.Dispatch<React.SetStateAction<boolean>>
};

const WatchTrailer = ({ id, isTrailerOpen, setIsTrailerOpen }: Props) => {
  const { data } = useGetMovieTrailerQuery(id);
 
  useEffect(() => {
    const handleBodyOverflow = () => {
      if (isTrailerOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
  
    handleBodyOverflow();
  
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTrailerOpen]);


  return (
    <div className="w-full h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-80 flex lg:items-center justify-center">
      {data?.results ? (
      <div className="px-6 mt-20 w-[90%] xl:h-[80%] lg:h-[60%] md:h-[50%] sm:h-[40%] h-[30%]">
          <ReactPlayer
          controls={true}
          playing={true}
          width={"100%"}
          height={"100%"}
          url={`https://www.youtube.com/watch?v=${data?.results[Math.floor(Math.random() * data?.results.length)].key}`}
        />
        <button className="absolute top-5 right-8 text-2xl sm:text-5xl font-bold" onClick={() => setIsTrailerOpen(false)}>X</button>
      </div>
        
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WatchTrailer;
