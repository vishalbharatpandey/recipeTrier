import firebase_app from "../config";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function UpdateRatingData(id, rating) {
    const docRef = doc(db, "recipes", id);
    const data = {
        rating: rating
    };

    updateDoc(docRef, data)
        .then(() => {
            console.log("Field has been updated successfully");
        })
        .catch(() => {
            console.log(error);
        })
}