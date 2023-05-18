import { ColumnContainer, ColumnTitle } from "../styles";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { useAppState } from "../context/AppStateContext";

type ColumnProps = {
  text: string;
  id: string;
};

export const Column = ({ text, id }: ColumnProps) => {
  const { getTasksByListId } = useAppState();
  const task = getTasksByListId(id);
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {
        task.map((task) => (
          <Card text={task.text} key={task.id} id={task.id} />
        ))
      }
      <AddNewItem
        toggleButtonText="+ Add Another Card"
        onAdd={() => console.log("New item added")}
        dark
      />
    </ColumnContainer>
  );
};
