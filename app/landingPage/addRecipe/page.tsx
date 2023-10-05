"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddData from "./../../../firebase/firestore/addData";
import Styles from "./addRecipe.module.scss";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addRecipe } from "@/app/redux-toolkit/recipeSlice/recipeSlice";
import { useRouter } from "next/navigation";
import { styled } from "@mui/material/styles";
import { Chip, Paper } from "@mui/material";

interface IngredientData {
  key: number;
  label: string;
}
interface Form {
  recipeName: string;
  recipeDetail: string;
  ingredients: IngredientData[];
  ingredient: string;
  favourites: boolean;
  rating: number;
}
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const AddRecipePage = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [ingredientsData, setIngredientsData] = React.useState<
    IngredientData[]
  >([]);

  const handleDelete = (chipToDelete: IngredientData) => () => {
    setIngredientsData((ingredients) =>
      ingredients.filter((ingredient) => ingredient.key !== chipToDelete.key)
    );
  };
  const handleAddIngredient = () => {
    let ingredients = [...ingredientsData];
    ingredients?.push({
      key: ingredients.length + 1,
      label: formik.values.ingredient,
    });
    setIngredientsData(ingredients);
  };
  // const [recipeData, setRecipeData] = useState({
  //   recipeName: "",
  //   recipeDetail: "",
  //   ingredients: [],
  //   ingredient: "",
  //   favourites: false,
  // });
  const createData = async (val: any) => {
    const { result, error } = await AddData(
      "recipes",
      `${val.recipeName}`,
      val
    );
    // formik.values = {
    //   recipeName: "",
    //   recipeDetail: "",
    //   ingredients: [],
    //   ingredient: "",
    //   favourites: false,
    // };
  };

  const initialValues: Form = {
    recipeName: "",
    recipeDetail: "",
    ingredients: [],
    ingredient: "",
    favourites: false,
    rating: 0,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      recipeName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Recipe name is required"),
      recipeDetail: Yup.string()
        .max(1000, "Must be 1000 characters or less")
        .required("Recipe detail is required"),
      ingredient: Yup.string().min(1, "Ingredient name cannot be empty"),
    }),
    onSubmit: (values, { resetForm }) => {
      values = { ...values, ingredients: ingredientsData };
      createData(values);
      dispatch(addRecipe(values));
      resetForm();
      push("/");
    },
  });
  return (
    <div className={Styles.addRecipe}>
      <Link href='/'>
        <div className={Styles.backButton}>
          <BiArrowBack />
        </div>
      </Link>
      <p className='font-medium text-sm ml-5 mt-3 mb-5'>Add Recipe</p>
      <div className={Styles.formContainer}>
        <form onSubmit={formik.handleSubmit}>
          <div className={Styles.formComponents}>
            <span className={Styles.formFieldTitle}>Recipe Name :</span>
            <input
              id='recipeName'
              name='recipeName'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.recipeName}
            />
            {formik.touched.recipeName && formik.errors.recipeName ? (
              <div className={Styles.errors}>{formik.errors.recipeName}</div>
            ) : null}
          </div>

          <div className={Styles.formComponents}>
            <span className={Styles.formFieldTitle}>Recipe detail :</span>
            <input
              id='recipeDetail'
              name='recipeDetail'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.recipeDetail}
            />
            {formik.touched.recipeDetail && formik.errors.recipeDetail ? (
              <div className={Styles.errors}>{formik.errors.recipeDetail}</div>
            ) : null}
          </div>

          <div className={Styles.formComponents}>
            <span>Ingredients :</span>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                listStyle: "none",
                overflow: "auto",
                height: "50px",
                p: 0.5,
                mb: 1.5,
                border: "1px solid lightgray",
              }}
              component='ul'>
              {ingredientsData.map((data) => {
                let icon;
                (chipToDelete: IngredientData) => () => {
                  setIngredientsData((ingredients) =>
                    ingredients.filter(
                      (ingredient) => ingredient.key !== chipToDelete.key
                    )
                  );
                };
                return (
                  <ListItem key={data.key}>
                    <Chip
                      sx={{ width: "max-content" }}
                      icon={icon}
                      label={data.label}
                      onDelete={handleDelete(data)}
                      onBlur={formik.handleBlur}
                    />
                  </ListItem>
                );
              })}
            </Paper>
            <div className={Styles.addIngredientDiv}>
              <input
                id='ingredient'
                name='ingredient'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.ingredient}
              />
              <span onClick={handleAddIngredient}>+</span>
            </div>
            {formik.touched.ingredient && formik.errors.ingredient ? (
              <div className={Styles.errors}>{formik.errors.ingredient}</div>
            ) : null}
          </div>

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};
export default AddRecipePage;
