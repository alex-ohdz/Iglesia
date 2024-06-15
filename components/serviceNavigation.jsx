"use client";
import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Bautismos" />
        <BottomNavigationAction label="Casamientos" />
        <BottomNavigationAction label="Nearby" />
        <BottomNavigationAction label="Bautismos" />
      </BottomNavigation>
    </Box>
  );
}
