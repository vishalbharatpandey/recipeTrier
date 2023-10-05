import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// const washingtonRef = doc(db, "recipes", "DC");

// await updateDoc(washingtonRef, {
//   capital: true
// });
export default async function UpdateFavouritesData(id, boolValue) {
    const docRef = doc(db, "recipes", id);
    const data = {
        favourites: boolValue
    };

    updateDoc(docRef, data)
        .then(() => {
            console.log("Field has been updated successfully");
        })
        .catch(() => {
            console.log(error);
        })
}