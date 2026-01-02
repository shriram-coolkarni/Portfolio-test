import { FaLinkedin } from "react-icons/fa";
import logo from "../assets/PL.png"
import { FaGithub, FaInstagram } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 item-center">
        <a href="/" aria-level="Home">
          <img src={logo} className="mx-2" width={50} height={33} alt="PL" />
        </a>
      </div>

      <div className="m-8 flex items-center justify-center gap-4 text-3xl">
        <a
          href="https://www.linkedin.com/in/pratik-ludarkar-swd/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.github.com/PratikLudarkar99"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.instagram.com/pratik_ludarkar_99"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
