import { useState } from 'react'
import './App.css'
import { CardPage } from './CardPage'
import { AddCard } from './AddCard'





function App() {
  const [cardpage, setCardpage] = useState(false)

  function clicked(){
      setCardpage(!cardpage)
  }

  return (
        <>
        <button onClick={clicked}>Swich</button>
        {cardpage && <CardPage></CardPage>}
        {!cardpage && <AddCard></AddCard>}
        
  
        </>
  )
  
}



export default App
