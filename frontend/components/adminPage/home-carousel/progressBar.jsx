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
      <CustomLinearProgress
        variant="determinate"
        value={progress}
        sx={{
          width: "80%",
          height: 10,
        }}
      />
    </Box>
  ) : null
);

export default ProgressBar;
