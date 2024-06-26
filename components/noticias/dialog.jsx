import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function DialogCard({ open, handleClose, title, date, text, imageUrl, key }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      key={key}
      className="flex justify-center"
    >
      <div className="flex flex-col items-center p-3">
        <img src={imageUrl} className="h-56 w-64 rounded-t-sm" alt={title} />
        <DialogTitle className="text-center w-full font-serif ">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="font-sans text-center text-gray-800 mb-4">{date}</DialogContentText>
          <DialogContentText className="font-sans">{text}</DialogContentText>
        </DialogContent>
        <DialogActions className="flex w-full justify-end">
          <Button onClick={handleClose} color="primary" className="font-serif">
            Cerrar
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default DialogCard;
