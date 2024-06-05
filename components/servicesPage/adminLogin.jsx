import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { TextField, InputAdornment } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const AdminLogin = ({ handleLogin, setPass, setUser }) => {
  return (
    <div className="flex flex-col items-center font-serif">
      <label className="text-3xl text-slate-700 my-14">
        San Juan Bautista de Remedios
      </label>
      <div className="flex flex-col text-center items-center border h-96 w-96 drop-shadow-lg bg-white">
        <div className="w-72 my-8 ">
          <label className="text-xl">Administrador</label>
          <div className="flex flex-col w-full mt-8 text-left gap-y-8">
            {/* <label htmlFor="input">Usuario :</label> */}
            <TextField
              id="userName"
              onChange={(e) => setUser(e.target.value)}
              type="text"
              placeholder="Usuario"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon />
                  </InputAdornment>
                ),
              }}
              className="rounded-sm p-1 bg-slate-200"
            />
            {/* <label htmlFor="input">Contraseña:</label> */}
            <TextField
              id="pass"
              onChange={(e) => setPass(e.target.value)}
              type="text"
              placeholder=" Contraseña"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              className="rounded-sm p-1 bg-slate-200"
            />
          </div>
          <div className="flex flex-row justify-center mt-10 gap-6">
            <button onClick={handleLogin} className="btnZone shadow-lg">
              <LoginIcon /> Entrar
            </button>
            <button className="btnZone shadow-lg">
              <KeyboardReturnIcon /> Atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
