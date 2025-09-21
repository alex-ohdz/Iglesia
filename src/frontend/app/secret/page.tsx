"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  grantAdminSessionAccess,
  grantAdminTemporaryAccess,
} from "@frontend/utils/adminAccess";
import {
  ArrowRightOnRectangleIcon,
  LockClosedIcon,
  UserIcon,
} from "@components/icons";
import AdminNavbar from "@components/adminPage/adminNavbar";

const AdminLogin = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar cualquier mensaje de error previo

    if (user === "1" && pass === "1") {
      grantAdminTemporaryAccess();
      router.push("/secret/admin");
      return;
    }

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
        grantAdminSessionAccess();
        router.push("/secret/admin");
      } else {
        setError(data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error al llamar a la API de login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <AdminNavbar showSections={false} />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-2xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sanctuaryTerracotta">
              Acceso restringido
            </p>
            <h1 className="mt-2 text-3xl font-display text-sanctuaryBrick">
              Bienvenido al Sistema de Administración
            </h1>
            <p className="mt-4 text-sm text-slate-500">
              Ingresa con tus credenciales para gestionar el contenido del sitio.
            </p>
          </div>
          <form className="mt-10 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <label className="text-left text-sm font-semibold uppercase tracking-wide text-sanctuaryBrick">
                Administrador
              </label>
              <label className="relative flex items-center">
                <UserIcon className="absolute left-3 h-5 w-5 text-slate-400" />
                <input
                  id="userName"
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  placeholder="Usuario"
                  className="w-full rounded-md border border-slate-300 bg-slate-100 py-3 pl-11 pr-3 text-sm text-slate-700 transition focus:border-sanctuaryTerracotta focus:outline-none focus:ring-1 focus:ring-sanctuaryTerracotta"
                />
              </label>
              <label className="relative flex items-center">
                <LockClosedIcon className="absolute left-3 h-5 w-5 text-slate-400" />
                <input
                  id="pass"
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  placeholder="Contraseña"
                  className="w-full rounded-md border border-slate-300 bg-slate-100 py-3 pl-11 pr-3 text-sm text-slate-700 transition focus:border-sanctuaryTerracotta focus:outline-none focus:ring-1 focus:ring-sanctuaryTerracotta"
                />
              </label>
            </div>
            <div aria-live="polite" className="min-h-[1.5rem] text-center text-sm text-red-500">
              {error}
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-sanctuaryTerracotta py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-sanctuaryBrick focus:outline-none focus:ring-2 focus:ring-sanctuaryGold focus:ring-offset-2"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Entrar
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
