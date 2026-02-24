import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'


function App() {
  const [length, setLength] = useState(8)
  const [numAllow,setnumAllow] = useState(false)
  const [charAllow,setcharAllow] = useState(false)
  const [password,setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  //useCallback hook
  const passwordGenerator = useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const specialChar = "!@#$%^&*()-+"
    if(numAllow)str+=numbers
    if(charAllow)str+=specialChar
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)

    }
    setPassword(pass)
  },[length,numAllow,charAllow,setPassword])

  //useCallback hook
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,9999)
    window.navigator.clipboard.writeText(password)
  },[password])

  //useEffect hook
  useEffect(()=>{
    passwordGenerator()
  },[length,numAllow,charAllow,passwordGenerator])
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h3 className='text-white text-center my-3'>
          Password Generator
        </h3>
        <div className='bg-white text-black flex shadow rounded-lg 
        overflow-hidden mb-4'>
          <input 
            type="text" 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white
          px-3 py-0.5 shrink-0'>copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            defaultChecked={numAllow}
            id="numberInput"
            onChange={()=>{
              setnumAllow((prev)=>!prev)
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
          </div> 
          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            defaultChecked={charAllow}
            id="charInput"
            onChange={()=>{
              setcharAllow((prev)=>!prev)
            }}
          />
          <label htmlFor="charInput"> Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
