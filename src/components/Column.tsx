import { ColumnContainer, ColumnTitle } from "../styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useAppState } from "../context/AppStateContext";
import { addTask, moveList } from "../context/actions";
import { useRef } from "react";
import { useItemDrag } from "../hooks/useItemDrag";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from "../utils/isHidden";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const task = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: throttle(200,() => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveList(draggedItem.id, id));
      }
    })
  })

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref} isPreview={isPreview} isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}>
      <ColumnTitle>{text}</ColumnTitle>
      {
        task.map((task) => (
          <Card text={task.text} key={task.id} id={task.id} columnId={id} />
        ))
      }
      <AddNewItem
        toggleButtonText="+ Add Another Card"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark
      />
    </ColumnContainer>
  );
};
