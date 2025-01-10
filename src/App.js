import React, { useState } from 'react'
import Card from './components/Card'
import List from './components/List'

const App = () => {
  const [musicNumber, setMusicNumber] = useState(0);
  const [open, setOpen] = useState(false);
  
  return (
    <div className="container">
      <div className='shape shape-1'></div>
      <div className='shape shape-2'></div>
      <div className='shape shape-3'></div>
      <main>
        <Card props={{musicNumber, setMusicNumber, setOpen}} />
        <List props={{open, setOpen, musicNumber, setMusicNumber}}/>
      </main>
    </div>
  )
}

export default App