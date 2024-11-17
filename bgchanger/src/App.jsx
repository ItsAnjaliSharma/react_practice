import { useState } from "react"


function App() {

const [color, setColor]=useState("olive")
  return (
 <div className="w-full h-screen duration-200" style={{backgroundColor:color}}>
 
<div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
  <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
    <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg" onClick={()=> setColor("Red")} style={{backgroundColor:"Red"}}>Red</button>
    <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg"  onClick={()=> setColor("Green")} style={{backgroundColor:"Green"}}>Green</button>
    <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg"  onClick={()=> setColor("Blue")} style={{backgroundColor:"Blue"}}>Blue</button>
    <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg" onClick={()=> setColor("Orange")} style={{backgroundColor:"orange"}}>Orange</button>
    <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg"  onClick={()=> setColor("Grey")} style={{backgroundColor:"grey"}}>Grey</button>
    <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg"  onClick={()=> setColor("CadetBlue")} style={{backgroundColor:"cadetBlue"}}>CadetBlue</button>
    <button className="outline-none px-4 py-1 rounded-full text-white shadow-lg"  onClick={()=> setColor("Olive")} style={{backgroundColor:"olive"}}>Olive</button>

 
  </div>
</div>
 
 </div>
  )
}

export default App
