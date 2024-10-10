import { motion, useCycle } from "framer-motion";
import { useEffect } from "react";

const PageLoading = () => {
  const dotVariants = {
    hidden: {
      y: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      y: -10,
      opacity: [1, 0.7, 1],
      transition: {
        duration: 0.6,
        repeat: Infinity,
      },
    },
  };

  const [dotCycle, cycle] = useCycle("hidden", "visible");

  useEffect(() => {
    const interval = setInterval(() => {
      cycle();
    }, 600);

    return () => clearInterval(interval);
  }, [cycle]);

  const returnDots = () => {
    return (
      <>
        <motion.span variants={dotVariants} animate={dotCycle} style={{ marginRight: "8px" }}>.</motion.span>
        <motion.span variants={dotVariants} animate={dotCycle} style={{ marginRight: "8px" }}>.</motion.span>
        <motion.span variants={dotVariants} animate={dotCycle} style={{ marginRight: "8px" }}>.</motion.span>
      </>
    );
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-main-color text-9xl font-bold">
        {returnDots()}
      </h1>
    </div>
  );
};

export default PageLoading;