import firebase_app from "../config";
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function GetDoument(collect) {
    let docRef = collection(db, collect);

    let result = null;
    let error = null;

    try {
        result = await getDocs(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}