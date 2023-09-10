import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetUser from "../useGetUser";
import { CollectionHelper } from "../ts/Models/Collection";
import CollectionList from "./CollectionList";
import { useSelector } from "react-redux";
import { collectionsSelector } from "../redux/collectionsReducer";
import "../css/Home.css";
export default function Home() {
  const currentUser = useGetUser();
  const [collections, setCollections] = useState<Array<any> | null | undefined>();
  const localCollections = useSelector(collectionsSelector);

  useEffect(() => {
    if (currentUser) {
      const fetchCollections = async () => {
        const fetchedCollections = await CollectionHelper.getAllCollectionsFromUserId(currentUser.uid);
        setCollections(fetchedCollections);
      };
      fetchCollections();
    } else {
      setCollections(localCollections);
    }
  });

  return (
    <>
      <Link to="/new">
        <h3 className="new-collection-link clickable">New Collection</h3>
      </Link>
      <CollectionList list={collections} />
    </>
  );
}
