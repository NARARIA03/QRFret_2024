import { FaYoutube, FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="border-t border-slate-500 text-slate-200 py-6">
      <div className="flex flex-col items-center">
        <div className="w-full flex flex-row justify-between items-center px-8">
          <h3 className="block text-lg font-semibold">PRISM: We Are Light</h3>
          <div className="flex">
            <a
              href="https://www.youtube.com/@14fret27"
              target="_blank"
              className="p-2 mx-1 hover:text-white"
            >
              <FaYoutube size={26} />
            </a>
            <a
              href="https://www.instagram.com/14fre_t/"
              target="_blank"
              className="p-2 mx-1 hover:text-white"
            >
              <FaInstagram size={26} />
            </a>
          </div>
        </div>
        <p className="w-full px-8 text-sm text-slate-400">
          All rights reserved © 2024 14Fret
        </p>
      </div>
    </footer>
  );
}

export default Footer;
