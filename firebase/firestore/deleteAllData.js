import firebase_app from "../config";
import { getFirestore, doc, updateDoc, deleteField } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function DeleteAllData(id) {
    const docRef = doc(db, "recipes", id);
    const data = {
        recipeName: deleteField(),
        recipeDetail: deleteField(),
        rating: deleteField(),
        favourites: deleteField()
    };

    updateDoc(docRef, data)
        .then(() => {
            console.log("All Field has been deleted successfully");
        })
        .catch(() => {
            console.log(error);
        })
}