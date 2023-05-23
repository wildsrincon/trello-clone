import { useRef } from "react";
import { useAppState } from "../context/AppStateContext";
import { CardContainer } from "../styles";
import { isHidden } from "../utils/isHidden";
import { useItemDrag } from "../hooks/useItemDrag";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { moveTask, setDragItem } from "../context/actions";

type CardProps = {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
};

export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({ type: "CARD", id, text, columnId });

  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "CARD") {
        return
      }
      if (draggedItem.id === id) {
        return
      }

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId))
      dispatch(setDragItem({ ...draggedItem, columnId }))
    })
  })

  drag(drop(ref));

  return <CardContainer ref={ref} isPreview={isPreview} isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}>{text}</CardContainer>;
};
