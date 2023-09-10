import { Collection } from "../ts/Models/Collection";
import { useNavigate } from "react-router-dom";
import { CollectionHelper } from "../ts/Models/Collection";
import { useDispatch } from "react-redux";
import { removeFromAllCollections } from "../redux/collectionsReducer";
import "../css/CollectionDetails.css";
import useGetUser from "../useGetUser";
type CollectionDetailProps = {
  collection: Collection;
  detailsVisibleCallback: () => void;
};

export default function CollectionDetail(props: CollectionDetailProps) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useGetUser();

  const handleDelete = () => {
    if (currentUser) {
      CollectionHelper.delete(props.collection.id);
    } else {
      dispatch(removeFromAllCollections(props.collection.id));
    }
    nav("/");
  };

  return (
    <div className="collection-details-wrapper" onClick={props.detailsVisibleCallback}>
      <div className="collection-details">
        <h3>Name: {props.collection.name}</h3>
        <h4>Description: {props.collection.description}</h4>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
