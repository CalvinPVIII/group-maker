import DatabaseHelper from "../Firebase/DatabaseHelper.js";
import { v4 as uuidv4 } from "uuid";

export default class Person {
  constructor(name, id, blacklist, pairHistory, groupHistory, cohortId) {
    this.id = id;
    this.name = name;
    this.blacklist = blacklist; // array of ids/names
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

  #addToHistory(listName, pair) {
    if (this[listName][pair.id]) {
      this[listName][pair.id].timesMatched += 1;
      pair[listName][this.id].timesMatched += 1;
    } else {
      this[listName][pair.id] = {
        name: pair.name,
        timesMatched: 1,
      };

      pair[listName][this.id] = {
        name: this.name,
        timesMatched: 1,
      };
    }
    Person.update(pair);
    return Person.update(this);
  }
  addToPairHistory(pair) {
    return this.#addToHistory("pairHistory", pair);
  }
  addToGroupHistory(pair) {
    return this.#addToHistory("groupHistory", pair);
  }

  addToBlackList(person) {
    return DatabaseHelper.addToArray("people", this.id, "blacklist", {
      data: [...this.blacklist, { id: person.id, name: person.name }],
    });
  }
}
