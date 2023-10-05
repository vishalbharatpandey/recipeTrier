import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import DeleteAllData from "./../../../firebase/firestore/deleteAllData";
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  );
});

export default function DeleteAllDialog({ deleteAllPopup, setDeleteAllPopup }) {
  const allRecipes= useSelector((state:any)=> state.recipeReducer.recipes)
  const allRecipeNames=allRecipes?.map((recipe:any)=>{
    return recipe.recipeName.stringValue
  })
  const deleteFunc = async () => {
    allRecipeNames?.forEach((recipe:any)=>{
        DeleteAllData(recipe)
    })
  };

  return (
    <div>
      <Dialog
        open={deleteAllPopup}
        onClose={setDeleteAllPopup}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {"Delete all recipes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Do you want to delete all the recipes from the database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAllPopup(false)}>Cancel</Button>
          <Button
            onClick={() => {
              deleteFunc();
              setDeleteAllPopup(false);
            }}
            autoFocus>
            Delete all
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
