import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter,setCounter] = useState(15)
  //let counter = 15
  const addvalue = () => {
    setCounter(counter+1)
    setCounter(counter+1)//only adds once sends in batches
    console.log(counter)
  }
  const removevalue = () => {
    setCounter(counter-1)
    console.log(counter)
  }
  return (
    <>
      <h1> lokesh react </h1>
      <h2> counter value:{counter}</h2>
      <button
      onClick={addvalue}
      >add value{counter}</button>
      <br />
      <button
      onClick={removevalue}>subtract value{counter}</button>
      <p>footer: {counter}</p>
    </>
  )
}

export default App
