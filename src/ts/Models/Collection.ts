import supabase from "../Supabase/supabase";
import { v4 as uuidv4 } from "uuid";

export interface Collection {
  id: string;
  name: string;
  description: string;
  userId: string;
  items?: Array<any>;
}

export class CollectionHelper {
  static async save(collection: Collection): Promise<void> {
    if (!collection.id) {
      collection.id = uuidv4();
    }
    await supabase.from("collections").insert(collection);
  }

  static async getAllCollectionsFromUserId(userId?: string): Promise<Array<any> | null> {
    if (!userId) return null;
    const { data } = await supabase.from("collections").select().eq("userId", userId);
    return data;
  }

  static async getFromId(collectionId?: string, userId?: string): Promise<Collection | null> {
    if (!collectionId || !userId) return null;
    const { data } = await supabase
      .from("collections")
      .select("id, name, description, userId, items(name, id)")
      .limit(1)
      .eq("id", collectionId)
      .eq("userId", userId);
    if (data) return data[0];
    return null;
  }

  static async delete(collectionId: string) {
    await supabase.from("collections").delete().eq("id", collectionId);
  }
}
