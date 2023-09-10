import supabase from "../Supabase/supabase";

export interface Item {
  id: string;
  collectionId: string;
  name: string;
}

export class ItemHelper {
  static async save(items: Array<Item>) {
    await supabase.from("items").insert(items);
  }

  static async delete(itemId: string) {
    await supabase.from("items").delete().eq("id", itemId);
  }

  static async groupHistory(itemId: string) {
    const groupingHistory: { [key: string]: { name: string; count: number } } = {};
    const { data: history } = await supabase.from("item_groups").select("groupId").eq("itemId", itemId);

    if (history) {
      const { data: itemsInSameGroups } = await supabase
        .from("item_groups")
        .select("items(name, id)")
        .in(
          "groupId",
          history.map((group) => group.groupId)
        );

      if (itemsInSameGroups) {
        itemsInSameGroups.forEach((item: any) => {
          if (item.items.id !== itemId) {
            if (!groupingHistory[item.items.id]) {
              groupingHistory[item.items.id] = { name: item.items.name, count: 0 };
            }
            groupingHistory[item.items.id].count += 1;
          }
        });
      }
    }

    return groupingHistory;
  }
}
