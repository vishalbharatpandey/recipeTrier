"use client";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import styles from "./editIngredients.module.scss";
import AddIngredientPopup from "./addIngredientPopup/addIngredientPopup";
import { useDispatch, useSelector } from "react-redux";
import { setIngredients } from "@/app/redux-toolkit/recipeSlice/recipeSlice";

const EditIngredientsPage = () => {
  const ingredients = useSelector(
    (state: any) => state.recipeReducer.ingredients
  );
  const dispatch = useDispatch();
  const [ingredientList, setIngredientList] = useState<string[]>(ingredients);
  const [ingredient, setIngredient] = useState<string>("");

  useEffect(() => {
    dispatch(setIngredients(ingredientList));
  }, [ingredientList]);

  return (
    <div className={styles.editIngredientsRestrictions}>
      <div>
        <div className={styles.addIngredient}>
          <AddIngredientPopup
            ingredient={ingredient}
            setIngredient={setIngredient}
            setIngredientList={setIngredientList}
          />
        </div>
        <div className={styles.ingredientList}>
          {ingredientList?.map((ingredient) => {
            return <span key={ingredient}>{ingredient}</span>;
          })}
        </div>
      </div>
      <div className='editRestrictions'></div>
    </div>
  );
};

export default EditIngredientsPage;
