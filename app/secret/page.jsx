"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { TextField, InputAdornment } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
      console.error("Error al llamar a la API de login:", err);
      setError("Error al llamar a la API de login");
    }
  };

  return (
    <form className="flex flex-col items-center font-serif" onSubmit={handleLogin}>
      <label className="text-3xl text-slate-700 my-14">
        San Juan Bautista de Remedios
      </label>
      <div className="flex flex-col text-center items-center border h-96 w-96 drop-shadow-lg bg-white">
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
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="flex flex-row justify-center mt-10 gap-6">
            <button type="submit" className="btnZone shadow-lg">
              <LoginIcon /> Entrar
            </button>
            <button type="button" className="btnZone shadow-lg">
              <KeyboardReturnIcon /> Atrás
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
