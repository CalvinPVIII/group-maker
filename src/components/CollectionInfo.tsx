import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetUser from "../useGetUser";
import { CollectionHelper, Collection } from "../ts/Models/Collection";

import ItemForm from "./ItemForm";
import ItemList from "./ItemList";
import GroupsList from "./GroupsList";
import CollectionDetail from "./CollectionDetails";

import "../css/CollectionInfo.css";

import { useSelector } from "react-redux";
import { collectionsSelector } from "../redux/collectionsReducer";

export default function CollectionInfo() {
  const currentUser = useGetUser();
  const { id } = useParams();

  const [collection, setCollection] = useState<Collection | null>();
  const [itemsVisible, setItemsVisible] = useState<"visible" | "hidden">("hidden");
  const [detailsVisible, setDetailsVisible] = useState<boolean>(false);

  const localCollections = useSelector(collectionsSelector);

  useEffect(() => {
    if (currentUser) {
      const getCollection = async () => {
        const collection = await CollectionHelper.getFromId(id, currentUser.uid);
        setCollection(collection);
      };
      getCollection();
    } else {
      const collection = localCollections.find((c) => c.id === id);
      setCollection(collection);
    }
  });

  const toggleItemsVisible = () => {
    if (itemsVisible === "visible") {
      setItemsVisible("hidden");
    } else {
      setItemsVisible("visible");
    }
  };

  const toggleDetailsVisible = () => {
    setDetailsVisible(!detailsVisible);
  };

  if (collection)
    return (
      <>
        {detailsVisible ? <CollectionDetail collection={collection} detailsVisibleCallback={toggleDetailsVisible} /> : <></>}
        <h1 className="clickable" onClick={toggleDetailsVisible}>
          {collection.name}
        </h1>
        <h3 className="clickable" onClick={toggleItemsVisible}>
          Items in collection: {collection.items?.length}
        </h3>
        <div className={`items-${itemsVisible}`}>
          <ItemList items={collection.items} />
          <ItemForm collectionId={collection.id} />
        </div>
        {!collection.items || collection.items.length <= 0 ? <></> : <GroupsList collectionList={collection.items} collectionId={collection.id} />}
      </>
    );
}
