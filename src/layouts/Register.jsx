import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccount } from "../context/AccountContext";
import Swal from "sweetalert2";

function Register() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { addAccount } = useAccount();
  const navigate = useNavigate();

  function handleSignUp() {
    const existingAccountsString = localStorage.getItem("accounts");
    const existingAccounts = existingAccountsString
      ? JSON.parse(existingAccountsString)
      : [];
    const checkAccount = existingAccounts.filter((account) => {
      const matchesUsername = username ? account.username === username : true;
      const matchesPassword = password ? account.password === password : true;
      return matchesUsername && matchesPassword;
    });
    if (
      username !== "" &&
      password !== "" &&
      confirm !== "" &&
      checkAccount.length > 0
    ) {
      setUsernameError(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: "Username already exists.",
      })
    } else if (
      username !== "" &&
      password !== "" &&
      confirm !== "" &&
      password === confirm
    ) {
      setUsernameError(false);
      setPasswordError(false);
      const newAccount = {
        id: Date.now(),
        username,
        password,
      };

      const addNewAccount = newAccount;
      existingAccounts.push(addNewAccount);
      const updatedAccountsString = JSON.stringify(existingAccounts);

      localStorage.setItem("accounts", updatedAccountsString);
      addAccount(newAccount);

      setUsername("");
      setPassword("");
      setConfirm("");

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Account has been created.",
      }).then(() => {
        navigate("/")
      })
    } else if (username === "" && password === "" && confirm === "") {
      setUsernameError(true);
      setPasswordError(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: "Please enter all fields.",
      })
    } else {
      setPasswordError(true);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "error",
        title: "Password do not match.",
      })
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSignUp();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (username !== "") {
      setUsernameError(false);
    }
    if (password !== "" && confirm !== "") {
      setPasswordError(false);
    }
  }, [username, password, confirm]);

  return (
    <div className="bg-[url('/images/main_background.png')] w-full h-screen bg-cover relative">
      <div
        style={{ boxShadow: "1px 5px 10px #000" }}
        className="flex flex-col justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[320px] sm:max-w-[480px] h-[380px] px-4 py-8 rounded-[10px]"
      >
        <p className="text-2xl font-bold text-center">Sign up</p>
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
            error={usernameError}
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
            error={passwordError}
          />
          <TextField
            id="confirm"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            size="small"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            error={passwordError}
          />
        </div>
        <div className="px-4">
          <Button
            variant="contained"
            fullWidth
            size="medium"
            onClick={handleSignUp}
          >
            <p className="capitalize font-bold">Sign up</p>
          </Button>
        </div>
        <div className="px-4 flex justify-center gap-2 font-bold text-sm">
          <p>Already have an account?</p>
          <Link to="/" className="underline text-[#1565c0] cursor-pointer">
            Sign in here!
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
