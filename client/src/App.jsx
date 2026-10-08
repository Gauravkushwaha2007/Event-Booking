import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="border-2 border-green-500 rounded-md m-3">
          Hello world
        </div>
        <button
          type="button"
          className="border-2 border-amber-300 rounded-xl m-10"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

export default App
