import {
  Backdrop,
  Box,
  Fade,
  Menu,
  MenuItem,
  Modal,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  minWidth: "250px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 2,
};

function Header({ setIsLoggedIn, location }) {
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("1234")
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function hadleOpen() {
    setAnchorEl(null);
    setOpenProfileModal(true);
  }

  function handleClose() {
    setAnchorEl(null);
    setOpenProfileModal(false);
  }

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
        cancelButton: "swal-cancel-button",
      },
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
        });
      }
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollYPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${
          scrollYPosition > 0 ? "bg-slate-900 h-[60px]" : "h-[0px] top-[30px]"
        } ${
          location.pathname !== "/" && "bg-slate-900"
        } w-full px-4 xl:px-12 fixed top-0 z-10 transition-all ease-in-out duration-300`}
      >
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
              <MenuItem onClick={hadleOpen}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </div>
        </nav>
      </header>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openProfileModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openProfileModal}>
          <Box sx={style}>
            <div className="relative">
              <div onClick={handleClose} className="fixed top-4 right-4 cursor-pointer">
                <CloseIcon sx={{fontSize: "36px"}} />
              </div>
              <div className="w-full h-full rounded-[10px] m-auto py-4">
                <figure className="w-full max-w-[200px] rounded-full m-auto">
                  <img className="rounded-full" src="/images/profile.jpg" />
                </figure>
                <div className="w-full max-w-[300px] flex flex-col justify-between gap-4 mt-4 m-auto">
                  <TextField disabled size="small" label="Username" variant="outlined" value={username} />
                  <TextField disabled size="small" label="Password" variant="outlined" value={password} />
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Header;
