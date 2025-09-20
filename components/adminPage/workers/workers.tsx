"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon, XMarkIcon } from "@components/icons";
import axios from "axios";
import ProgressBar from "@components/adminPage/home-carousel/progressBar";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: "",
    rol: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("/api/getWorkers");
        if (response.data.success) {
          setWorkers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching workers", error);
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

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleOpen = (worker = null) => {
    if (worker) {
      setNewWorker({
        name: worker.name,
        rol: worker.rol,
      });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setCurrentWorkerId(worker.id);
      setEditMode(true);
    } else {
      setNewWorker({
        name: "",
        rol: "",
      });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setCurrentWorkerId(null);
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setOpen(false);
  };

  const isFormComplete = () => {
    return newWorker.name !== "" && newWorker.rol !== "" && selectedImage !== null;
  };

  const addNewWorker = async () => {
    const formData = new FormData();
    formData.append("name", newWorker.name);
    formData.append("rol", newWorker.rol);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    setUploading(true);
    try {
      const response = await axios.post("/api/addWorker", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          const current = progressEvent.loaded;
          const percentCompleted = total ? Math.round((current / total) * 100) : 0;
          setUploadProgress(percentCompleted);
        },
      });
      if (response.data.success) {
        setWorkers([response.data.data, ...workers]);
        handleClose();
      }
    } catch (error) {
      console.error("Error adding worker", error);
    } finally {
      setUploading(false);
    }
  };

  const updateWorker = async () => {
    if (currentWorkerId === null) {
      return;
    }
    const formData = new FormData();
    formData.append("id", String(currentWorkerId));
    formData.append("name", newWorker.name);
    formData.append("rol", newWorker.rol);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    setUploading(true);
    try {
      const response = await axios.put("/api/updateWorker", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || 0;
          const current = progressEvent.loaded;
          const percentCompleted = total ? Math.round((current / total) * 100) : 0;
          setUploadProgress(percentCompleted);
        },
      });
      if (response.data.success) {
        setWorkers(
          workers.map((worker) =>
            worker.id === currentWorkerId ? response.data.data : worker
          )
        );
        handleClose();
      }
    } catch (error) {
      console.error("Error updating worker", error);
    } finally {
      setUploading(false);
    }
  };

  const deleteWorker = async (id) => {
    try {
      const response = await axios.delete("/api/deleteWorker", {
        data: { id },
      });
      if (response.data.success) {
        setWorkers(workers.filter((worker) => worker.id !== id));
      }
    } catch (error) {
      console.error("Error deleting worker", error);
    }
  };

  return (
    <>
      {uploading && (
        <ProgressBar progress={uploadProgress} uploading={uploading} />
      )}
      <div className="text-center items-center mx-auto px-4 pb-5">
        <h1 className="font-serif text-3xl py-5 text-amber-800">
          Trabajadores Actuales
        </h1>
        <button
          type="button"
          onClick={() => handleOpen()}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" /> Añadir Trabajador
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-md bg-white p-6 shadow-xl" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                {editMode ? "Editar Trabajador" : "Nuevo Trabajador"}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100"
                aria-label="Cerrar"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <div
                className="flex h-44 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-100 p-4 text-center text-sm text-gray-600"
                onClick={openFileDialog}
              >
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <span>Haz clic para seleccionar una imagen</span>
                )}
              </div>
              <input
                ref={fileInputRef}
                accept="image/*"
                id="image-upload"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <input
                type="text"
                name="name"
                value={newWorker.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <input
                type="text"
                name="rol"
                value={newWorker.rol}
                onChange={handleChange}
                placeholder="Rol"
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={editMode ? updateWorker : addNewWorker}
                disabled={!isFormComplete()}
                className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-center font-serif text-2xl py-5 mt-8">
        Trabajadores Actuales
      </h1>
      <div className="p-5" id="us">
        <div className="flex flex-wrap justify-center gap-8">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="relative flex flex-col items-center text-center mt-10"
            >
              <img
                src={`data:image/jpeg;base64,${worker.image}`}
                alt={`Imagen de ${worker.name}`}
                className="rounded-full w-24 h-24 object-cover border border-gray-300 shadow-md"
              />
              <p className="mt-4 font-semibold text-gray-800">{worker.name}</p>
              <p className="text-sm text-gray-600">{worker.rol}</p>
              <div className="relative bottom-52 left-2 flex space-x-2">
                <button
                  type="button"
                  className="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-blue-700"
                  onClick={() => handleOpen(worker)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-700"
                  onClick={() => deleteWorker(worker.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Workers;
