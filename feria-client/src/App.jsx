import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to My React App!</h1>
          <p>
            Name: Feria, Mark Christian Kent V <br />
            Email: 6ken.feria@gmail.com <br />
            Other Personal Info: <br />
            github: https://github.com/6kenferia-debug/feria-webprog
          </p>
        </header>
      </div>
    </>
  )
}

export default App
