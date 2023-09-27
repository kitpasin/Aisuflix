import { Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Header({ setIsLoggedIn, location }) {
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSignOut() {
    setAnchorEl(null);
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign out",
      buttonsStyling: false,
      width: 400,
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "success",
          title: "Signing out...",
        }).then(() => {
          console.log("success");
          localStorage.setItem("auth", false);
          setIsLoggedIn(false);
        })
      }
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollYPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${scrollYPosition > 0 && "bg-slate-900"} ${location.pathname !== "/" && "bg-slate-900"} w-full h-[60px] px-4 xl:px-12 fixed top-0 z-10`}>
      <nav className="w-full h-full flex items-center gap-12 text-white text-sm md:text-md xl:text-xl font-bold">
        <Link to="/" className="w-full max-w-[100px] sm:block hidden">
          <img src="/images/netflix_logo.png" />
        </Link>
        <div className="w-full h-full flex justify-between items-center gap-4">
          <ul className="w-full h-full flex items-center gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/series">Series</Link>
            </li>
          </ul>
          <figure
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="w-[40px] h-[40px] rounded-full flex-none cursor-pointer"
          >
            <img className="rounded-full" src="/images/profile.jpg" alt="" />
          </figure>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </div>
      </nav>
    </header>
  );
}

export default Header;
