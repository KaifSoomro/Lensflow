import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import LogoIcon from "../../assets/images/logo_2.png";
import {
  FaInstagram as Instagram,
  FaTwitter as Twitter,
  FaLinkedinIn as Linkedin,
  FaGithub as Github,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img src={Logo} alt="LensFlow Logo" className="w-40" />

            <p className="mt-4 max-w-sm text-sm text-neutral-500 leading-7">
              Discover, download and organize beautiful photos and
              illustrations. Built for creators, designers and developers.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-neutral-100 transition"
              >
                <Instagram size={18} />
              </Link>

              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-neutral-100 transition"
              >
                <Twitter size={18} />
              </Link>

              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-neutral-100 transition"
              >
                <Linkedin size={18} />
              </Link>

              <Link
                to="/"
                className="p-2 rounded-lg hover:bg-neutral-100 transition"
              >
                <Github size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Explore</h3>

            <div className="flex flex-col gap-3 text-sm text-neutral-500">
              <Link
                to="/"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Home
              </Link>
              <Link
                to="/illustrations"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Illustrations
              </Link>
              <Link
                to="/collections"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Collections
              </Link>
              <Link
                to="/bookmarks"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Bookmarks
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Account</h3>

            <div className="flex flex-col gap-3 text-sm text-neutral-500">
              <Link
                to="/login"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Create Account
              </Link>
              <Link
                to="/profile"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Settings
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-neutral-900 mb-4">Company</h3>

            <div className="flex flex-col gap-3 text-sm text-neutral-500">
              <Link
                to="/"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                About
              </Link>
              <Link
                to="/"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Privacy
              </Link>
              <Link
                to="/"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Terms
              </Link>
              <Link
                to="/"
                className="hover:text-neutral-900 transition-all ease duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-300 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <div className="flex items-center gap-6">
            <img src={LogoIcon} alt="logo_icon" className="w-10" />{" "}
            <p>© {new Date().getFullYear()} LensFlow. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <Link
              to="#"
              className="hover:text-neutral-900 transition-all ease duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="hover:text-neutral-900 transition-all ease duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="hover:text-neutral-900 transition-all ease duration-200"
            >
              Cookies
            </Link>
            <Link
              to="#"
              className="hover:text-neutral-900 transition-all ease duration-200"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
