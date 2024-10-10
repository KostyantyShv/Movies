import { useState, useEffect } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const Header = () => {
  const [, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    controls.start(isMenuOpen ? "open" : "closed");
  }, [isMenuOpen, controls]);

  const linkHandler = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Movies", path: "/movie" },
    { title: "TV series", path: "/tv" },
  ];

  const { pathname } = useLocation();
  const active = navLinks.findIndex((el) => el.path === pathname);

  const headerClass = isScrolled ? "bg-body-bg" : "bg-transparent";

  return (
    <div className="relative">
      <header
        className={`fixed top-0 left-0 h-16 w-full py-3 z-50 ${headerClass}`}
      >
        <div className="flex w-11/12 mx-auto items-center justify-between bg-transparent">
          <Link to={"/"} className="flex items-center gap-1">
            <AiFillPlayCircle className="text-main-color sm:text-4xl text-3xl cursor-pointer" />
            <h3 className="lg:block hidden uppercase font-bold sm:text-3xl text-xl hover:text-yellow-400 transition-all">
              Movie
            </h3>
          </Link>

          <nav>
            {window.innerWidth >= 600 ? (
              <div className="flex gap-5 items-center">
                {navLinks.map((el, i) => (
                  <button
                    className={`${
                      i === active ? "text-main-color font-black" : ""
                    } text-xl hover:border-b-main-color hover:border-b-4 transition-all`}
                    key={i}
                    onClick={() => linkHandler(el.path)}
                  >
                    {el.title}
                  </button>
                ))}
              </div>
            ) : (
              <button
                className={"text-4xl"}
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
              </button>
            )}
          </nav>
        </div>
      </header>

      <motion.div
        animate={controls}
        initial="closed"
        variants={{
          closed: {
            background: "transparent",
            height: "50px",
            width: "50px",
            borderRadius: "100%",
            borderBottomWidth: "0px",
            borderColor: "transperent",
          },
          open: {
            background: "#0f0f0f",
            height: "50vh",
            width: "100vw",
            borderRadius: "10px",
            borderBottomWidth: "2px",
            borderColor: "#ff0000",
            transition: { duration: 0.3, ease: "easeInOut", delay: 0.1 },
          },
        }}
        className="h-[50px] w-[50px] fixed top-0 right-0 z-30 "
      >
        <motion.ul
          animate={controls}
          initial="closed"
          variants={{
            closed: {
              opacity: "0",
              transition: { duration: 0.5 },
            },
            open: {
              opacity: "1",
              transition: { duration: 1, ease: "linear", delay: 0.2 },
            },
          }}
          className="flex flex-col opacity-1 w-[90%] m-auto pt-16 gap-4"
        >
          {navLinks.map((n) => (
            <button
              className="w-full border-2 border-main-color p-3 text-main-color font-bold text-lg hover:bg-main-color hover:text-white transition-all"
              onClick={() => linkHandler(n.path)}
            >
              {n.title}
            </button>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default Header;
