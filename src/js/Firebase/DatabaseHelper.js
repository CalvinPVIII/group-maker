import db from "./db.js";

import { setDoc, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

export default class DatabaseHelper {
  static _db = db;

  static async post(collection, data) {
    try {
      await setDoc(doc(db, collection, data.id), data);
      return "success";
    } catch (err) {
      console.log("Error: " + err);
    }
  }

  static async find(collection, id) {
    try {
      const docSnap = await getDoc(doc(db, collection, id));
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("There was an error: " + error);
      return "There was an error: " + error;
    }
  }

  static async delete(collection, id) {
    try {
      await deleteDoc(doc(db, collection, id));
      return "success";
    } catch (error) {
      console.log("There was an error: " + error);
      return "There was an error: " + error;
    }
  }

  static async addToArray(collection, id, objName, data) {
    try {
      const ref = doc(db, collection, id);

      await updateDoc(ref, { [`${objName}.${data.id}`]: data.data });
    } catch (error) {
      console.log(error);
    }
  }
}
