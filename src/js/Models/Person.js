import DatabaseHelper from "../Firebase/DatabaseHelper.js";
import { v4 as uuidv4 } from "uuid";
import Cohort from "./Cohort.js";

export default class Person {
  constructor(name, id, blacklist, pairHistory, groupHistory, cohortId) {
    this.id = id || uuidv4();
    this.name = name;
    this.blacklist = blacklist; // array of ids/names
    this.pairHistory = pairHistory; // key value pair {personId: id, numberOfTimesPaired: int}
    this.groupHistory = groupHistory; // key value pair {personId: id, numberOfTimesPaired: int}
    this.cohortId = cohortId;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      blacklist: this.blacklist,
      pairHistory: this.pairHistory,
      groupHistory: this.groupHistory,
      cohortId: this.cohortId,
    };
  }

  static all() {}

  static find(id) {
    return DatabaseHelper.find("people", id);
  }

  static save(person) {
    return DatabaseHelper.post("people", person);
  }
  static update(person) {
    if (person.id) {
      return DatabaseHelper.post("people", person);
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
  #removeFromHistory(listName, pair) {
    delete this[listName][pair.id];
    delete pair[listName][this.id];
    Person.update(pair);
    return Person.update(this);
  }

  addToPairHistory(pair) {
    return this.#addToHistory("pairHistory", pair);
  }
  addToGroupHistory(pair) {
    return this.#addToHistory("groupHistory", pair);
  }
  removeFromGroupHistory(pair) {
    return this.#removeFromHistory("groupHistory", pair);
  }
  removeFromPairHistory(pair) {
    return this.#removeFromHistory("pairHistory", pair);
  }

  addToBlackList(person) {
    this.blacklist = [...this.blacklist, person.toJson()];
    person.blacklist = [...person.blacklist, this.toJson()];
    Person.update(person);
    Person.update(this);
  }

  removeFromBlacklist(person) {
    this.blacklist = this.blacklist.filter((p) => p.id !== person.id);
    person.blacklist = person.blacklist.filter((p) => p.id !== this.id);
    Person.update(person);
    Person.update(this);
  }

  addAllToGroupHistory(group) {
    const filteredGroup = group.filter((p) => p.id !== this.id);
    filteredGroup.forEach((person) => {
      this.addToGroupHistory(person);
    });
  }

  cohort() {
    return Cohort.find(this.cohortId);
  }

  static format(personObj) {
    return new Person(personObj.name, personObj.id, personObj.blacklist, personObj.pairHistory, personObj.groupHistory, personObj.cohortId);
  }
}
