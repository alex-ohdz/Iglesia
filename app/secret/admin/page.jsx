"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHome from "@components/adminPage/adminHome";

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/check-auth");
      if (response.ok) {
        setLoading(false);
      } else {
        router.push("/secret");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <AdminHome />
    </div>
  );
};

export default Admin;
