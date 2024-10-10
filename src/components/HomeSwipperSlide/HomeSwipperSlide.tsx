import { FilledButton, OutlineButton } from "../../UI/Buttons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


type Props = {
  id: number;
  title: string;
  imgBackground: string;
  description: string;
  imgPoster: string;
  openTrailer: (id: string) => void;
};

const HomeSwipperSlide = ({ id, title, imgBackground, imgPoster, description, openTrailer }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full relative flex flex-col justify-center pt-5">
      <img
        className="main-img w-full h-full absolute top-0 left-0 object-fill z-10 brightness-[25%] disabled:selection"
        src={imgBackground}
        alt=""
      />
      <motion.div
        className="relative z-30 sm:w-[90%] w-full m-auto flex gap-16 justify-center cursor-default items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col w-full px-8 md:1/2 md:items-baseline items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="xl:text-5xl lg:text-3xl text-xl sm:text-3xl font-bold mb-5 md:text-left text-center">
            {title}
          </h3>
          <motion.p
            className="sm:text-sm text-xs md:text-xl lg:text-xl md:text-left text-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>

          <div className="flex gap-4 mt-8 h-8">
            <FilledButton callback={() => {openTrailer(id.toString())}} children={"Watch trailer"} />
            <OutlineButton
              callback={() => {
                navigate(`/movie/${id}`);
              }}
              children={"Show more"}
            />
          </div>
        </motion.div>
        <motion.img
          className="h-[450px] w-[250px] lg:h-[600px] lg:w-[400px] object-cover md:block hidden"
          src={imgPoster}
          alt={title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
      </motion.div>
    </div>
  );
};

export default HomeSwipperSlide;
