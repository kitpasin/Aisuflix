import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSignIn() {
    const existingAccountsString = localStorage.getItem("accounts");
    const existingAccounts = existingAccountsString
      ? JSON.parse(existingAccountsString)
      : [];
    const checkAccount = existingAccounts.filter((account) => {
      const matchesUsername = username ? account.username === username : true;
      const matchesPassword = password ? account.password === password : true;
      return matchesUsername && matchesPassword;
    });
    if (username !== "" && password !== "" && checkAccount.length > 0) {
      setError(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Signing in...",
      }).then(() => {
        console.log("success");
        localStorage.setItem("auth", true);
        setIsLoggedIn(true);
      });
    } else {
      setError(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: "Sign in failed",
      }).then(() => {
        console.log("error");
        localStorage.setItem("auth", false);
        setIsLoggedIn(false);
      });
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSignIn();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="bg-[url('/images/main_background.png')] w-full h-screen bg-cover relative">
      <div
        style={{ boxShadow: "1px 5px 10px #000" }}
        className="flex flex-col justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[320px] sm:max-w-[480px] h-[320px] px-4 py-8 rounded-[10px]"
      >
        <p className="text-2xl font-bold text-center">Sign in</p>
        <div className="flex flex-col px-4 gap-4">
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            fullWidth
            type="text"
            size="small"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            error={error && username === ""}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            size="small"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={error && password === ""}
          />
        </div>
        <div className="px-4">
          <Button
            onClick={handleSignIn}
            variant="contained"
            fullWidth
            size="medium"
          >
            <p className="capitalize font-bold">Sign in</p>
          </Button>
        </div>
        <div className="px-4 flex justify-center gap-2 font-bold text-sm">
          <p>Don't have an account?</p>
          <Link
            to="/register"
            className="underline text-[#1565c0] cursor-pointer"
          >
            Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
