import './App.css'
import Card from './components/card'

function App() {

  let myobj={
    username:"Anjali",
    age:21
  }

  let newArr=[1,3,5,7]

  return (
    <>
     <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Tailwind test</h1>  
     <Card username="anjali"  btnText="Click me" someobj={myobj} arr={newArr}/>
     <Card username="anshika" btnText="Visit me"/>
    </>
  )
}

export default App
