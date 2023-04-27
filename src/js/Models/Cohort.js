import { v4 as uuidv4 } from "uuid";
import Person from "./Person.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../Firebase/db.js";
import DatabaseHelper from "../Firebase/DatabaseHelper.js";

export default class Cohort {
  constructor(name, people, description, id, creatorId) {
    this.creatorId = creatorId;
    this.id = id;
    this.name = name;
    this.people = people; // array of people objects, might be better as array of ids
    this.description = description;
  }

  static all() {
    return DatabaseHelper.all("cohorts");
  }

  static async find(id) {
    return DatabaseHelper.find("cohorts", id);
  }

  static async create(cohort) {
    return DatabaseHelper.post("cohorts", {
      creatorId: cohort.creatorId,
      name: cohort.name,
      description: cohort.description,
      people: cohort.people,
      id: cohort.id || uuidv4(),
    });
  }
  static update(cohort) {
    if (cohort.id === null) {
      return "No id provided";
    } else {
      return DatabaseHelper.post("cohorts", {
        creatorId: cohort.creatorId,
        name: cohort.name,
        description: cohort.description,
        people: cohort.people,
        id: cohort.id,
      });
    }
  }
  static delete(cohort) {
    if (cohort.id) {
      return DatabaseHelper.delete("cohorts", cohort.id);
    } else {
      return "No cohort found";
    }
  }

  addPeople(person) {
    DatabaseHelper.addToArray("cohorts", this.id, "people", { id: person.id, data: person });
    person.cohortId = this.id;
    Person.update(person);
  }

  async getPeople() {
    const q = query(collection(db, "people"), where("cohortId", "==", this.id));
    let foundPeople = [];
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      foundPeople.push(doc.data());
    });
    return foundPeople;
  }
}
