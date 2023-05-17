import { AppContainer } from "./styles"
import { Column } from "./components/Column";
import { AddNewItem } from "./components/AddNewItem";


export const App = () => {
 
  return (
    <>
      <AppContainer>
          <Column text='Todo:'/>
          <AddNewItem toggleButtonText="+ Add another list" onAdd={() => console.log("Item created")} />
      </AppContainer>    
    </>
  )
}

export default App
