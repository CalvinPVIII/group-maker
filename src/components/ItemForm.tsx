import { useState } from "react";
import { ItemHelper } from "../ts/Models/Item";
import { v4 as uuidv4 } from "uuid";
import "../css/ItemForm.css";
import useGetUser from "../useGetUser";
import { useDispatch } from "react-redux";
import { updateCollection } from "../redux/collectionsReducer";
type ItemFormProps = {
  collectionId: string;
};

import { useSelector } from "react-redux";
import { collectionsSelector } from "../redux/collectionsReducer";

export default function ItemForm(props: ItemFormProps) {
  const [namesInput, setNamesInput] = useState("");

  const localCollections = useSelector(collectionsSelector);
  const dispatch = useDispatch();

  const user = useGetUser();
  const handleNamesSubmit = () => {
    const names = namesInput.split(/\r?\n/).filter((name) => name.replace(/ /g, "") !== "");
    if (user) {
      ItemHelper.save(
        names.map((name) => {
          return { id: uuidv4(), collectionId: props.collectionId, name: name };
        })
      );
    } else {
      const collection = localCollections.find((c) => c.id === props.collectionId);
      if (collection) {
        const newCollection = { ...collection };
        if (!newCollection.items) {
          newCollection.items = [];
        }
        console.log(newCollection);
        newCollection.items = [
          ...newCollection.items,
          ...names.map((name) => {
            return { id: uuidv4(), collectionId: props.collectionId, name: name };
          }),
        ];

        dispatch(updateCollection(newCollection));
      }
    }
  };

  return (
    <>
      <>
        <div style={{ textAlign: "center" }}>
          <h3>Enter Names Separated by Lines</h3>
          <div className="input-area">
            <textarea style={{ height: "200px" }} className="input-names" onChange={(e) => setNamesInput(e.target.value)} value={namesInput} />
            <br />
            <button onClick={handleNamesSubmit}>Add Items</button>
          </div>
        </div>
      </>
    </>
  );
}
