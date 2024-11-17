import { useState } from 'react'
import './App.css'

function App() {
 
  //let counter=5;


    let [counter, setCounter]= useState(0);
  
    const addVal=()=>{
      counter=(counter<=19? counter+1: counter);
      setCounter(counter);
    }

    const remVal=()=>{
      counter=(counter>0? counter-1: 0);
      setCounter(counter);
    }

  return (
    <>
    <h1>Radhe Radhe</h1>
    <h2>Counter Value : {counter}</h2>

    <button onClick={addVal}>Add</button>
    <br/>
    <button onClick={remVal} >Remove</button>
    </>
  )
}

export default App
