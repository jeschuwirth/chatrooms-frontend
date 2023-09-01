import { useRouter } from "next/router"
import { useState, useEffect } from "react"


type User = {
    username: string
}
type Message = {
    username: string,
    body: string
}

export default function Game() {
    const [ws, setWs] = useState<WebSocket>()
    const router = useRouter();
    const [users, setusers] = useState<Array<User>>([])
    const [messages, setMessages] = useState<Array<Message>>([])

    const WS_URL = 'wss://aix3dweat1.execute-api.us-east-1.amazonaws.com/production';

    useEffect(() => {
        if (!router.query.room || !router.query.username) return;
        const URL = WS_URL + "?room=" + router.query.room + "&name=" + router.query.username
        const wsClient = new WebSocket(URL)
    
        wsClient.onopen = () => {
            setWs(wsClient)
            wsClient.send(JSON.stringify( {"action": "connectedusers"} ))
            console.log('WebSocket connection established.');
        }
    }, [router.query])

    useEffect(() => {
        if (ws) {
            ws.onmessage = (evt) => {
                const message = JSON.parse(evt.data);
                console.log(message);
                if (message.action && message.action === "connected_users"){
                    setusers(message.body)
                } 
            };
        }
    }, [ws, messages]);
    
    return (
      <div>
        <div>
            <h2>Usuarios conectados</h2>
            {users.map(user => 
                <p key={user.username}>{user.username}</p>
            )}
        </div>
        <div>
            <h2>Chat</h2>
        </div>
      </div>
    )
  }