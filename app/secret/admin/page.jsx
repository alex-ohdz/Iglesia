"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHome from "@components/adminPage/adminHome";
import CircularProgress from "@mui/material/CircularProgress";
import BtnHome from "@components/btnHome";

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
    return (
      <div className="flex relative place-content-center top-72">
      <CircularProgress />
    </div>
    );
  }

  return (
  
    <>
      <BtnHome/>
      <AdminHome />
    </>
  );
};

export default Admin;
