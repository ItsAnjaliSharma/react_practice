 import { useState } from 'react'
import {InputBox} from './component/input'
import useCurrencyInfo from './hooks/useCurrencyinfo'
import './App.css'

function App() {
   const [amount, setAmount] = useState(0)
   const [from, setFrom]= useState('usd')
   const [to, setTo]= useState('inr')
   const [convertedAmount, setConvertedAmount]=useState(0)

   const currencyInfo =useCurrencyInfo(from)
   const option= Object.keys(currencyInfo)

   const swap=()=>{
    setTo(from)
    setFrom(to)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
   }

   const covert=()=>{
   setConvertedAmount(amount * currencyInfo(to))
   }
  return (
    <>
    <h1 className='text-3xl bg-orange-500'>Currency App</h1>
    </>
  )
}

export default App
