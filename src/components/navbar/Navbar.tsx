import Logo from "./Logo";
import NavSearch from "./NavSearch";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-10">
        <Logo />
        <NavSearch />
        <ProfileDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
