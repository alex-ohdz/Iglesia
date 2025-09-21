"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@components/icons";
import axios from "axios";
import ProgressBar from "@components/adminPage/home-carousel/progressBar";
import { sanitizeTextInput } from "@frontend/utils/sanitize";

const Workers = () => {
  const [workers, setWorkers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [newWorker, setNewWorker] = useState({
    name: "",
    rol: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentWorkerId, setCurrentWorkerId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  const sanitizeWorker = (worker) => ({
    ...worker,
    name: sanitizeTextInput(worker?.name ?? ""),
    rol: sanitizeTextInput(worker?.rol ?? ""),
  });

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get("/api/getWorkers");
        if (response.data.success) {
          setWorkers(response.data.data.map(sanitizeWorker));
        }
      } catch (error) {
        console.error("Error fetching workers", error);
      }
    };

    fetchWorkers();
  }, []);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const resetForm = () => {
    setNewWorker({
      name: "",
      rol: "",
    });
    setSelectedImage(null);
    setImagePreview(null);
    setCurrentWorkerId(null);
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const sanitizedValue = sanitizeTextInput(value);
    setNewWorker((previous) => ({ ...previous, [name]: sanitizedValue }));
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

  const startEditEntry = (worker) => {
    resetForm();
    setNewWorker({
      name: sanitizeTextInput(worker.name ?? ""),
      rol: sanitizeTextInput(worker.rol ?? ""),
    });
    setImagePreview(worker.image ? `data:image/jpeg;base64,${worker.image}` : null);
    setCurrentWorkerId(worker.id);
    setEditMode(true);
  };

  const isFormComplete = () => {
    return (
      newWorker.name.trim() !== "" &&
      newWorker.rol.trim() !== "" &&
      selectedImage !== null
    );
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
        setWorkers((prevWorkers) => [sanitizeWorker(response.data.data), ...prevWorkers]);
        resetForm();
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
        setWorkers((prevWorkers) =>
          prevWorkers.map((worker) =>
            worker.id === currentWorkerId
              ? sanitizeWorker(response.data.data)
              : worker
          )
        );
        resetForm();
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
        setWorkers((prevWorkers) =>
          prevWorkers.filter((worker) => worker.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting worker", error);
    }
  };

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,420px),1fr] xl:items-start">
      <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-sanctuaryBrick">
            {editMode ? "Editar integrante" : "Nuevo integrante"}
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Actualiza los perfiles del equipo. Carga una fotografía, indica el
            nombre y el rol que desempeña dentro del santuario.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              type="button"
              onClick={startNewEntry}
              className="inline-flex items-center gap-2 rounded-full border border-sanctuaryTerracotta px-4 py-2 text-xs font-semibold uppercase tracking-wide text-sanctuaryTerracotta transition hover:border-sanctuaryBrick hover:bg-sanctuaryBrick hover:text-white"
            >
              <PlusIcon className="h-4 w-4" /> Nuevo registro
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
          className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-sanctuaryTerracotta/50 bg-slate-50 px-6 text-center text-slate-600 transition hover:border-sanctuaryTerracotta"
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
              alt="Vista previa del integrante"
              className="h-48 w-48 rounded-full object-cover shadow"
            />
          ) : (
            <>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sanctuaryTerracotta">
                Zona de subida
              </span>
              <p className="max-w-sm text-sm leading-6">
                Arrastra una fotografía aquí o haz clic para seleccionarla. Usa
                imágenes cuadradas o recortadas para un mejor encuadre.
              </p>
            </>
          )}
          <input
            ref={fileInputRef}
            accept="image/*"
            id="worker-image-upload"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="grid gap-4">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Nombre completo
            <input
              type="text"
              name="name"
              value={newWorker.name}
              onChange={handleChange}
              placeholder="Nombre y apellido"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-sanctuaryTerracotta focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta/30"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            Rol
            <input
              type="text"
              name="rol"
              value={newWorker.rol}
              onChange={handleChange}
              placeholder="Responsabilidad o ministerio"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-sanctuaryTerracotta focus:outline-none focus:ring-2 focus:ring-sanctuaryTerracotta/30"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={editMode ? updateWorker : addNewWorker}
            disabled={!isFormComplete()}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {editMode ? "Actualizar integrante" : "Guardar integrante"}
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
          <h2 className="text-2xl font-bold text-sanctuaryBrick">Equipo visible</h2>
          <p className="text-sm leading-6 text-slate-600">
            Estos son los perfiles publicados en el sitio. Puedes actualizar
            cualquier tarjeta con un clic o eliminar a quien ya no forme parte
            del equipo.
          </p>
        </header>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {workers.map((worker) => (
            <article
              key={worker.id}
              className="group relative flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow transition hover:border-sanctuaryTerracotta"
            >
              <img
                src={`data:image/jpeg;base64,${worker.image}`}
                alt={`Imagen de ${worker.name}`}
                className="h-28 w-28 rounded-full object-cover shadow-lg"
              />
              <div>
                <p className="text-lg font-semibold text-sanctuaryBrick">
                  {worker.name}
                </p>
                <p className="text-sm text-slate-600">{worker.rol}</p>
              </div>
              <div className="flex w-full justify-center gap-3 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-blue-700"
                  onClick={() => startEditEntry(worker)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-red-700"
                  onClick={() => deleteWorker(worker.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
          {workers.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-500">
              Todavía no hay integrantes registrados. Completa el formulario de
              la izquierda para añadir al primer miembro del equipo.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Workers;
