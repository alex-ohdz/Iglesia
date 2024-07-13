import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function DialogCard({ open, handleClose, title, date, text, imageUrl }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="flex justify-center"
    >
      <div className="flex flex-col items-center p-3">
        <div className="overflow-hidden rounded-t-sm w-64 h-40">
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full"
          />
        </div>
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
