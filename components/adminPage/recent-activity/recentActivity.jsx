"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Cards from "@components/noticias/cards";

const initialActivities = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    date: "20 de mayo de 2000",
    title: "Ejemplo de la Actividad",
    body: "Este es el cuerpo de texto de la actividad reciente. Aquí se describe lo que ocurrió durante la actividad.",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const RecentActivity = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [open, setOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    id: activities.length + 1,
    image: "",
    date: "",
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addNewActivity = () => {
    setActivities([newActivity, ...activities]);
    setNewActivity({
      id: activities.length + 1,
      image: "",
      date: "",
      title: "",
      body: "",
    });
    handleClose();
  };

  return (
    <>
      <div className="text-center items-center mx-auto px-4 pb-10">
        <h1 className="font-serif text-3xl py-5 text-amber-800">
          Actividades Recientes
        </h1>
        <Button
          onClick={handleOpen}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "blue.500",
            "&:hover": {
              backgroundColor: "blue.700",
            },
            color: "white",
            my: 2,
          }}
        >
          Añadir Actividad
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <h2 id="modal-title">Nueva Actividad</h2>
          <TextField
            label="URL de la imagen"
            type="text"
            name="image"
            value={newActivity.image}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Fecha"
            type="text"
            name="date"
            value={newActivity.date}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Título"
            type="text"
            name="title"
            value={newActivity.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Cuerpo"
            type="text"
            name="body"
            value={newActivity.body}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />

          <Button
            onClick={addNewActivity}
            variant="contained"
            sx={{
              backgroundColor: "green.500",
              "&:hover": {
                backgroundColor: "green.700",
              },
              color: "white",
              mt: 2,
            }}
          >
            Confirmar
          </Button>
        </Box>
      </Modal>
      <div className="cardsok pb-10">
        {activities.map((activity, index) => (
          <Cards
            key={activity.id}
            imageUrl={activity.image}
            date={activity.date}
            title={activity.title}
            text={activity.body}
          />
        ))}
      </div>
    </>
  );
};

export default RecentActivity;
