import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const CustomLinearProgress = styled(LinearProgress)({
  height: 10, // Ajusta la altura de la barra de progreso
  borderRadius: 5,
  backgroundColor: "#ffffff", // Color de fondo de la barra de progreso
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    backgroundColor: "#68d391", // Color de la barra de progreso
  },
});

const ProgressBar = ({ progress, uploading }) => (
  <Box
    sx={{
      width: "100%",
      my: 2,
      height: 10, // Aseguramos que el espacio siempre esté reservado
      position: "relative",
    }}
  >
    <CustomLinearProgress
      variant="determinate"
      value={progress}
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        opacity: uploading ? 1 : 0,
        transition: "opacity 0.3s ease-in-out", // Añadimos una transición suave
      }}
    />
  </Box>
);

export default ProgressBar;
