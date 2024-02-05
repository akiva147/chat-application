import { TMessage } from 'src/types/general.types'
import classes from './messages.module.scss'
import { Message } from '../Message/Message'

export interface MessagesProps {
    messages: TMessage[]
    username: string
    handleSendMessage: () => void
    setMessage: (value: string) => void
    message: string
}

export const Messages = ({
    messages,
    username,
    handleSendMessage,
    setMessage,
    message,
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
        </div>
    )
}
