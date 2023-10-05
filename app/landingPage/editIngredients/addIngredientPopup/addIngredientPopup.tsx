import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AddIngredientPopup({
  ingredient,
  setIngredient,
  setIngredientList,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='outlined'
        onClick={handleClickOpen}>
        Add ingredient
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add an Ingredient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter ingredient name and then click on &#34;Add&#34; to add it.
          </DialogContentText>
          <TextField
            label='Enter ingredient'
            sx={{ width: "70%", marginTop: "4%" }}
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              setIngredientList((list: string[]) =>
                list.includes(ingredient) ? list : [...list, ingredient]
              );
              handleClose();
            }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
