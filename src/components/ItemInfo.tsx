import { useSelector } from "react-redux";
import { itemSelector } from "../redux/itemInfoReducer";
import { useDispatch } from "react-redux";
import { setFocussedItem } from "../redux/itemInfoReducer";
import { ItemHelper } from "../ts/Models/Item";
import { useEffect } from "react";
import { useState } from "react";
import "../css/ItemInfo.css";
export default function ItemInfo() {
  const item = useSelector(itemSelector);
  const dispatch = useDispatch();
  const [groupHistory, setGroupHistory] = useState<Array<{ name: string; count: number }>>([]);

  useEffect(() => {
    if (item) {
      const getGroupingHistory = async () => {
        const result = await ItemHelper.groupHistory(item?.id);
        console.log(result);
        setGroupHistory(Object.values(result));
      };
      getGroupingHistory();
    }
  }, [item]);

  const unFocusItem = () => {
    dispatch(setFocussedItem(null));
  };
  if (item) {
    return (
      <div className="item-card-wrapper" onClick={unFocusItem}>
        <div className="item-card">
          <h3>Name: {item.name}</h3>
          <h4>Group History:</h4>
          {groupHistory.length > 0 ? (
            <>
              {groupHistory.map((item, index) => (
                <p key={index}>
                  {item.name}: {item.count}
                </p>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
