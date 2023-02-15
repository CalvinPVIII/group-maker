const fs = require("fs").promises;

class Grouper {
  static async createGroups(namesArray, numberOfGroups) {
    const groups = [];
    const maxNumber = Math.ceil(namesArray.length / numberOfGroups);
    let currentGroup = 0;
    let groupHistory;
    const data = await fs.readFile("src/js/history.json", "utf-8");

    groupHistory = JSON.parse(data);

    while (namesArray.length > 0) {
      const randomNumber = Math.floor(
        Math.random() * (namesArray.length - 1 - 0 + 1)
      );
      const randomPerson = namesArray[randomNumber];
      if (!groups[currentGroup]) {
        groups[currentGroup] = [];
      }

      // maybe update the json file itself should be it's own thing, like a confirm groups type deal
      groups[currentGroup].forEach((person) => {
        if (groupHistory[`${person}&${randomPerson}`]) {
          groupHistory[`${person}&${randomPerson}`] = groupHistory[
            `${person}&${randomPerson}`
          ] += 1;
        } else if (groupHistory[`${randomPerson}&${person}`]) {
          groupHistory[`${randomPerson}&${person}`] = groupHistory[
            `${randomPerson}&${person}`
          ] += 1;
        } else {
          groupHistory[`${randomPerson}&${person}`] = 1;
        }
      });
      groups[currentGroup].push(randomPerson);
      namesArray.splice(namesArray.indexOf(randomPerson), 1);
      if (groups[currentGroup].length >= maxNumber) {
        currentGroup++;
      }
    }

    this.updateHistory(groupHistory);

    return { randomGroups: groups, groupHistory: groupHistory };
  }

  static async removeFromHistory(movedPerson, group) {
    const data = await fs.readFile("src/js/history.json", "utf-8");
    const history = JSON.parse(data);
    group
      .filter((person) => person !== movedPerson)
      .forEach((person) => {
        if (history[`${person}&${movedPerson}`]) {
          history[`${person}&${movedPerson}`] > 0
            ? (history[`${person}&${movedPerson}`] -= 1)
            : (history[`${person}&${movedPerson}`] = 0);
        } else if (history[`${movedPerson}&${person}`]) {
          history[`${movedPerson}&${person}`] > 0
            ? (history[`${movedPerson}&${person}`] -= 1)
            : (history[`${movedPerson}&${person}`] = 0);
        }
      });
    this.updateHistory(history);
    return history;
  }

  // WIP
  static async addToHistory(movedPerson, group) {
    const data = await fs.readFile("src/js/history.json", "utf-8");

    const history = JSON.parse(data);
    group
      .filter((person) => person !== movedPerson)
      .forEach((person) => {
        if (history[`${person}&${movedPerson}`]) {
          history[`${person}&${movedPerson}`] += 1;
        } else if (history[`${movedPerson}&${person}`]) {
          history[`${movedPerson}&${person}`] += 1;
        } else {
          history[`${movedPerson}&${person}`] = 1;
        }

        this.updateHistory(history);
      });
    return history;
  }

  static async updateHistory(data) {
    fs.writeFile("src/js/history.json", JSON.stringify(data), (err) => {
      return err ? err : "Group History Updated";
    });
  }

  static async checkForWriteErrors() {
    const data = await fs.readFile("src/js/history.json", "utf-8");
    if (
      data[data.length - 1] &&
      data[data.length - 2] &&
      data[data.length - 1] === data[data.length - 2]
    ) {
      console.log("writeError");
      fs.writeFile("src/js/history.json", data.slice(0, -1), (err) => {
        return err ? err : "cleaned file";
      });
    }
  }
}

module.exports = Grouper;
