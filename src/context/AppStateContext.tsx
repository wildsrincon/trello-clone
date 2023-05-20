import { Dispatch, createContext, useContext } from "react";
import { appStateReducer, AppState, Task, TaskList } from "./appStateReducer";
import { useImmerReducer } from "use-immer";
import { Action } from "./actions";
import { DragItem } from "../types/DragItem";

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }],
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn TypeScript" }],
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }],
    },
  ],
};

type AppStateContextProps = {
  lists: TaskList[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
  children?: React.ReactNode;
  draggedItem: DragItem | null;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const AppStateProvider = ({ children }: AppStateContextProps): JSX.Element => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { lists, draggedItem } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  return (
    <AppStateContext.Provider value={{ lists, getTasksByListId, dispatch, draggedItem }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
