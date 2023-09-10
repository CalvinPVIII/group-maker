import { Item } from "../ts/Models/Item";
import { useState, useEffect } from "react";
import CreateGroups from "./CreateGroups";
import ItemInfo from "./ItemInfo";
import { Fragment } from "react";
import GroupsDetails from "./GroupsDetails";
import { useSelector } from "react-redux";
import { groupsSelector } from "../redux/groupsReducer";
import GroupHelper from "../ts/Models/Group";
import { useDispatch } from "react-redux";
import { storeGroups } from "../redux/groupsReducer";
import "../css/GroupsList.css";
import useGetUser from "../useGetUser";

type GroupListProps = {
  collectionList: Array<Item>;
  collectionId: string;
};

export default function GroupsList(props: GroupListProps) {
  const [saveGroupButtonHidden, setSaveGroupButtonHidden] = useState<boolean>(true);
  const currentGroups = useSelector(groupsSelector);
  const dispatch = useDispatch();
  const currentUser = useGetUser();

  const handleSaveGroups = () => {
    if (currentUser) {
      GroupHelper.save(currentGroups, props.collectionId);
      setSaveGroupButtonHidden(true);
    }
  };

  useEffect(() => {
    const getGroups = async () => {
      const storedGroups = await GroupHelper.getGroupsFromCollectionId(props.collectionId);
      dispatch(storeGroups(storedGroups));
    };
    getGroups();
  }, []);

  return (
    <>
      <CreateGroups itemsList={props.collectionList} buttonVisibilityCallback={setSaveGroupButtonHidden} />
      {!currentGroups ? (
        <></>
      ) : (
        <>
          <ItemInfo />
          <div className="groups-wrapper">
            <div className="groups">
              {Object.values(currentGroups).map((group, i) => (
                <Fragment key={i}>
                  <GroupsDetails group={group} groupNumber={i} buttonVisibilityCallback={setSaveGroupButtonHidden} />
                </Fragment>
              ))}
            </div>
            {saveGroupButtonHidden || !currentUser ? <></> : <button onClick={handleSaveGroups}>Save Groups</button>}
          </div>
        </>
      )}
    </>
  );
}
