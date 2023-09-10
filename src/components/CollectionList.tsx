import { Link } from "react-router-dom";
import "../css/CollectionList.css";

type CollectionListProps = {
  list: Array<any> | null | undefined;
};

export default function CollectionList(props: CollectionListProps) {
  if (props.list && props.list.length > 0) {
    return (
      <>
        <h3 id="collection-list-header">Collections:</h3>
        <div className="collections">
          {props.list?.map((collection) => (
            <Link to={`/collection/${collection.id}`} key={collection.id}>
              <p className="collection-link">{collection.name}</p>
            </Link>
          ))}
        </div>
      </>
    );
  }
}
