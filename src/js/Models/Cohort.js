import { v4 as uuidv4 } from "uuid";
import DatabaseHelper from "../Firebase/DatabaseHelper.js";

export default class Cohort {
  constructor(name, people, description, id, creatorId) {
    this.creatorId = creatorId;
    this.id = id;
    this.name = name;
    this.people = people; // array of people objects
    this.description = description;
  }

  static all() {}

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
  }
}

const thing = new Cohort();
thing.addPeople();
