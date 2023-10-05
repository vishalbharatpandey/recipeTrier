import { configureStore } from '@reduxjs/toolkit'
import RecipeReducer from './recipeSlice/recipeSlice'

// config the store 
const store= configureStore({
    reducer: {
       recipeReducer : RecipeReducer
    }
 })
 export default store;