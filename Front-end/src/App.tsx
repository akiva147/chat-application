import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import io, { Socket } from 'socket.io-client'
import { LoginPage } from './pages/LoginPage'
import { TMessage, TUser } from './types/general.types'
import { ConnectedUsers } from './components/ConnectedUsers'
import { Messages } from './components/Messages'
import { ChatPage } from './pages/ChatPage'

const App = () => {
    const [connectedUsers, setConnectedUsers] = useState(
        [] as { id: string; username: string }[]
    )
    const [username, setUsername] = useState('')
    const [connected, setConnected] = useState(false)
    const [messages, setMessages] = useState(
        [] as { message: string; username: string }[]
    )
    const [message, setMessage] = useState('')

    const socketClient = useRef<Socket>()

    useEffect(() => {
        socketClient.current = io('http://localhost:5000')

        if (socketClient.current) {
            socketClient.current.on('username-submitted-successfully', () => {
                setConnected(true)
            })

            socketClient.current.on('username-taken', () => {
                toast.error('Username is taken')
            })

            socketClient.current.on(
                'get-connected-users',
                (connectedUsers: { id: string; username: string }[]) => {
                    setConnectedUsers(connectedUsers)
                }
            )

            socketClient.current.on(
                'receive-message',
                (message: { message: string; username: string }) => {
                    setMessages((prev) => [...prev, message])
                }
            )
        }

        return () => {
            socketClient.current?.disconnect()
            socketClient.current = undefined
        }
    }, [username])

    const handleConnection = () => {
        if (socketClient.current) {
            socketClient.current.emit('handle-connection', username)
        }
    }

    const handleSendMenssage = () => {
        if (socketClient.current) {
            setMessages((prev) => [...prev, { message, username }])
            socketClient.current.emit('message', { message, username })
            setMessage('')
        }
    }

    return (
        <div className="app">
            {!connected ? (
                <LoginPage
                    handleConnection={handleConnection}
                    username={username}
                    setUsername={setUsername}
                />
            ) : (
                <ChatPage
                    connectedUsers={connectedUsers}
                    handleSendMessage={handleSendMenssage}
                    message={message}
                    setMessage={setMessage}
                    messages={messages}
                    username={username}
                />
            )}

            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default App
