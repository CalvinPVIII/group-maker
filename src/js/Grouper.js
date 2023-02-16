class Grouper {
  static groupHistory = {};

  static createGroups(namesArray, numberOfGroups) {
    const groups = [];
    const maxNumber = Math.ceil(namesArray.length / numberOfGroups);
    let currentGroup = 0;

    while (namesArray.length > 0) {
      const randomNumber = Math.floor(
        Math.random() * (namesArray.length - 1 - 0 + 1)
      );
      const randomPerson = namesArray[randomNumber];
      if (!groups[currentGroup]) {
        groups[currentGroup] = [];
      }

      groups[currentGroup].push(randomPerson);
      namesArray.splice(namesArray.indexOf(randomPerson), 1);
      if (groups[currentGroup].length >= maxNumber) {
        currentGroup++;
      }
    }

    return groups;
  }

  static showGroupingHistory(groups) {
    const updatedHistory = { ...this.groupHistory };
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < groups[i].length; j++) {
        for (let k = j + 1; k < groups[i].length; k++) {
          const person1 = groups[i][j];
          const person2 = groups[i][k];
          const key = `${person1} & ${person2}`;
          const reverseKey = `${person2} & ${person1}`;
          if (updatedHistory[key]) {
            updatedHistory[key] += 1;
          } else if (updatedHistory[reverseKey]) {
            updatedHistory[reverseKey] += 1;
          } else {
            updatedHistory[key] = 1;
          }
        }
      }
    }
    this.groupHistory = updatedHistory;
    return updatedHistory;
  }

  static saveGroupingHistory(groups) {
    this.groupHistory = this.showGroupingHistory(groups);
  }

  static removeFromHistory(movedPerson, oldGroup) {
    const updatedHistory = { ...this.groupHistory };
    const group = oldGroup.filter((person) => movedPerson !== person);

    group.forEach((person) => {
      const key = `${person} & ${movedPerson}`;
      const reverseKey = `${movedPerson} & ${person}`;
      if (updatedHistory[key]) {
        updatedHistory[key] -= 1;
      } else if (updatedHistory[reverseKey]) {
        updatedHistory[reverseKey] -= 1;
      }
    });
    oldGroup.splice(oldGroup.indexOf(movedPerson), 1);
    this.groupHistory = updatedHistory;
    return { group: group, history: updatedHistory };
  }

  static addToHistory(movedPerson, newGroup) {
    const updatedHistory = { ...this.groupHistory };
    newGroup.forEach((person) => {
      if(person !== movedPerson){
        const key = `${person} & ${movedPerson}`;
        const reverseKey = `${movedPerson} & ${person}`;
        if (updatedHistory[key]) {
          updatedHistory[key] += 1;
        } else if (updatedHistory[reverseKey]) {
          updatedHistory[reverseKey] += 1;
        } else {
          updatedHistory[key] = 1;
        }
      }
      });
    this.groupHistory = updatedHistory;
    return { group: newGroup, history: updatedHistory };
  }
}

module.exports = Grouper;
