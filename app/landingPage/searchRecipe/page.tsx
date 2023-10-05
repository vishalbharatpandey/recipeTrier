"use client";
import React, { useEffect, useState } from "react";
import wishlistStyles from "./searchRecipe.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFavourite,
  updateRating,
} from "@/app/redux-toolkit/recipeSlice/recipeSlice";
import UpdateFavouritesData from "./../../../firebase/firestore/updateFavouritesData";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Rating, TextField } from "@mui/material";
import { IoFastFood } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import UpdateRatingData from "@/firebase/firestore/updateratingData";

const SearchRecipe = () => {
  let recipeListAll = useSelector((state: any) => state.recipeReducer.recipes);
  const [searchText, setSearchText] = useState<string>("");
  const [recipeList, setRecipeList] = useState([]);
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState<number>(
    document.body.clientWidth
  );
  window.addEventListener("resize", () =>
    setWindowWidth(document.body.clientWidth)
  );

  useEffect(() => {
    let tempList = recipeListAll?.filter(
      (recipe: any) =>
        recipe.recipeName.stringValue.includes(searchText) ||
        recipe.recipeDetail.stringValue.includes(searchText)
    );
    setRecipeList(tempList);
  }, [recipeListAll, searchText]);

  return (
    <div className={wishlistStyles.page}>
      <div>
        <Link href='/'>
          <div className={wishlistStyles.backButton}>
            <BiArrowBack />
          </div>
        </Link>
      </div>
      <div className='mt-3 mb-3'>
        <TextField
          id='outlined-basic'
          label='Search recipes'
          variant='outlined'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className={wishlistStyles.body}>
        {recipeList?.map((item: any) => {
          return (
            <div
              className={wishlistStyles.recipeList}
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
    </div>
  );
};

export default SearchRecipe;
