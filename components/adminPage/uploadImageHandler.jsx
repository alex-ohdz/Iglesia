
import axios from "axios";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

export const fetchImages = async (section, setUploadedImages) => {
  try {
    const response = await axios.get("/api/get-images", { params: { section } });
    if (response.status === 200) {
      setUploadedImages(response.data);
    } else {
      console.error("Error fetching images");
    }
  } catch (error) {
    console.error("Error fetching images", error);
  }
};

export const handleFilesSelected = (files, selectedFiles, setSelectedFiles, setError) => {
  const newFiles = Array.from(files);
  const oversizedFiles = newFiles.filter(file => file.size > MAX_IMAGE_SIZE);

  if (oversizedFiles.length > 0) {
    setError("Una o más imágenes superan el límite de tamaño de 4 MB.");
    return;
  }

  if (newFiles.length + selectedFiles.length > 10) {
    setError("You can select up to 10 images.");
    return;
  }

  setError(""); // Clear any previous error
  setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
};

export const handleDeleteSelected = (index, setSelectedFiles) => {
  setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
};

export const handleDeleteUploaded = async (id, section, setUploadedImages) => {
  try {
    const response = await axios.delete("/api/delete-image", {
      data: { id, section },
    });
    if (response.status === 200) {
      setUploadedImages(prevImages => prevImages.filter(image => image.id !== id));
    } else {
      console.error("Error deleting image");
    }
  } catch (error) {
    console.error("Error deleting image", error);
  }
};

export const handleUpload = async (
  selectedFiles,
  section,
  setUploading,
  setUploadProgress,
  setSelectedFiles,
  fetchImages
) => {
  const formData = new FormData();
  selectedFiles.forEach(file => {
    formData.append("images", file);
  });
  formData.append("section", section);

  setUploading(true);
  setUploadProgress(0);

  try {
    const response = await axios.post("/api/carousel-CRUD.js", formData, {
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total;
        const current = progressEvent.loaded;
        const percentCompleted = Math.round((current / total) * 100);
        setUploadProgress(percentCompleted);
      },
    });

    if (response.status === 200) {
      setSelectedFiles([]);
      fetchImages(section, setUploadedImages); // Refetch images after upload
    } else {
      console.error("Error subiendo las imágenes");
    }
  } catch (error) {
    console.error("Error subiendo las imágenes", error);
  } finally {
    setUploading(false);
  }
};
