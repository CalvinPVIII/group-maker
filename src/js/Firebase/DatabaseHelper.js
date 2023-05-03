import db from "./db.js";
import Person from "../Models/Person.js";
import Cohort from "../Models/Cohort.js";

import { setDoc, doc, getDoc, deleteDoc, updateDoc, getDocs, collection } from "firebase/firestore";

export default class DatabaseHelper {
  static async post(collection, data) {
    try {
      let formattedData = data.toJson ? data.toJson() : data;

      await setDoc(doc(db, collection, data.id), formattedData);
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

  static async all(collectionToGet) {
    try {
      let result = [];
      const snapshot = await getDocs(collection(db, collectionToGet));
      snapshot.forEach((doc) => {
        result.push(doc.data());
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
