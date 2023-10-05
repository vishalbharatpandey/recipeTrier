import React from "react";
import style from "./myIngredients.module.scss";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

const MyIngredients = () => {
  return (
    <div className={style.ingredientsContainer}>
      <Link href='/'>
        <div className={style.backButton}>
          <BiArrowBack />
        </div>
      </Link>
      <p>My ingredients</p>
      <div
        style={{
          background: 'url("/ingredients.jpg")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "85vw 60vh",
          backgroundColor: "white",
          opacity: "0.6",
        }}
        className={style.ingredientList}>
        <span>Chilli</span>
        <span>Tomato</span>
        <span>Onion</span>
        <span>Ginger</span>
        <span>Garlic</span>
      </div>
    </div>
  );
};

export default MyIngredients;
