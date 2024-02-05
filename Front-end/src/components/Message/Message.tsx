import { TMessage } from 'src/types/general.types'
import classes from './message.module.scss'
import dayjs from 'dayjs'

export interface MessageProps {
    message: TMessage
    username: string
}

export const Message = ({ message, username }: MessageProps) => {
    const messageReceived = message.username !== username

    return (
        <li className={messageReceived ? 'message received' : 'message sended'}>
            <div className="message-info">
                <span>{message.username} </span>
                <span>{dayjs().format('MM/DD/YYYY h:mm:ss').toString()}</span>
            </div>

            <p>{message.message}</p>
        </li>
    )
}
