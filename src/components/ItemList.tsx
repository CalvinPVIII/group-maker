import "../css/ItemList.css";
import useGetUser from "../useGetUser";
import { Item, ItemHelper } from "../ts/Models/Item";
import { useDispatch } from "react-redux";
import { updateCollection } from "../redux/collectionsReducer";
import { useSelector } from "react-redux";
import { collectionsSelector } from "../redux/collectionsReducer";

type ItemListProps = {
  items: Array<any> | undefined;
};

export default function ItemList(props: ItemListProps) {
  const currentUser = useGetUser();
  const dispatch = useDispatch();
  const localCollections = useSelector(collectionsSelector);

  const handleDeleteClick = (item: any) => {
    if (currentUser) {
      ItemHelper.delete(item.id);
    } else {
      if (localCollections && localCollections.length > 0) {
        const collectionWithItem = localCollections.find((c) => c.items.includes(item));
        const newCollection = { ...collectionWithItem };
        newCollection.items = newCollection.items.filter((i: Item) => i.id !== item.id);
        console.log(newCollection.items);
        dispatch(updateCollection(newCollection));
      }
    }
  };

  return (
    <>
      {props.items && props.items.length > 0 ? (
        <div className="items">
          {props.items.map((item) => (
            <p key={item.id}>
              {item.name}{" "}
              <button
                onClick={() => {
                  handleDeleteClick(item);
                }}
              >
                Delete
              </button>
            </p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
