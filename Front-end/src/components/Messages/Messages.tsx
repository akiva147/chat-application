import { TMessage } from 'src/types/general.types'
import classes from './messages.module.scss'
import { Message } from '../Message/Message'

export interface MessagesProps {
    messages: TMessage[]
    username: string
    handleSendMessage: () => void
    setMessage: React.Dispatch<React.SetStateAction<string>>
    message: string
    room: string
    setRoom: React.Dispatch<React.SetStateAction<string>>
    handleJoinRoom: () => void
}

export const Messages = ({
    messages,
    username,
    handleSendMessage,
    setMessage,
    message,
    room,
    setRoom,
    handleJoinRoom,
}: MessagesProps) => {
    return (
        <div className="messages">
            <ul className="message-list scrollable">
                {messages.map((message, i) => (
                    <Message
                        key={i + message.username}
                        message={message}
                        username={username}
                    />
                ))}
            </ul>

            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                }}
            >
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required={true}
                />
                <button type="submit">Send</button>
            </form>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    handleJoinRoom()
                }}
            >
                <input
                    type="text"
                    placeholder="Join room..."
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    required={true}
                />
                <button type="submit">Join</button>
            </form>
        </div>
    )
}
