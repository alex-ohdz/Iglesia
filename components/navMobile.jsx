"use client";

import { cloneElement, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import LangChanger from "./langChanger";
import NavText from "./navText";

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    style: {
      backgroundColor: trigger ? "white" : "transparent",
      boxShadow: "none",
    },
  });
}

function NavMobile({ isMobile }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            <LangChanger />
            <IconButton
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <MenuIcon
                style={{ fontSize: "30px", background: "white" }}
                className="iconClose"
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: "250px",
            background: "white",
            boxShadow: "none",
          },
        }}
        transitionDuration={300} // Adjust duration for smoother animation
      >
        <div
          role="presentation"
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={() => setIsDrawerOpen(false)}
          style={{ width: 250 }}
        >
          <IconButton
            onClick={() => setIsDrawerOpen(false)}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <CloseIcon style={{ fontSize: "30px", background: "white" }} />
          </IconButton>
          <NavText isMobile={isMobile} />
        </div>
      </Drawer>
    </>
  );
}

export default NavMobile;
