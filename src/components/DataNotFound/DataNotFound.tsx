import { FilledButton } from "../../UI/Buttons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const DataNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-7">
      <h1 className="text-7xl font-bold text-main-color">Oops :(</h1>
      <h2 className="text-4xl font-bold mb-9">Seems like data is not founded...</h2>
      <FilledButton children={"Go to main page"} callback={() => navigate("/")} />

      <div className="balls-container z-50">
        <motion.div
          className="ball"
          initial={{ x: "-50vw" }} // Початкова позиція за межами екрану
          animate={{ x: "50vw" }} // Кінцева позиція за межами екрану
          transition={{
            duration: 2, // Тривалість анімації
            repeat: Infinity, // Безкінечність анімації
            ease: "linear", // Лінійна анімація
          }}
        ></motion.div>

        <motion.div
          className="ball"
          initial={{ x: "100vw" }}
          animate={{ x: "-100vw" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>

        <motion.div
          className="ball"
          initial={{ y: "-100vh" }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        ></motion.div>
      </div>
    </div>
  );
};

export default DataNotFound;