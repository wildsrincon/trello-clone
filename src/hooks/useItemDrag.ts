import { useDrag } from "react-dnd";
import { DragItem } from "../types/DragItem";
import { setDragItem } from "../context/actions";
import { useAppState } from "../context/AppStateContext";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDragItem(item));
      return item;
    },
    end: () => dispatch(setDragItem(null))
  })
  return { drag }
}

