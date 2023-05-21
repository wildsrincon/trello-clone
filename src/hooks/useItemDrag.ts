import { useDrag } from "react-dnd";
import { DragItem } from "../types/DragItem";
import { setDragItem } from "../context/actions";
import { useAppState } from "../context/AppStateContext";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect } from "react";

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDragItem(item));
      return item;
    },
    end: () => dispatch(setDragItem(null))
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])
  
  return { drag }
}

