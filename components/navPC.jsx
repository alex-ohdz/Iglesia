"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Link from "next/link";
import LangChanger from "./langChanger";
import NavText from "./navText";
import { cloneElement } from "react";
import { useTranslations } from "next-intl";


function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    style: {
      backgroundColor: "white",
      boxShadow: trigger ? "0px 4px 12px rgba(0, 0, 0, 0.1)" : "none",
      transition: trigger ? "box-shadow 0.3s ease-in-out" : "none",
    },
  });
}

function NavPC({ isMobile }) {
  const t = useTranslations("nav"); // Obtiene las traducciones aquí

  return (
    <>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position="fixed" style={{ boxShadow: "none" }}>
          <Toolbar>
            <Link href="/">
              <h1 className="text-amber-900 font-playfair text-2xl">
                San Juan Bautista de Remedios
              </h1>
            </Link>
            <div style={{ flexGrow: 1 }} />
            <NavText isMobile={isMobile} />
            <LangChanger />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
}

export default NavPC;
