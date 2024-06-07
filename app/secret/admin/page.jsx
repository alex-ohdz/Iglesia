'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/check-auth');
      if (response.ok) {
        setLoading(false);
      } else {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Panel de Administración</h1>
      {/* Contenido de la página de administración */}
    </div>
  );
};

export default Admin;
