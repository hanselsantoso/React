import { useState } from 'react'
import './App.css'
import UserForm from './components/UserForm'
import PreviousStateExample from './components/PreviousStateExample'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserForm />
      {/* <PreviousStateExample /> */}
    </>
  )
}

export default App
