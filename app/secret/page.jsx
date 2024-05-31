"use client";
import React, { useState } from "react";
import AdminHome from "@components/servicesPage/adminHome";
import AdminLogin from "@components/servicesPage/adminLogin";

const Login = () => {
  const credentials = {
    userName: "ivett",
    userPass: "123",
  };

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isLogin, setIsLoggin] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    if (user === credentials.userName && pass === credentials.userPass) {
      setIsLoggin(true);
    } else {
      alert("usuario incorrecto");
    }
  }

  return (
    <div className="bg-sky-400 h-screen">
      {!isLogin ? (
        <AdminLogin
          handleLogin={handleLogin}
          setPass={setPass}
          setUser={setUser}
        />
      ) : (
        <AdminHome />
      )}
    </div>
  );
};

export default Login;
