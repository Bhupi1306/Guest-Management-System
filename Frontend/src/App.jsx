import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-gray-700 text-white p-4'>
        <p>Hello tailwind</p>
      </div>
    </>
  )
}

export default App
