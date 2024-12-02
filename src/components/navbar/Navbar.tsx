"use client";

import { useDispatch } from "react-redux";
import { setSearchTerm } from "@/store/slices/searchSlice";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleSearch = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm));
  };

  return (
    <nav className="border-b">
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        <NavSearch onSearch={handleSearch} />
        <LinksDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
