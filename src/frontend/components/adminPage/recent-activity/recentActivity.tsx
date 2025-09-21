"use client";

import React, { useEffect, useRef, useState } from "react";
import { CalendarDaysIcon, PlusIcon } from "@components/icons";
import axios from "axios";
import ProgressBar from "@components/adminPage/home-carousel/progressBar";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newActivity, setNewActivity] = useState({
    date: "",
    title: "",
    body: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentActivityId, setCurrentActivityId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

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

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const resetForm = () => {
    setNewActivity({
      date: "",
      title: "",
      body: "",
    });
    setSelectedImage(null);
    setImagePreview(null);
    setCurrentActivityId(null);
    setEditMode(false);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewActivity((previous) => ({ ...previous, [name]: value }));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const updatePreviewFromFile = (file: File) => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setImagePreview(objectUrl);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      updatePreviewFromFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedImage(file);
      updatePreviewFromFile(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDropZoneKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFileDialog();
    }
  };

  const startNewEntry = () => {
    resetForm();
  };

  const startEditEntry = (activity) => {
    resetForm();
    setNewActivity({
      date: activity.date ?? "",
      title: activity.title ?? "",
      body: activity.body ?? "",
    });
    setImagePreview(activity.image ? `data:image/jpeg;base64,${activity.image}` : null);
    setCurrentActivityId(activity.id);
    setEditMode(true);
  };

  const isFormComplete = () => {
    return (
      newActivity.date.trim() !== "" &&
      newActivity.title.trim() !== "" &&
      newActivity.body.trim() !== "" &&
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
        setActivities((prevActivities) => [response.data.data, ...prevActivities]);
        resetForm();
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
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity.id === currentActivityId ? response.data.data : activity
          )
        );
        resetForm();
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
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting activity", error);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,440px),1fr] xl:items-start">
      <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-sanctuaryBrick">
            {editMode ? "Editar actividad" : "Nueva actividad"}
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Completa la información, verifica la vista previa y publica la
            novedad. La imagen se mostrará junto al título y la descripción.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={startNewEntry}
              className="inline-flex items-center gap-2 rounded-full border border-sanctuaryTerracotta px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sanctuaryTerracotta transition hover:border-sanctuaryBrick hover:bg-sanctuaryBrick hover:text-white"
            >
              <PlusIcon className="h-4 w-4" /> Nueva publicación
            </button>
            {editMode && (
              <span className="rounded-full bg-sanctuaryTerracotta/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sanctuaryTerracotta">
                Modo edición activo
              </span>
            )}
          </div>
        </header>
        {(uploading || uploadProgress > 0) && (
          <ProgressBar progress={uploadProgress} uploading={uploading} />
        )}
        <div
          className="flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-sanctuaryTerracotta/50 bg-slate-50 px-6 text-center text-slate-600 transition hover:border-sanctuaryTerracotta"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={openFileDialog}
          onKeyDown={handleDropZoneKeyDown}
          role="button"
          tabIndex={0}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Vista previa de la actividad"
              className="h-48 w-full rounded-xl object-cover shadow"
            />
          ) : (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sanctuaryTerracotta">
                Zona de subida
              </span>
              <p className="max-w-sm text-sm leading-6">
                Arrastra una imagen aquí o haz clic para seleccionarla. Se
                recomienda utilizar fotografías horizontales para un mejor
                resultado.
              </p>
            </>
          )}
          <input
            ref={fileInputRef}
            accept="image/*"
            id="activity-image-upload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="grid gap-4">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Fecha
            <input
              type="text"
              name="date"
              value={newActivity.date}
              onChange={handleChange}
              placeholder="Ej. 12 de octubre de 2024"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-sanctuaryTerracotta focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta/30"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Título
            <input
              type="text"
              name="title"
              value={newActivity.title}
              onChange={handleChange}
              placeholder="Escribe un título claro y breve"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-sanctuaryTerracotta focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta/30"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Descripción
            <textarea
              name="body"
              value={newActivity.body}
              onChange={handleChange}
              placeholder="Comparte los detalles más importantes de la actividad"
              rows={5}
              className="resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-sanctuaryTerracotta focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta/30"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={editMode ? updateActivity : addNewActivity}
            disabled={!isFormComplete()}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {editMode ? "Actualizar actividad" : "Publicar actividad"}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={startNewEntry}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
            >
              Cancelar edición
            </button>
          )}
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-sanctuaryBrick">
            Actividades publicadas
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Gestiona las noticias que aparecen en la web. Selecciona una tarjeta
            para editarla o elimínala si ya no es relevante.
          </p>
        </header>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {activities.map((activity) => (
            <article
              key={activity.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow transition hover:border-sanctuaryTerracotta"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={`data:image/jpeg;base64,${activity.image}`}
                  alt={`Imagen de ${activity.title}`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3 px-5 py-4 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sanctuaryTerracotta">
                  <CalendarDaysIcon className="h-4 w-4" />
                  <span>{activity.date}</span>
                </div>
                <h3 className="text-lg font-semibold leading-6 text-sanctuaryBrick">
                  {activity.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                  {activity.body}
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-200 px-5 py-4">
                <button
                  type="button"
                  className="flex-1 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-blue-700"
                  onClick={() => startEditEntry(activity)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-red-700"
                  onClick={() => deleteActivity(activity.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
          {activities.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
              Aún no hay actividades publicadas. Crea una nueva entrada desde el
              panel izquierdo y aparecerá aquí automáticamente.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecentActivity;
