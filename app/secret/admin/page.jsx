"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
        if (decoded) {
          setIsAuthenticated(true);
        } else {
          router.push("/");
        }
      } catch (error) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Bienvenido, Administrador</h1>
      <p>Esta es la página de administración.</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default AdminPage;
