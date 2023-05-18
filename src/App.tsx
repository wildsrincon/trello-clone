import { AppContainer } from "./styles"
import { Column } from "./components/Column";
import { AddNewItem } from "./components/AddNewItem";
import { useAppState } from "./context/AppStateContext";


export const App = () => {
  const { lists } = useAppState();
 
  return (
    <>
      <AppContainer>
        {
          lists.map((list) => (
            <Column text={list.text} key={list.id} id={list.id}/>
          ))
        }
        <AddNewItem toggleButtonText="+ Add another list" onAdd={() => console.log("Item created")} />
      </AppContainer>    
    </>
  )
}

export default App
