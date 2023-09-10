import supabase from "../Supabase/supabase";
import { Item } from "./Item";
import { v4 as uuidv4 } from "uuid";

export interface Group {
  id: string;
  collectionId: string;
  current: boolean;
}

export default class GroupHelper {
  static createGroups(itemArray: Array<Item>, maxNumberOfPeople: number) {
    let newitemArray = [...itemArray];
    const groups: { [key: string]: Array<Item> } = {};
    let currentGroupKey = 0;
    while (newitemArray.length > 0) {
      const randomNumber = Math.floor(Math.random() * (newitemArray.length - 1));
      const randomPerson = newitemArray[randomNumber];

      if (!groups[currentGroupKey]) {
        groups[currentGroupKey] = [];
      }

      groups[currentGroupKey].push(randomPerson);

      newitemArray = newitemArray.filter((p) => p.id !== randomPerson.id);
      if (groups[currentGroupKey].length >= maxNumberOfPeople) {
        currentGroupKey++;
      }
    }
    return groups;
  }

  static async save(groups: { [key: number]: Array<Item> }, collectionId: string) {
    await supabase.from("groups").update({ current: false }).eq("collectionId", collectionId);
    Object.values(groups).forEach(async (group) => {
      const groupId = uuidv4();
      await supabase.from("groups").insert({ id: groupId, collectionId: collectionId, current: true });
      group.forEach(async (item) => {
        await supabase.from("item_groups").insert({ id: uuidv4(), itemId: item.id, groupId: groupId });
      });
    });
  }

  static async getGroupsFromCollectionId(collectionId: string) {
    const { data } = await supabase.from("groups").select().eq("collectionId", collectionId).eq("current", true);

    if (!data || data.length === 0) {
      return {};
    }

    const groups: { [key: number]: any } = {};

    await Promise.all(
      data.map(async (group, i) => {
        const { data: itemData } = await supabase.from("item_groups").select("items(name, id)").eq("groupId", group.id);
        groups[i] = itemData?.map((item) => item.items);
      })
    );

    return groups;
  }
}
