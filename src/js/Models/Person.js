import DatabaseHelper from "../Firebase/DatabaseHelper.js";
import { v4 as uuidv4 } from "uuid";

export default class Person {
  constructor(name, id, blacklist, pairHistory, groupHistory, cohortId) {
    this.id = id;
    this.name = name;
    this.blacklist = blacklist; // array of ids
    this.pairHistory = pairHistory; // key value pair {personId: id, numberOfTimesPaired: int}
    this.groupHistory = groupHistory; // key value pair {personId: id, numberOfTimesPaired: int}
    this.cohortId = cohortId;
  }

  static all() {}

  static find(id) {
    return DatabaseHelper.find("people", id);
  }

  static create(person) {
    return DatabaseHelper.post("people", {
      id: person.id || uuidv4(),
      name: person.name,
      blacklist: person.blacklist,
      pairHistory: person.pairHistory,
      groupHistory: person.groupHistory,
      cohortId: person.cohortId,
    });
  }
  static update(person) {
    if (person.id) {
      return DatabaseHelper.post("people", {
        id: person.id,
        name: person.name,
        blacklist: person.blacklist,
        pairHistory: person.pairHistory,
        groupHistory: person.groupHistory,
        cohortId: person.cohortId,
      });
    } else {
      return "No person found";
    }
  }
  static delete(person) {
    if (person.id) {
      return DatabaseHelper.delete("people", person.id);
    } else {
      return "No person found";
    }
  }
}
