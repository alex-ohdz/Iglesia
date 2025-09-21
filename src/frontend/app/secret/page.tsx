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
      className="mb-10 flex flex-col items-center font-body"
      onSubmit={handleLogin}
    >
      <label className="my-14 text-center font-display text-3xl text-sanctuary-shadow">
        Bienvenido al Sistema de Administración
      </label>
      <BtnHome />
      <div className="flex w-96 flex-col items-center border border-sanctuary-gold bg-white text-center drop-shadow-lg">
        <div className="my-8 w-72">
          <label className="font-display text-xl text-sanctuary-terracotta">Administrador</label>
          <div className="flex flex-col w-full mt-8 text-left gap-y-8">
            <label className="relative flex items-center">
              <UserIcon className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                id="userName"
                onChange={(e) => setUser(e.target.value)}
                type="text"
                placeholder="Usuario"
                className="w-full rounded-sm border border-sanctuary-gold bg-sanctuary-cream py-2 pl-10 pr-3 text-sm text-sanctuary-shadow outline-none focus:border-sanctuary-terracotta focus:ring-1 focus:ring-sanctuary-terracotta/60"
              />
            </label>
            <label className="relative flex items-center">
              <LockClosedIcon className="absolute left-3 h-5 w-5 text-slate-500" />
              <input
                id="pass"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                placeholder="Contraseña"
                className="w-full rounded-sm border border-sanctuary-gold bg-sanctuary-cream py-2 pl-10 pr-3 text-sm text-sanctuary-shadow outline-none focus:border-sanctuary-terracotta focus:ring-1 focus:ring-sanctuary-terracotta/60"
              />
            </label>
          </div>
          <div className="error-container">
            <p
              className={`mt-4 text-sanctuary-terracotta ${error ? "visible" : "invisible"}`}
            >
              {error || " "}
            </p>
          </div>
          <div className="flex flex-row justify-center mt-5 gap-6">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-sanctuary-terracotta py-2 text-sm font-display uppercase tracking-[0.2em] text-sanctuary-cream transition hover:bg-sanctuary-terracotta/90 focus:outline-none focus:ring-2 focus:ring-sanctuary-gold focus:ring-offset-2"
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
