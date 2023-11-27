import './App.css'
import ChessBoard from 'chessboardjsx'
import React, {useState, useEffect, useRef} from 'react'
import {Chess} from 'chess.js'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001') //port where the backend is running

function App() {

  const [fen, setFen] = useState('start')
  const [color, setColor] = useState('')
  const [text, setText] = useState('')

  let game = useRef(null) //object which has a current propery
  //console.log(game)

  useEffect(() => {
    game.current = new Chess();
  },[])
  //console.log(game)

  function onDrop({sourceSquare, targetSquare}) {
    if((game.current.turn()==='b' && color==='black') || (game.current.turn()==='w' && color==='white')) {
      try {
        game.current.move({
          from: sourceSquare,
          to: targetSquare
        })

        //emit to the server
        socket.emit('move', {
          sourceSquare,
          targetSquare
        })

      } catch {
        //console.log("Illegal move");
        return;
      }
    } else {
      return;
    }

    //provide the fen string
    setFen(game.current.fen())
  }

  //useEffect(() => {
    socket.on('move', ({sourceSquare, targetSquare}) => {
      try {
        game.current.move({
          from: sourceSquare,
          to: targetSquare
        })
      } catch {
        //console.log("Illegal move");
        return;
      }
  
      //provide the fen string
      setFen(game.current.fen())
    })

    socket.on('assignColor', ({color}) => {
      setColor(color)
    })

    socket.on('message', ({text}) => {
      setText(text)
    })

  //}, [socket])

  return (
    <>
      {
        game.current?.isGameOver()
        ? <div className='header'> 
            {game.current?.turn() === 'b'
            ? <h1>White won!</h1>
            : <h1>Black won!</h1>}
          </div>
        : <div className='info'>
            <h2>You play {color}</h2>
            {
              text === ''
              ? game.current?.turn() === 'b'
                ? <h2>Black's turn</h2>
                : <h2>White's turn</h2>
              : <h2>{text}</h2>
            }
          </div>
      }
      <div className="App">
        <ChessBoard position={fen} onDrop={onDrop}/>
      </div>
    </>
  );
}

export default App;
