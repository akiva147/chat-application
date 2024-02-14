import { TMessage } from 'src/types/general.types'
import classes from './messages.module.scss'
import { Message } from '../Message/Message'
import classNames from 'classnames'
import { Button, Input } from 'antd'
import { LegacyRef, useEffect, useRef } from 'react'

export interface MessagesProps {
    messages: TMessage[]
    username: string
    handleSendMessage: () => Promise<void>
    setMessage: React.Dispatch<React.SetStateAction<string>>
    message: string
    room: string
    setRoom: React.Dispatch<React.SetStateAction<string>>
    handleJoinRoom: () => Promise<void>
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
    const messagesRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        messagesRef.current?.scrollTo({
            top: messagesRef.current?.scrollHeight,
            behavior: 'smooth',
        })
    }, [messages])

    return (
        <div className={classes.messages}>
            <ul
                className={classNames([classes['message-list']])}
                ref={messagesRef}
            >
                {messages.map((message, i) => (
                    <Message
                        key={i + message.username}
                        message={message}
                        username={username}
                    />
                ))}
            </ul>

            <div className={classes.forms}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setMessage('')
                        await handleSendMessage()
                    }}
                >
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        size="large"
                        required
                    />
                    <Button htmlType="submit">Send</Button>
                </form>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await handleJoinRoom()
                    }}
                >
                    <Input
                        type="text"
                        placeholder="Join room..."
                        value={room}
                        size="large"
                        onChange={(e) => setRoom(e.target.value)}
                        required
                    />
                    <Button htmlType="submit">Join</Button>
                </form>
            </div>
        </div>
    )
}
