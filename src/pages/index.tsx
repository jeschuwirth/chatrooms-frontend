import {useRef, useState} from 'react'
import { useRouter } from "next/router"


export default function Home() {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const username_input = useRef<HTMLInputElement>(null);
  const room_input = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function join_room(){
    const username = username_input.current!.value
    const room = room_input.current!.value
  
    if (!username || !room){
      return setErrorMessage("Empty username or room")
    }

    router.push({
      pathname: '/game',
      query: {"username": username,
              "room": room}
    })
  }

  return (
    <div>
      <p>username</p>
      <input ref = {username_input}/>
      <p>room</p>
      <input ref = {room_input}/>
      <button onClick = {join_room}>Join room</button>
      <p>{errorMessage}</p>
    </div>
  )
}
