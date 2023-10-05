"use client";
import React, { useEffect, useState } from "react";
import styles from "./landingPage.module.scss";
import Link from "next/link";
import GetDocument from "./../../firebase/firestore/getData";
import { IoFastFood } from "react-icons/io5";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { Rating } from "@mui/material";
import { GrAppsRounded } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipes,
  toggleFavourite,
  updateRating,
} from "../redux-toolkit/recipeSlice/recipeSlice";
import DeleteAllDialog from "./deleteAllRecipes/page";
import UpdateFavouritesData from "./../../firebase/firestore/updateFavouritesData";
import UpdateRatingData from "./../../firebase/firestore/updateratingData";

const LandingPage = () => {
  const dispatch = useDispatch();
  let recipeList = useSelector((state: any) => state.recipeReducer.recipes);
  const [deleteAllPopup, setDeleteAllPopup] = useState(false);

  const [windowWidth, setWindowWidth] = useState<number>(
    document.body.clientWidth
  );
  interface recipeObject {
    rating: {};
    recipeDetail: {};
    recipeName: {};
  }
  window.addEventListener("resize", () =>
    setWindowWidth(document.body.clientWidth)
  );

  useEffect(() => {
    const getData = async () => {
      const { result, error } = await GetDocument("recipes");
      let data: recipeObject[] = [];
      result?._snapshot?.docChanges?.forEach((item: any) => {
        data.push(item.doc.data.value.mapValue.fields);
      });
      data = data?.filter((item) => item?.recipeName);
      dispatch(setRecipes(data));
      console.log(data, "dat");
    };
    getData();
  }, [deleteAllPopup, recipeList?.length]);

  return (
    <div className={styles.page}>
      <div className={`${styles.header}`}>
        <div className='font-semibold'>
          <div className='text-lg'>Recipe Results</div>
          <div className={`${styles.instructions}`}>
            <span className='text-blue-600 font-normal'>
              {recipeList?.length} recipes found
            </span>
            <Link href='/landingPage/editIngredients'>
              <span className='ml-5 text-orange-600 font-normal'>
                Edit ingredients and restrictios
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.filterAndAdd}>
          <Link
            className={styles.plusIcon}
            href='/landingPage/addRecipe'>
            <span>+</span>
          </Link>
          <span
            onClick={() => setDeleteAllPopup(true)}
            className={`${styles.deleteIcon} mr-3 ml-3`}>
            <AiOutlineDelete />
          </span>
          <Link href='/landingPage/filterRecipes'>
            <div>
              <span>Filter</span>
              <span style={{ marginTop: "3px" }}>
                <GrAppsRounded />
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.body}>
        {recipeList?.map((item: any) => {
          return (
            <div
              className={styles.recipeList}
              key={item.recipeName.stringValue}>
              <div
                className='cursor-pointer'
                onClick={() => {
                  dispatch(toggleFavourite(item.recipeName.stringValue));
                  UpdateFavouritesData(
                    item.recipeName.stringValue,
                    !item.favourites.booleanValue
                  );
                }}>
                {item.favourites?.booleanValue === true ? (
                  <AiFillHeart color='red' />
                ) : (
                  <AiOutlineHeart />
                )}
              </div>
              <div>
                <IoFastFood />
              </div>
              <p className='text-xs'>{item.recipeName.stringValue}</p>
              <div>
                <Rating
                  name='simple-controlled'
                  value={item.rating.integerValue}
                  onChange={(event, newValue) => {
                    UpdateRatingData(item.recipeName.stringValue, newValue);
                    dispatch(
                      updateRating({
                        recipeName: item.recipeName.stringValue,
                        rating: newValue,
                      })
                    );
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <DeleteAllDialog
        deleteAllPopup={deleteAllPopup}
        setDeleteAllPopup={setDeleteAllPopup}
      />
    </div>
  );
};

export default LandingPage;
