"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
  UserIcon,
} from "@components/icons";
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
    <form
      className="flex flex-col items-center font-serif mb-10"
      onSubmit={handleLogin}
    >
      <label className="text-3xl text-center text-slate-700 my-14">
        Bienvenido al Sistema de Administración
      </label>
      <BtnHome />
      <div className="flex flex-col text-center items-center border w-96 drop-shadow-lg bg-white">
        <div className="w-72 my-8">
          <label className="text-xl">Administrador</label>
          <div className="flex flex-col w-full mt-8 text-left gap-y-8">
            <label className="relative flex items-center">
              <UserIcon className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                id="userName"
                onChange={(e) => setUser(e.target.value)}
                type="text"
                placeholder="Usuario"
                className="w-full rounded-sm border border-slate-300 bg-slate-200 py-2 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </label>
            <label className="relative flex items-center">
              <LockClosedIcon className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                id="pass"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Contraseña"
                className="w-full rounded-sm border border-slate-300 bg-slate-200 py-2 pl-10 pr-3 text-sm text-slate-700 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </label>
          </div>
          <div className="error-container">
            <p
              className={`text-red-500 mt-4 ${error ? "visible" : "invisible"}`}
            >
              {error || " "}
            </p>
          </div>
          <div className="flex flex-row justify-center mt-5 gap-6">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-green-600 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Entrar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AdminLogin;
