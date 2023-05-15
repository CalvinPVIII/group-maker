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

  // TO DO: if there is only one person left, add them to a group instead of making a new one
  createGroups(peopleArray, maxNumberOfPeople) {
    let newPeopleArray = [...peopleArray];
    const groups = {};
    let currentGroupKey = 0;
    while (newPeopleArray.length > 0) {
      const randomNumber = Math.floor(Math.random() * (newPeopleArray.length - 1));
      const randomPerson = newPeopleArray[randomNumber].toJson();

      if (!groups[currentGroupKey]) {
        groups[currentGroupKey] = { currentGroup: [] };
      }

      groups[currentGroupKey].currentGroup.push(randomPerson);

      newPeopleArray = newPeopleArray.filter((p) => p.id !== randomPerson.id);
      if (groups[currentGroupKey].currentGroup.length >= maxNumberOfPeople) {
        currentGroupKey++;
      }
    }
    Object.values(groups).forEach((group) => {
      const newGroup = [...group.currentGroup];
      while (newGroup.length > 0) {
        for (let i = 1; i < newGroup.length; i++) {
          const person = Person.format(newGroup[0]);
          person.addToGroupHistory(newGroup[i]);
        }
        newGroup.shift();
      }
    });

    this.groups = groups;
    Cohort.update(this);
    return groups;
  }

  addPersonToGroup(groupKey, person) {
    this.groups[groupKey].currentGroup.forEach((p) => {
      Person.format(p).addToGroupHistory(person);
    });
    this.groups[groupKey].currentGroup.push(person);
    Cohort.update(this);
  }

  removePersonFromGroup(groupKey, person) {
    const filteredGroup = this.groups[groupKey].currentGroup.filter((p) => p.id !== person.id);
    filteredGroup.forEach((p) => {
      Person.format(p).removeFromGroupHistory(person);
    });
    this.groups[groupKey].currentGroup = filteredGroup;
    Cohort.update(this);
  }

  generatePairsForGroup(groupKey) {
    const group = { ...this.groups[groupKey], currentPairs: [] };
    let people = [...group.currentGroup];
    while (people.length > 0) {
      const randomPerson1 = Person.format(people[Math.floor(Math.random() * (people.length - 1))]);
      people = people.filter((person) => person.id !== randomPerson1.id);

      const randomPerson2 = Person.format(people[Math.floor(Math.random() * (people.length - 1))]);
      people = people.filter((person) => person.id !== randomPerson2.id);
      if (people.length === 1) {
        const randomPerson3 = Person.format(people[0]);
        people = people.filter((person) => person.id !== randomPerson3.id);
        randomPerson1.addToPairHistory(randomPerson2.toJson());
        randomPerson1.addToPairHistory(randomPerson3.toJson());
        randomPerson2.addToPairHistory(randomPerson3.toJson());

        group.currentPairs.push({ 1: randomPerson1.toJson(), 2: randomPerson2.toJson(), 3: randomPerson3.toJson() });
      } else {
        randomPerson1.addToPairHistory(randomPerson2.toJson());
        group.currentPairs.push({ 1: randomPerson1.toJson(), 2: randomPerson2.toJson() });
      }
    }
    this.groups[groupKey] = group;
    Cohort.update(this);
  }
}
