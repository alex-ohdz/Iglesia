"use client";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: "",
    rol: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentWorkerId, setCurrentWorkerId] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('/api/getWorkers');
        if (response.data.success) {
          setWorkers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching workers', error);
      }
    };

    fetchWorkers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleOpen = (worker = null) => {
    if (worker) {
      setNewWorker({
        name: worker.name,
        rol: worker.rol,
      });
      setSelectedImage(null);
      setCurrentWorkerId(worker.id);
      setEditMode(true);
    } else {
      setNewWorker({
        name: "",
        rol: "",
      });
      setSelectedImage(null);
      setCurrentWorkerId(null);
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const addNewWorker = async () => {
    const formData = new FormData();
    formData.append("name", newWorker.name);
    formData.append("rol", newWorker.rol);
    formData.append("image", selectedImage);

    setUploading(true);
    try {
      const response = await axios.post('/api/addWorker', formData, {
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
        setWorkers([response.data.data, ...workers]);
        handleClose();
      }
    } catch (error) {
      console.error('Error adding worker', error);
    } finally {
      setUploading(false);
    }
  };

  const updateWorker = async () => {
    const formData = new FormData();
    formData.append("id", currentWorkerId);
    formData.append("name", newWorker.name);
    formData.append("rol", newWorker.rol);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    setUploading(true);
    try {
      const response = await axios.put('/api/updateWorker', formData, {
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
        setWorkers(workers.map(worker =>
          worker.id === currentWorkerId ? response.data.data : worker
        ));
        handleClose();
      }
    } catch (error) {
      console.error('Error updating worker', error);
    } finally {
      setUploading(false);
    }
  };

  const deleteWorker = async (id) => {
    try {
      const response = await axios.delete('/api/deleteWorker', {
        data: { id },
      });
      if (response.data.success) {
        setWorkers(workers.filter(worker => worker.id !== id));
      }
    } catch (error) {
      console.error('Error deleting worker', error);
    }
  };

  return (
    <>
      {uploading && <ProgressBar progress={uploadProgress} uploading={uploading} />}
      <div className="text-center items-center mx-auto px-4 pb-10">
        <h1 className="font-serif text-3xl py-5 text-amber-800">
          Trabajadores Actuales
        </h1>
        <Button
          onClick={() => handleOpen()}
          variant="contained"
          startIcon={<AddIcon />}
          className="bg-blue-600 hover:bg-blue-900 text-white"
        >
          Añadir Trabajador
        </Button>
      </div>
      <Modal
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="modal-rol"
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
            <h2 id="modal-rol">{editMode ? "Editar Trabajador" : "Nuevo Trabajador"}</h2>
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
            label="Nombre"
            type="text"
            name="name"
            value={newWorker.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Rol"
            type="text"
            name="rol"
            value={newWorker.rol}
            onChange={handleChange}
            fullWidth
          />
          <Button
            onClick={editMode ? updateWorker : addNewWorker}
            variant="contained"
            className="bg-blue-600 hover:bg-blue-900 text-white"
            sx={{ mt: 2 }}
          >
            Confirmar
          </Button>
        </Box>
      </Modal>
      <div className=" p-5" id="us">
        <h2 className="text-2xl mb-8 text-center font-serif text-gray-900">Nuestro Equipo</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {workers.map((worker) => (
            <div key={worker.id} className="relative flex flex-col items-center text-center mt-10">
              <img
                src={`data:image/jpeg;base64,${worker.image}`}
                alt={`Imagen de ${worker.name}`}
                className="rounded-full w-24 h-24 object-cover border border-gray-300 shadow-md"
              />
              <p className="mt-4 font-semibold text-gray-800">{worker.name}</p>
              <p className="text-sm text-gray-600">{worker.rol}</p>
              <div className="relative bottom-52 left-2 flex space-x-2">
                <Button 
                  variant="contained" 
                  color="info" 
                  onClick={() => handleOpen(worker)}
                >
                  Editar
                </Button>
                <Button 
                  variant="contained" 
                  color="warning" 
                  onClick={() => deleteWorker(worker.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Workers;
