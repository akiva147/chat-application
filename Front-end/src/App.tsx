import { useEffect, useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import io, { Socket } from 'socket.io-client'
import { LoginPage } from './pages/LoginPage'
import { ChatPage } from './pages/ChatPage'
import { TMessage, TUser } from './types/general.types'
import { ConnectedUsers } from './components/ConnectedUsers'
import { Messages } from './components/Messages'
import classes from './App.module.scss'

const App = () => {
    const [connectedUsers, setConnectedUsers] = useState<TUser[]>([])
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('1')
    const [connected, setConnected] = useState(false)
    const [messages, setMessages] = useState<TMessage[]>([])
    const [message, setMessage] = useState('')

    const socketClient = useRef<Socket>()

    useEffect(() => {
        socketClient.current = io('http://localhost:5000')
        const socket = socketClient.current
        if (!socket) return

        socket.onAny((event, args) => {
            console.log(`got an event: ${event} with args: ${args}`)
        })

        socket.on('username-submitted-successfully', () => {
            setConnected(true)
        })

        socket.on('username-taken', () => {
            toast.error('Username is taken')
        })

        socket.on(
            'get-connected-users',
            (connectedUsers: { id: string; username: string }[]) => {
                setConnectedUsers(connectedUsers)
            }
        )

        socket.on(
            'receive-message',
            (message: { message: string; username: string }) => {
                setMessages((prev) => [...prev, message])
            }
        )

        return () => {
            socketClient.current?.disconnect()
            socketClient.current = undefined
        }
    }, [username])

    const handleConnection = async () => {
        if (socketClient.current) {
            await socketClient.current.emitWithAck(
                'handle-connection',
                username,
                room
            )
        }
    }

    const handleSendMenssage = async () => {
        if (socketClient.current) {
            setMessages((prev) => [...prev, { message, username }])
            await socketClient.current.emitWithAck(
                'message',
                { message, username },
                room
            )
            setMessage('')
        }
    }

    const joinRoom = async () => {
        if (socketClient.current) {
            await socketClient.current.emitWithAck('join-room', room)
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
                    room={room}
                    setRoom={setRoom}
                    handleJoinRoom={joinRoom}
                />
            )}

            <ToastContainer position="bottom-right" />
        </div>
    )
}

export default App
