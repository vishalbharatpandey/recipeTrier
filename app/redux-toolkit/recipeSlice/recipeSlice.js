import { createSlice } from '@reduxjs/toolkit'

// create a slice 
export const RecipeSlice = createSlice({
   name: "Recipes",
   initialState: {
      recipes: [],
      ingredients: []
   },
   reducers: {
      setRecipes: (state, action) => {
         state.recipes = action.payload
      },
      addRecipe: (state, action) => {
         state.recipes = [...state.recipes, action.payload]
      },
      toggleFavourite: (state, action) => {
         state.recipes = state.recipes?.map((recipe) => {
            if (recipe.recipeName.stringValue === action.payload) {
               return { ...recipe, favourites: { booleanValue: !recipe.favourites.booleanValue } }
            }
            else return recipe
         })
      },
      updateRating: (state, action) => {
         state.recipes = state.recipes?.map((recipe) => {
            if (recipe.recipeName.stringValue === action.payload.recipeName) {
               return { ...recipe, rating: { integerValue: action.payload.rating } }
            }
            else return recipe
         })
      },
      setIngredients: (state, action) => {
         state.ingredients = action.payload
      }
   }
})

// export default the reducer
export default RecipeSlice.reducer

// export the action(s)
export const { setRecipes, addRecipe, toggleFavourite, updateRating, setIngredients } = RecipeSlice.actions