"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";
import { TextField, InputAdornment, Button } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import BtnHome from "@components/btnHome";

const AdminLogin = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar cualquier mensaje de error previo

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: user, password: pass }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/secret/admin");
      } else {
        setError(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error al llamar a la API de login");
    }
  };

  return (
    <>
      {" "}
      <BtnHome />
      <form
        className="flex flex-col items-center font-serif mb-10"
        onSubmit={handleLogin}
      >
        <label className="text-3xl text-center text-slate-700 my-14">
          Bienvenido al Sistema de Administración
        </label>
        <div className="flex flex-col text-center items-center border w-96 drop-shadow-lg bg-white">
          <div className="w-72 my-8">
            <label className="text-xl">Administrador</label>
            <div className="flex flex-col w-full mt-8 text-left gap-y-8">
              <TextField
                id="userName"
                onChange={(e) => setUser(e.target.value)}
                type="text"
                placeholder="Usuario"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                className="rounded-sm p-1 bg-slate-200"
              />
              <TextField
                id="pass"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Contraseña"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                className="rounded-sm p-1 bg-slate-200"
              />
            </div>
            <div className="error-container">
              <p
                className={`text-red-500 mt-4 ${
                  error ? "visible" : "invisible"
                }`}
              >
                {error || " "}
              </p>
            </div>
            <div className="flex flex-row justify-center mt-5 gap-6">
              <Button
                type="submit"
                variant="contained"
                startIcon={<LoginIcon />}
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                ENTRAR
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminLogin;
