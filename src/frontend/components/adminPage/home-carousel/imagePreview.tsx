import React, { useEffect, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "@components/icons";

type ImagePreviewProps = {
  selectedFiles: File[];
  onDelete: (index: number) => void;
  onMove?: (index: number, direction: number) => void;
  className?: string;
};

const ImagePreview = ({ selectedFiles, onDelete, onMove, className }: ImagePreviewProps) => {
  const previews = useMemo(
    () =>
      selectedFiles.map((file) => ({
        key: `${file.name}-${file.lastModified}`,
        url: URL.createObjectURL(file),
      })),
    [selectedFiles]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  if (previews.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-white/50 px-4 py-6 text-center text-sm text-slate-500">
        Aún no has seleccionado imágenes. Arrastra archivos sobre la zona superior o usa el botón “Seleccionar imágenes”.
      </p>
    );
  }

  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-2 ${
        className ?? ""
      }`}
    >
      {previews.map((preview, index) => {
        const file = selectedFiles[index];
        return (
          <div
            key={preview.key}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={preview.url}
              alt={`preview-${index}`}
              className="h-48 w-full object-contain"
            />
            <div className="flex items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
              {onMove ? (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Mover a la izquierda"
                    onClick={() => onMove(index, -1)}
                    disabled={index === 0}
                    className="rounded-full p-1 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400"
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Mover a la derecha"
                    onClick={() => onMove(index, 1)}
                    disabled={index === selectedFiles.length - 1}
                    className="rounded-full p-1 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:text-slate-400"
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Vista previa
                </span>
              )}
              <button
                type="button"
                aria-label="Eliminar imagen"
                onClick={() => onDelete(index)}
                className="rounded-full p-1 text-red-600 transition hover:bg-red-100"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImagePreview;
