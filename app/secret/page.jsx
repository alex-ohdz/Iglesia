"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="bg-blue-900 w-screen h-screen flex items-center">
      {session ? (
        <div className="text-center w-full">
          <div className="p-4">Logged in {session.user.email}</div>
          <button onClick={signOut} className="bg-white p-2 px-4 rounded-lg">
            Cerrar Sesion
          </button>
        </div>
      ) : (
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      )}
    </div>
  );
}
