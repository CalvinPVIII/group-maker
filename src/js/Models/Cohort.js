import { v4 as uuidv4 } from "uuid";
import Person from "./Person.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../Firebase/db.js";
import DatabaseHelper from "../Firebase/DatabaseHelper.js";

export default class Cohort {
  constructor(name, people, description, id, creatorId, groups) {
    this.creatorId = creatorId;
    this.id = id || uuidv4();
    this.name = name;
    this.people = people;
    this.description = description;
    this.groups = groups;
  }

  toJson() {
    return {
      creatorId: this.creatorId,
      id: this.id,
      people: this.people,
      name: this.name,
      description: this.description,
      groups: this.groups,
    };
  }

  static all() {
    return DatabaseHelper.all("cohorts");
  }

  static async find(id) {
    const result = await DatabaseHelper.find("cohorts", id);
    return Cohort.format(result);
  }

  static async save(cohort) {
    return DatabaseHelper.post("cohorts", cohort.toJson());
  }
  static update(cohort) {
    if (cohort.id === null) {
      return "No id provided";
    } else {
      return DatabaseHelper.post("cohorts", cohort.toJson());
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
    this.people = [...this.people, person.toJson()];
    return Cohort.update(this);
  }

  async getPeople() {
    const q = query(collection(db, "people"), where("cohortId", "==", this.id));
    let foundPeople = [];
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      foundPeople.push(Person.format(doc.data()));
    });
    return foundPeople;
  }

  static format(cohortObj) {
    return new Cohort(cohortObj.name, cohortObj.people, cohortObj.description, cohortObj.id, cohortObj.creatorId, cohortObj.groups);
  }

  createGroups(peopleArray, maxNumberOfPeople) {
    const newPeopleArray = [...peopleArray];
    const groups = [];
    let currentGroup = 0;
    while (newPeopleArray.length > 0) {
      const randomNumber = Math.floor(Math.random() * (newPeopleArray.length - 1 - 0 + 1));
      const randomPerson = newPeopleArray[randomNumber].toJson();

      if (!groups[currentGroup]) {
        groups[currentGroup] = [];
      }

      groups[currentGroup].push(randomPerson);
      newPeopleArray.splice(newPeopleArray.indexOf(randomPerson), 1);
      if (groups[currentGroup].length >= maxNumberOfPeople) {
        currentGroup++;
      }
    }
    groups.forEach((group) => {
      const newGroup = [...group];
      while (newGroup.length > 0) {
        for (let i = 1; i < newGroup.length; i++) {
          const person = Person.format(newGroup[0]);
          person.addToGroupHistory(newGroup[i]);
        }
        newGroup.shift();
      }
    });
    this.groups = Object.assign({}, groups);
    Cohort.update(this);
    return groups;
  }
}
