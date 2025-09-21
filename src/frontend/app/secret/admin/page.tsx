"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHome from "@components/adminPage/adminHome";
import Loading from "@components/loading";

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/session");
      if (response.ok) {
        setLoading(false);
      } else {
        router.push("/secret");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return <AdminHome />;
};

export default Admin;
