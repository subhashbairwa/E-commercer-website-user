import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const location = useLocation();

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setShowProfileMenu(false);
  };

  useEffect(() => {
    if (location.pathname === "/collection") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
    setShowProfileMenu(false);
  }, [location.pathname, setShowSearch]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#profile-menu")) setShowProfileMenu(false);
    };
    if (showProfileMenu) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showProfileMenu]);

  return (
    <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-white shadow-md relative z-30">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          className="w-28 sm:w-32 transition hover:scale-105"
          alt="logo"
        />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, i) => {
          const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <li key={i}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `block py-2 px-3 hover:text-blue-500 transition-colors duration-200 ${
                    isActive ? "text-blue-500 font-semibold" : ""
                  }`
                }
              >
                {names[i]}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Icons - Always Visible */}
      <div className="flex items-center gap-5 sm:gap-6">
        {/* Search */}
        <img
          src={assets.search_icon}
          className="w-5 sm:w-5 cursor-pointer opacity-70 hover:opacity-100"
          alt="Search"
          onClick={() => setShowSearch(true)}
        />

        {/* Profile */}
        <div className="relative" id="profile-menu">
          <img
            onClick={() => token ? setShowProfileMenu((v) => !v) : navigate('/login')}
            src={assets.profile_icon}
            className="w-5 sm:w-5 cursor-pointer"
            alt="Profile"
          />
          {token && showProfileMenu && (
            <div className="absolute right-0 mt-1 w-40 bg-gray-100 rounded shadow-lg py-1 z-50">
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer">
                My Profile
              </p>
              <p
                onClick={() => navigate("/orders")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                Orders
              </p>
              <p
                onClick={logout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </p>
              <p
                onClick={() => window.open("http://localhost:5174/")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                Admin Panel
              </p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 sm:w-5" alt="Cart" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu (Mobile Only) */}
        <img
          src={assets.menu_icon}
          className="w-5 sm:hidden cursor-pointer"
          alt="Menu"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          visible ? "translate-x-0" : "translate-x-full"
        } sm:hidden z-40`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setVisible(false)}
            className="text-gray-600 hover:text-gray-800 text-xl"
          >
            ✕
          </button>
        </div>
        <ul className="px-6 space-y-3">
          {["/", "/collection", "/about", "/contact"].map((path, i) => {
            const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <li key={i}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded transition ${
                      isActive
                        ? "bg-black text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={() => setVisible(false)}
                >
                  {names[i]}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Overlay */}
      {visible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setVisible(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
