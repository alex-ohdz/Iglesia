"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHome from "@components/adminPage/adminHome";
import Loading from "@components/loading";
import { hasAdminAccess } from "@frontend/utils/adminAccess";

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasAdminAccess()) {
      setLoading(false);
      return;
    }

    router.replace("/secret");
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return <AdminHome />;
};

export default Admin;
