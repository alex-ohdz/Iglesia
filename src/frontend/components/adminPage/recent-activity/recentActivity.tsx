"use client";
import React, { useState, useEffect, useRef } from "react";
import { PlusIcon, XMarkIcon } from "@components/icons";
import Cards from "@components/noticias/cards";
import axios from "axios";
import ProgressBar from "@components/adminPage/home-carousel/progressBar";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newActivity, setNewActivity] = useState({
    date: "",
    title: "",
    body: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentActivityId, setCurrentActivityId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("/api/getActivities");
        if (response.data.success) {
          setActivities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching activities", error);
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

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleOpen = (activity = null) => {
    if (activity) {
      setNewActivity({
        date: activity.date,
        title: activity.title,
        body: activity.body,
      });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setCurrentActivityId(activity.id);
      setEditMode(true);
    } else {
      setNewActivity({
        date: "",
        title: "",
        body: "",
      });
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setCurrentActivityId(null);
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
    return (
      newActivity.date !== "" &&
      newActivity.title !== "" &&
      newActivity.body !== "" &&
      selectedImage !== null
    );
  };

  const addNewActivity = async () => {
    const formData = new FormData();
    formData.append("date", newActivity.date);
    formData.append("title", newActivity.title);
    formData.append("body", newActivity.body);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    setUploading(true);
    try {
      const response = await axios.post("/api/addActivity", formData, {
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
        setActivities([response.data.data, ...activities]);
        handleClose();
      }
    } catch (error) {
      console.error("Error adding activity", error);
    } finally {
      setUploading(false);
    }
  };

  const updateActivity = async () => {
    if (currentActivityId === null) {
      return;
    }
    const formData = new FormData();
    formData.append("id", String(currentActivityId));
    formData.append("date", newActivity.date);
    formData.append("title", newActivity.title);
    formData.append("body", newActivity.body);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    setUploading(true);
    try {
      const response = await axios.put("/api/updateActivity", formData, {
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
        setActivities(
          activities.map((activity) =>
            activity.id === currentActivityId ? response.data.data : activity
          )
        );
        handleClose();
      }
    } catch (error) {
      console.error("Error updating activity", error);
    } finally {
      setUploading(false);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const response = await axios.delete("/api/deleteActivity", {
        data: { id },
      });
      if (response.data.success) {
        setActivities(activities.filter((activity) => activity.id !== id));
      }
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  };

  return (
    <>
      {uploading && (
        <ProgressBar progress={uploadProgress} uploading={uploading} />
      )}
      <div className="mx-auto items-center px-4 pb-10 text-center">
        <h1 className="py-5 font-display text-3xl text-sanctuary-terracotta">
          Actividades Recientes
        </h1>
        <button
          type="button"
          onClick={() => handleOpen()}
          className="flex items-center gap-2 rounded-md bg-sanctuary-terracotta px-4 py-2 font-display tracking-[0.12em] text-sanctuary-cream transition hover:bg-sanctuary-terracotta/90 focus:outline-none focus:ring-2 focus:ring-sanctuary-gold focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5" /> Añadir Actividad
        </button>
        <h2 className="mt-8 py-1 font-display text-2xl text-sanctuary-shadow">Actividades Recientes</h2>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-md bg-white p-6 shadow-xl" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display text-sanctuary-shadow">
                {editMode ? "Editar Actividad" : "Nueva Actividad"}
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
                id="activity-image-upload"
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <input
                type="text"
                name="date"
                value={newActivity.date}
                onChange={handleChange}
                placeholder="Fecha"
                className="rounded-md border border-sanctuary-gold px-3 py-2 text-sm focus:border-sanctuary-terracotta focus:outline-none focus:ring-1 focus:ring-sanctuary-terracotta/60"
              />
              <input
                type="text"
                name="title"
                value={newActivity.title}
                onChange={handleChange}
                placeholder="Título"
                className="rounded-md border border-sanctuary-gold px-3 py-2 text-sm focus:border-sanctuary-terracotta focus:outline-none focus:ring-1 focus:ring-sanctuary-terracotta/60"
              />
              <textarea
                name="body"
                value={newActivity.body}
                onChange={handleChange}
                placeholder="Cuerpo"
                rows={4}
                className="rounded-md border border-sanctuary-gold px-3 py-2 text-sm focus:border-sanctuary-terracotta focus:outline-none focus:ring-1 focus:ring-sanctuary-terracotta/60"
              />
              <button
                type="button"
                onClick={editMode ? updateActivity : addNewActivity}
                disabled={!isFormComplete()}
                className="rounded-md bg-sanctuary-terracotta px-4 py-2 font-display tracking-[0.12em] text-sanctuary-cream transition hover:bg-sanctuary-terracotta/90 focus:outline-none focus:ring-2 focus:ring-sanctuary-gold focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-sanctuary-shadow/40"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="cardsok pb-10">
        {activities.map((activity) => (
          <div key={activity.id} className="relative">
            <Cards
              imageUrl={`data:image/jpeg;base64,${activity.image}`}
              date={activity.date}
              title={activity.title}
              text={activity.body}
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              <button
                type="button"
                className="rounded-md bg-sanctuary-sky px-3 py-1 text-sm font-display tracking-[0.08em] text-sanctuary-shadow transition hover:bg-sanctuary-sky/80"
                onClick={() => handleOpen(activity)}
              >
                Editar
              </button>
              <button
                type="button"
                className="rounded-md bg-sanctuary-shadow px-3 py-1 text-sm font-display tracking-[0.08em] text-sanctuary-cream transition hover:bg-sanctuary-shadow/80"
                onClick={() => deleteActivity(activity.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentActivity;
