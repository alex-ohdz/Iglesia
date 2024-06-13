"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Cards from "@components/noticias/cards";
import { styled } from '@mui/material/styles';
import axios from 'axios';
import ProgressBar from '@components/adminPage/home-carousel/progressBar';

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
  outline: 'none',
};

const Input = styled('input')({
  display: 'none',
});

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newActivity, setNewActivity] = useState({
    date: "",
    title: "",
    body: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentActivityId, setCurrentActivityId] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/getActivities');
        if (response.data.success) {
          setActivities(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching activities', error);
      }
    };

    fetchActivities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleOpen = (activity = null) => {
    if (activity) {
      setNewActivity({
        date: activity.date,
        title: activity.title,
        body: activity.body,
      });
      setSelectedImage(null);
      setCurrentActivityId(activity.id);
      setEditMode(true);
    } else {
      setNewActivity({
        date: "",
        title: "",
        body: "",
      });
      setSelectedImage(null);
      setCurrentActivityId(null);
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const addNewActivity = async () => {
    const formData = new FormData();
    formData.append("date", newActivity.date);
    formData.append("title", newActivity.title);
    formData.append("body", newActivity.body);
    formData.append("image", selectedImage);

    setUploading(true);
    try {
      const response = await axios.post('/api/addActivity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current / total) * 100);
          setUploadProgress(percentCompleted);
        },
      });
      if (response.data.success) {
        setActivities([response.data.data, ...activities]);
        handleClose();
      }
    } catch (error) {
      console.error('Error adding activity', error);
    } finally {
      setUploading(false);
    }
  };

  const updateActivity = async () => {
    const formData = new FormData();
    formData.append("id", currentActivityId);
    formData.append("date", newActivity.date);
    formData.append("title", newActivity.title);
    formData.append("body", newActivity.body);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    setUploading(true);
    try {
      const response = await axios.put('/api/updateActivity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.round((current / total) * 100);
          setUploadProgress(percentCompleted);
        },
      });
      if (response.data.success) {
        setActivities(activities.map(activity =>
          activity.id === currentActivityId ? response.data.data : activity
        ));
        handleClose();
      }
    } catch (error) {
      console.error('Error updating activity', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await axios.delete('/api/deleteActivity', {
        data: { id },
      });
      if (response.data.success) {
        setActivities(activities.filter(activity => activity.id !== id));
      }
    } catch (error) {
      console.error('Error deleting activity', error);
    }
  };

  return (
    <>
      {uploading && <ProgressBar progress={uploadProgress} uploading={uploading} />}
      <div className="text-center items-center mx-auto px-4 pb-10">
        <h1 className="font-serif text-3xl py-5 text-amber-800">
          Actividades Recientes
        </h1>
        <Button
          onClick={() => handleOpen()}
          variant="contained"
          startIcon={<AddIcon />}
          className="bg-blue-600 hover:bg-blue-900 text-white"
        >
          Añadir Actividad
        </Button>
      </div>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableEscapeKeyDown
        closeAfterTransition
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        }}
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 id="modal-title">{editMode ? "Editar Actividad" : "Nueva Actividad"}</h2>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '180px', 
              backgroundColor: '#f0f0f0', 
              border: '2px dashed #ccc', 
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('image-upload').click()}
          >
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            ) : (
              <span>Haz clic para seleccionar una imagen</span>
            )}
          </div>
          <Input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
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
            onClick={editMode ? updateActivity : addNewActivity}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-900 text-white"
            sx={{ mt: 2 }}
          >
            Confirmar
          </Button>
        </Box>
      </Modal>
      <div className="cardsok pb-10">
        {activities.map((activity) => (
          <div key={activity.id} className="relative">
            <Cards
              imageUrl={`data:image/jpeg;base64,${activity.image}`}
              date={activity.date}
              title={activity.title}
              text={activity.body}
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button 
                variant="contained" 
                color="info" 
                onClick={() => handleOpen(activity)}
              >
                Editar
              </Button>
              <Button 
                variant="contained" 
                color="warning" 
                onClick={() => deleteActivity(activity.id)}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentActivity;
