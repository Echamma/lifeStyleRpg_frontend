import { useEffect, useState } from "react"
import Login from "./components/User/Login"
import TaskComponent from "./components/Columns/Column"

function App() {
  const [uid, setId] = useState(0)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(()=>{console.log(uid)},[uid])
  return (
    <div>
      {isLogged ? (
        <TaskComponent id={uid} />
      ) : (
        <Login 
          setCheck={setIsLogged} 
          setId={setId} 
        />
      )}
    </div>
  )
}

export default App
