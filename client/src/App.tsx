import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState<[] | String[]>([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      setSocket(socket);
    }

    socket.onmessage = (message) => {
      setMessage(m => [...m, message.data]);
    }

    return () => {
      socket.close();
    }
  }, []);

  if (!socket) return (<div>
    Connecting to socket server...
  </div>)

  return (
    <>
      <input onChange={(e) => setText(e.target.value)} />
      <button onClick={() => {
        socket.send(text);
      }}>send</button>
      <ul>
        {
          message.map((m) => (
          <li>{m}</li>))

        }
      </ul>
    </>
  )
}

export default App
