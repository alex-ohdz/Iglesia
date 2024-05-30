import React from 'react'
import LoginIcon from "@mui/icons-material/Login";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const AdminLogin = ({handleLogin,setPass,setUser}) => {
  return (
	<div className="flex bg-blue-500 h-screen items-center justify-center text-black font-serif">
          <label className="absolute top-28 text-2xl">
            San Juan Bautista de Remedios
          </label>
          <label className="absolute top-16 text-xl"> Administrador</label>
          <div className="flex flex-col items-center gap-y-2 w-2/3 sm:w-1/3 text-xl">
            <label htmlFor="input">Usuario :</label>
            <input
              id="userName"
              onChange={(e) => setUser(e.target.value)}
              type="text"
              className="inputZone text-black"
            />
            <label htmlFor="input">Contraseña:</label>
            <input
              id="pass"
              onChange={(e) => setPass(e.target.value)}
              type="text"
              className="inputZone"
            />
          </div>
          <button
            onClick={handleLogin}
            className=" btnZone bottom-52"
          >
            <LoginIcon /> Entrar
          </button>
          <button className="btnZone bottom-36">
            <ExitToAppIcon /> Salir
          </button>
        
        </div>
  )
}

export default AdminLogin