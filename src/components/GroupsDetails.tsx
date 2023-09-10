import { Item } from "../ts/Models/Item";
import { groupsSelector } from "../redux/groupsReducer";
import { useDispatch, useSelector } from "react-redux";
import { draggableInfoSelector } from "../redux/draggableReducer";
import { setDraggableInfo } from "../redux/draggableReducer";
import { storeGroups } from "../redux/groupsReducer";
import { setFocussedItem } from "../redux/itemInfoReducer";
import "../css/GroupDetails.css";
import { Dispatch, SetStateAction } from "react";

type GroupsDetailsProps = {
  group: Array<Item>;
  groupNumber: number;
  buttonVisibilityCallback: Dispatch<SetStateAction<boolean>>;
};

export default function GroupsDetails(props: GroupsDetailsProps) {
  const allGroups = useSelector(groupsSelector);
  const dragInfo = useSelector(draggableInfoSelector);
  const dispatch = useDispatch();

  const handleDrop = (groupNumber: number) => {
    const { itemId, originalGroupNumber } = dragInfo.value;
    const updatedGroups = { ...allGroups };
    if (groupNumber !== originalGroupNumber) {
      const item = updatedGroups[originalGroupNumber].find((i) => i.id === itemId);
      if (item) {
        updatedGroups[originalGroupNumber] = updatedGroups[originalGroupNumber].filter((i) => i.id !== itemId);
        updatedGroups[props.groupNumber] = [...updatedGroups[props.groupNumber], item];
        dispatch(storeGroups(updatedGroups));
      }
      props.buttonVisibilityCallback(false);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleItemDrag = (e: any) => {
    dispatch(setDraggableInfo({ itemId: e.target.id, originalGroupNumber: props.groupNumber }));
  };

  const handleItemClick = (item: Item) => {
    dispatch(setFocussedItem(item));
  };

  const handleCopyNames = () => {
    navigator.clipboard.writeText(props.group.map((item) => item.name).join("\n"));
  };

  return (
    <div className="group-card" id={props.groupNumber.toString()} onDrop={() => handleDrop(props.groupNumber)} onDragOver={handleDragOver}>
      <h3>Group: {props.groupNumber + 1}</h3>
      <div className="item-names-list">
        {props.group.map((item) => (
          <p className="item-name" draggable onDragStart={handleItemDrag} key={item.id} id={item.id} onClick={() => handleItemClick(item)}>
            {item.name}
          </p>
        ))}
      </div>
      <button onClick={handleCopyNames}>Copy to clipboard</button>
    </div>
  );
}
