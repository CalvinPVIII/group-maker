import { useState } from "react";
import auth from "../ts/Firebase/db";
import { CollectionHelper } from "../ts/Models/Collection";
import { useNavigate } from "react-router-dom";
import "../css/CollectionForm.css";
import { useDispatch } from "react-redux";
import { addCollection } from "../redux/collectionsReducer";
import { v4 as uuidv4 } from "uuid";
// type CollectionFormProps = {
//   type: "new" | "edit";
//   collection?: Collection;
// };
export default function CollectionForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const user = auth.currentUser;

  const handleSubmit = () => {
    if (!name) {
      setErrorMessage("Please enter a name");
    } else if (!description) {
      setErrorMessage("Please enter a description");
    } else {
      if (user) {
        const collection = { id: null, name: name, description: description, userId: user.uid };
        // @ts-ignore
        CollectionHelper.save(collection);
      } else if (!user) {
        dispatch(addCollection({ id: uuidv4(), name: name, description: description }));
      }
      setErrorMessage("");
      nav("/");
    }
  };

  return (
    <>
      <p className="error-message">{errorMessage}</p>
      <div className="collection-form-wrapper">
        <div className="collection-form">
          <h3>Create a new collection</h3>
          <p>Collection Name:</p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <p>Description:</p>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          <br />
          <br />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}
