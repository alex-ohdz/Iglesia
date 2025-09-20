interface DialogCardProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  date: string;
  text: string;
  imageUrl: string;
}

function DialogCard({ open, handleClose, title, date, text, imageUrl }: DialogCardProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={handleClose}
    >
      <div
        className="flex w-full max-w-md flex-col items-center overflow-hidden rounded-md bg-white shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="h-48 w-full overflow-hidden">
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </div>
        <div className="flex w-full flex-col gap-3 px-6 py-4 text-center">
          <h2 id="dialog-title" className="font-serif text-xl text-gray-900">
            {title}
          </h2>
          <p className="text-sm text-gray-600">{date}</p>
          <p className="text-sm leading-relaxed text-gray-700">{text}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DialogCard;
