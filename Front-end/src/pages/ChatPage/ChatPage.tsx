import { ConnectedUsers } from '../../components/ConnectedUsers'
import { Messages } from '../../components/Messages'
import { TMessage, TUser } from '../../types/general.types'
import classes from './chat-page.module.scss'

export interface ChatPageProps {
    connectedUsers: TUser[]
    messages: TMessage[]
    username: string
    handleSendMessage: () => void
    setMessage: React.Dispatch<React.SetStateAction<string>>
    message: string
    room: string
    setRoom: React.Dispatch<React.SetStateAction<string>>
    handleJoinRoom: () => void
}

export const ChatPage = ({
    connectedUsers,
    handleSendMessage,
    message,
    messages,
    setMessage,
    username,
    room,
    setRoom,
    handleJoinRoom,
}: ChatPageProps) => {
    return (
        <>
            <ConnectedUsers connectedUsers={connectedUsers} />

            <Messages
                handleSendMessage={handleSendMessage}
                message={message}
                setMessage={setMessage}
                messages={messages}
                username={username}
                room={room}
                setRoom={setRoom}
                handleJoinRoom={handleJoinRoom}
            />
        </>
    )
}
