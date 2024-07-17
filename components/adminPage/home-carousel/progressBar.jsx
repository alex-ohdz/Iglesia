import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const CustomCircularProgress = styled(CircularProgress)({
  color: "#68d391", // Color de la barra de progreso
});

const ProgressBar = ({ uploading }) => (
  uploading ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.75)",
        zIndex: 1500,
        backdropFilter: "blur(5px)",
      }}
    >
      <CustomCircularProgress />
    </Box>
  ) : null
);

export default ProgressBar;
