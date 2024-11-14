const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

export const fetchImages = async (setUploadedImages) => {
  try {
    const response = await fetch("/api/getCarousel");
    if (response.ok) {
      const data = await response.json();
      setUploadedImages(data);
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

export const handleDeleteUploaded = async (id, setUploadedImages) => {
  try {
    const response = await fetch("/api/deleteCarousel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
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
  setUploading,
  setUploadProgress,
  setSelectedFiles,
  fetchImages,
  setUploadedImages
) => {
  const formData = new FormData();
  selectedFiles.forEach(file => {
    formData.append("images", file);
  });

  setUploading(true);
  setUploadProgress(0);

  try {
    const response = await fetch("/api/addCarousel", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setSelectedFiles([]);
      fetchImages(setUploadedImages);
    } else {
      console.error("Error subiendo las imágenes");
    }
  } catch (error) {
    console.error("Error subiendo las imágenes", error);
  } finally {
    setUploading(false);
  }
};
